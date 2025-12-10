import sequelize, { modelChatAnswer, modelChatQuestion } from '@db/index'
import { type Transaction, type FindOptions } from 'sequelize'
import {
  type IChatQuestionAttributes,
  type IChatQuestionCreationAttributes,
  type IResponseAllChatQuestion,
  type IChatShowClientFilter,
} from '@entities/chat/chatQuestionModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'
import { type IChatAnswerCreationAttributes } from './ChatAnswerModel'

class ChatQuestionsService {
  async validate(data: any) {
    const dataValidate = modelChatQuestion.build(data)
    await dataValidate.validate()
  }

  public async get(maxDepth = 10): Promise<any> {
    const buildTree = async (
      questionId: string,
      parentAnswerId: string | null = null,
      currentDepth = 0
    ): Promise<any> => {
      if (currentDepth >= maxDepth) return null
      // 1. Obtener la pregunta base
      const question = await modelChatQuestion.findOne({
        attributes: [
          'id',
          'name',
          'type',
          'status',
          'autoResponse',
          'chatQuestionId',
          'chatAnswerId',
        ],
        where: { id: questionId },
        include: [
          {
            attributes: ['id', 'name', 'autoResponse', 'answerType', 'status', 'chatQuestionId'],
            association: 'options',
            required: false,
            where: parentAnswerId ? { id: parentAnswerId } : {}, // Filtro adicional para opciones
          },
        ],
      })

      if (!question) return null

      // 2. Procesar las opciones
      const options = await Promise.all(
        question.options?.map(async (answer: any) => {
          // 3. Buscar pregunta hija específica para esta opción
          const childQuestion = await modelChatQuestion.findOne({
            where: {
              chatQuestionId: questionId,
              chatAnswerId: answer.id,
            },
          })

          return {
            ...answer.toJSON(),
            chatQuestion: childQuestion
              ? await buildTree(childQuestion?.id || '', null, currentDepth + 1)
              : null,
          }
        }) || []
      )

      return {
        ...question.toJSON(),
        options,
      }
    }
    const question = await modelChatQuestion.findOne({
      attributes: [
        'id',
        'name',
        'type',
        'status',
        'autoResponse',
        'chatQuestionId',
        'chatAnswerId',
      ],
      where: { chatQuestionId: null, chatAnswerId: null },
    })
    if (question && question?.id) return await buildTree(question.id)
    return null
  }

  public async client(param: IChatShowClientFilter): Promise<any> {
    // if (param?.type && param?.type === 'text') {
    //   return null
    // }
    const question = await modelChatQuestion.findOne({
      where: {
        chatQuestionId: param.chatQuestionId || null,
        chatAnswerId: param.chatAnswerId || null,
      },
      include: [
        {
          as: 'options',
          model: modelChatAnswer,
        },
      ],
    })
    return question
  }

