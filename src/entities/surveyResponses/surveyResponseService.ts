import {
  modelSurvey,
  modelSurveyAnswerOption,
  modelSurveyQuestion,
  modelSurveyResponse,
  modelSurveyUser,
  modelUser,
} from '@db/index'
import { type FindOptions } from 'sequelize'
import type {
  ISurveyResponseAttributes,
  ISurveyResponseFilter,
  ISurveyResponseInstance,
  IResponseAllSurveyResponse,
  ISurveyResponseCreation,
} from '@entities/surveyResponses/surveyResponseModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'
import type { IResponseAllSurvey, ISurveyAttributes } from '@entities/surveys/surveyModel'
import type {
  IResponseAllSurveyUser,
  ISurveyUserAttributes,
} from '@entities/surveyUsers/surveyUserModel'

class SurveyResponseService {
  async validate(data: any) {
    const dataValidate = modelSurveyResponse.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<ISurveyUserAttributes | null> {
    try {
      const vResponse: ISurveyUserAttributes | null = await modelSurveyUser.findOne({
        where: {
          id,
        },
        include: [
          {
            model: modelSurveyResponse, // Relación con las respuestas
            as: 'responses',
            include: [
              {
                model: modelSurveyQuestion, // Relación con las preguntas
                as: 'question',
                order: [['order', 'ASC']], // Ordenar preguntas por su orden definido
                include: [
                  {
                    model: modelSurveyAnswerOption, // Relación con las opciones de respuesta
                    as: 'answers',
                  },
                ],
              },
              {
                model: modelSurveyAnswerOption,
                as: 'answerOption',
              },
            ],
          },
          {
            model: modelSurvey,
            as: 'survey',
            attributes: ['id', 'title'],
          },
          {
            model: modelUser,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
        ],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: ISurveyResponseFilter): Promise<IResponseAllSurveyResponse> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(pParam, whereStatement, 'name', modelSurveyResponse.name)
      if (pParam.userId) {
        whereStatement.where = {
          ...whereStatement.where,
          userId: pParam.userId,
        }
      }
      const vResponse: ISurveyResponseAttributes[] =
        await modelSurveyResponse.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllSurveyResponse = await fxReponseServices(
          pParam,
          whereStatement,
          modelSurveyResponse.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async allSurveyUser(pParam: ISurveyResponseFilter): Promise<IResponseAllSurveyUser> {
    try {
      let whereStatement: FindOptions = {}

      // Incluir relaciones actualizadas
      whereStatement.include = [
        {
          model: modelSurveyQuestion,
          as: 'questions',
          include: [
            {
              model: modelSurveyAnswerOption,
              as: 'answers',
            },
          ],
        },
        {
          model: modelSurveyUser, // Agregar el modelo de surveyUser
          as: 'surveyUsers', // Alias del modelo (relación con surveyUser)
          where: {
            userId: pParam.userId, // Filtrar por prospecto
          },
          required: true,
          include: [
            {
              model: modelSurveyResponse, // Relación con las respuestas
              as: 'responses',
            },
          ],
        },
      ]

      // Ordenar preguntas por su orden definido
      whereStatement.order = [[{ model: modelSurveyQuestion, as: 'questions' }, 'order', 'ASC']]

      // Obtener las encuestas con la nueva estructura
      const vResponse: ISurveyAttributes[] = await modelSurvey.findAll(whereStatement)

      return { data: vResponse }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async allSurveyUsers(pParam: ISurveyResponseFilter): Promise<IResponseAllSurveyUser> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)

      // Incluir relaciones jerárquicas
      whereStatement.include = [
        {
          model: modelSurvey,
          as: 'survey',
          attributes: ['id', 'title'],
        },
        {
          model: modelUser,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ]

      // Filtrar por prospecto (si aplica)
      if (pParam.userId) {
        whereStatement.where = {
          userId: pParam.userId, // Prospecto específico
        }
      }
      // Obtener los surveyUsers asociados al prospecto
      const vResponse = await modelSurveyUser.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllSurveyResponse = await fxReponseServices(
          pParam,
          whereStatement,
          modelSurveyUser.name,
          vResponse
        )
        return vResponsePaginate
      }

      return { data: vResponse }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async allSurvey(pParam: ISurveyResponseFilter): Promise<IResponseAllSurvey> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement.include = [
        {
          model: modelSurveyQuestion,
          as: 'questions',
          include: [
            {
              model: modelSurveyAnswerOption,
              as: 'answers',
            },
          ],
        },
        {
          model: modelSurveyResponse,
          as: 'responses',
          where: {
            userId: pParam.userId,
          },
          required: true,
        },
      ]
      whereStatement.order = [[{ model: modelSurveyQuestion, as: 'questions' }, 'order', 'ASC']]
      const vResponse: ISurveyAttributes[] = await modelSurvey.findAll(whereStatement)

      return { data: vResponse }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  // public async create(
  //   surveyResponseCreationParams: ISurveyResponseCreationAttributes
  // ): Promise<ISurveyResponseAttributes> {
  //   try {
  //     const vResponse: ISurveyResponseAttributes = await modelSurveyResponse.create(
  //       surveyResponseCreationParams
  //     )
  //     return vResponse
  //   } catch (error) {
  //     console.log('error :>> ', error)
  //     throw error
  //   }
  // }

  public async createMany(data: ISurveyResponseCreation[]): Promise<ISurveyResponseAttributes[]> {
    try {
      const creationData = [...data]
      const vResponse: ISurveyResponseAttributes[] =
        await modelSurveyResponse.bulkCreate(creationData)
      return vResponse
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async update(
    surveyResponseCreationParams: ISurveyResponseAttributes,
    id: string
  ): Promise<ISurveyResponseAttributes | null> {
    try {
      if (id) {
        const vResponse: ISurveyResponseInstance | null = await modelSurveyResponse.findOne({
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(surveyResponseCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelSurveyResponse.destroy({
        where: { id: pId },
      })
      if (!record) {
        return false
      }
      return true
    } catch (error) {
      throw error
    }
  }
}
export default new SurveyResponseService()