  public async all(pParam: any): Promise<IResponseAllChatQuestion> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelChatQuestion.name
      )
      const vResponse: IChatQuestionAttributes[] = await modelChatQuestion.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllChatQuestion = await fxReponseServices(
          pParam,
          whereStatement,
          modelChatQuestion.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }
  public async create(
    itemCreationParams: IChatQuestionCreationAttributes
  ): Promise<IChatQuestionAttributes> {
    // Primera transacción: pregunta principal + respuestas directas
    const firstTransaction = await sequelize.transaction()
    try {
      // 1. Crear pregunta principal
      const question = await modelChatQuestion.create(
        {
          name: itemCreationParams.name,
          type: itemCreationParams.type,
          chatQuestionId: itemCreationParams?.chatQuestionId || null,
          chatAnswerId: itemCreationParams?.chatAnswerId || null,
          status: itemCreationParams.status ?? true,
        },
        { transaction: firstTransaction }
      )

      // 2. Crear respuestas directas (sin preguntas hijas)
      if (itemCreationParams.options?.length && question.id) {
        await this.createDirectAnswers(itemCreationParams.options, question.id, firstTransaction)
      }

      await firstTransaction.commit()

      // Segunda fase: preguntas hijas (sin transacción única)
      if (itemCreationParams.options?.length && question.id) {
        await this.createNestedQuestions(itemCreationParams.options, question.id)
      }

      return question
    } catch (error) {
      await firstTransaction.rollback()
      throw error
    }
  }

  private async createDirectAnswers(
    answersData: IChatAnswerCreationAttributes[],
    parentQuestionId: string,
    transaction: Transaction
  ): Promise<void> {
    for (const answerData of answersData) {
      if (!answerData.name) continue

      await modelChatAnswer.create(
        {
          name: answerData.name,
          chatQuestionId: parentQuestionId,
          autoResponse: answerData.autoResponse,
          answerType: answerData.answerType,
          status: true,
        },
        { transaction }
      )
    }
  }

  private async createNestedQuestions(
    answersData: IChatAnswerCreationAttributes[],
    parentQuestionId: string
  ): Promise<void> {
    for (const answerData of answersData) {
      if (!answerData.name || !answerData.chatQuestion?.name) continue

      try {
        // Obtener la respuesta ya creada
        const answer = await modelChatAnswer.findOne({
          where: {
            name: answerData.name,
            chatQuestionId: parentQuestionId,
          },
        })

        if (answer) {
          // Crear pregunta hija SIN transacción global
          await this.create({
            ...answerData.chatQuestion,
            chatQuestionId: parentQuestionId,
            chatAnswerId: answer.id,
          })
        }
      } catch (error) {
        console.error(`Error creating nested question for answer ${answerData.name}:`, error)
        // Continuar con las siguientes en lugar de lanzar error
      }
    }
  }
  // public async create(
  //   itemCreationParams: IChatQuestionCreationAttributes
  // ): Promise<IChatQuestionAttributes> {
  //   const transaction = await sequelize.transaction()

  //   try {
  //     // 1. Crear la pregunta principal
  //     const question = await modelChatQuestion.create(
  //       {
  //         name: itemCreationParams.name,
  //         type: itemCreationParams.type,
  //         chatQuestionId: itemCreationParams?.chatQuestionId || null,
  //         chatAnswerId: itemCreationParams?.chatAnswerId || null,
  //         status: itemCreationParams.status ?? true,
  //       },
  //       { transaction }
  //     )

  //     // 2. Crear las respuestas/opciones (ChatAnswer) si existen
  //     if (itemCreationParams.options && question.id && itemCreationParams.options.length > 0) {
  //       await this.createAnswersForQuestion(itemCreationParams.options, question.id, transaction)
  //     }

  //     await transaction.commit()
  //     return question
  //   } catch (error) {
  //     console.error('Error creating chat question:', error)
  //     await transaction.rollback()
  //     throw error
  //   }
  // }

  // private async createAnswersForQuestion(
  //   answersData: IChatAnswerCreationAttributes[],
  //   parentQuestionId: string,
  //   transaction: any
  // ): Promise<void> {
  //   for (const answerData of answersData) {
  //     if (!answerData.name) continue // Saltar si no hay nombre

  //     // 1. Crear la respuesta/opción (ChatAnswer)
  //     const answer = await modelChatAnswer.create(
  //       {
  //         name: answerData.name,
  //         chatQuestionId: parentQuestionId, // Relación con la pregunta padre
  //         autoResponse: answerData.autoResponse,
  //         type: answerData.answerType,
  //         status: true,
  //       },
  //       { transaction }
  //     )

  //     // 2. Si esta respuesta tiene una pregunta hija, crearla
  //     if (answerData.chatQuestion?.name) {
  //       await this.create({
  //         ...answerData.chatQuestion,
  //         chatQuestionId: parentQuestionId, // Opcional: mantener referencia al abuelo
  //         chatAnswerId: answer.id, // Relación con la respuesta que la generó
  //       })
  //     }
  //   }
  // }

  // public async update(
  //   itemCreationParams: IChatQuestionCreationAttributes,
  //   id: string
  // ): Promise<IChatQuestionAttributes | null> {
  //   try {
  //     if (id) {
  //       const vResponse: IChatQuestionInstance | null = await modelChatQuestion.findOne({
  //         where: {
  //           id: id,
  //         },
  //       })
  //       if (vResponse === null) {
  //         return null
  //       }
  //       await vResponse.update(itemCreationParams)
  //       return vResponse
  //     }
  //     return null
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async softAllDeleteRecord(): Promise<boolean> {
    try {
      const record = await modelChatQuestion.update(
        { deletedAt: new Date() },
        {
          where: { deletedAt: null },
          logging: false,
        }
      )
      if (!record) {
        return false
      }
      return true
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelChatQuestion.update(
        { deletedAt: new Date() },
        {
          where: { id: pId },
        }
      )
      if (!record) {
        return false
      }
      return true
    } catch (error) {
      throw error
    }
  }
}
export default new ChatQuestionsService()
