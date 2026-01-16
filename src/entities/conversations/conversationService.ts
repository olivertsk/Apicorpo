import sequelize, { modelConversation, modelConversationMessage, modelUser } from '@db/index'
import { type FindOptions } from 'sequelize'
import {
  type IConversationAttributes,
  type IConversationCreationAttributes,
  type IResponseAllConversation,
  type IConversationInstance,
  type IConversationFilter,
  type IConversationFullCreation,
  EConversationStatus,
} from '@entities/conversations/conversationModel'
import {
  fxMuiFilters,
  fxMuiSort,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
} from '../../utils/query'
import { type IConversationMessageCreationAttributes } from './conversationMessageModel'

class ConversationsService {
  async validate(data: any) {
    const dataValidate = modelConversation.build(data)
    await dataValidate.validate()
  }
  public async get(id: string, adminId?: string): Promise<IConversationAttributes | null> {
    try {
      const vResponse: IConversationInstance | null = await modelConversation.findOne({
        where: {
          id,
        },
        include: [
          {
            as: 'messages',
            model: modelConversationMessage,
            where: {
              from: 'bot',
            },
            order: [['index', 'ASC']],
          },
          {
            model: modelUser,
            as: 'responsible',
            required: false,
            attributes: ['id', 'name', 'email', 'lastName'],
          },
          {
            as: 'user',
            model: modelUser,
            required: false,
            attributes: ['id', 'name', 'email', 'lastName'],
          },
        ],
      })
      if (vResponse) {
        if ((!vResponse.responsibleId || vResponse.responsibleId === '1') && adminId) {
          vResponse.responsibleId = adminId
          vResponse.viewTime = new Date().toISOString()
          vResponse.status = EConversationStatus.COMPLETED
          await vResponse.save()
          await vResponse.reload({
            include: [
              {
                as: 'messages',
                model: modelConversationMessage,
                where: {
                  from: 'bot',
                },
                order: [['index', 'ASC']],
              },
              {
                model: modelUser,
                as: 'responsible',
                required: false,
                attributes: ['id', 'name', 'email', 'lastName'],
              },
              {
                as: 'user',
                model: modelUser,
                required: false,
                attributes: ['id', 'name', 'email', 'lastName'],
              },
            ],
          })
        }
      }
      if (vResponse && vResponse.messages) {
        vResponse.messages.sort((a, b) => a?.index - b?.index)
      }

      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: IConversationFilter): Promise<IResponseAllConversation> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)
      if (pParam.userId) {
        whereStatement.where = {
          ...whereStatement.where,
          userId: pParam.userId,
        }
      }
      whereStatement.include = [
        {
          as: 'user',
          model: modelUser,
          required: false,
          attributes: ['id', 'name', 'email', 'lastName'],
        },
        {
          model: modelUser,
          as: 'responsible',
          required: false,
          attributes: ['id', 'name', 'email', 'lastName'],
        },
      ]
      const vResponse: IConversationAttributes[] = await modelConversation.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllConversation = await fxReponseServices(
          pParam,
          whereStatement,
          modelConversation.name,
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
    itemCreationParams: IConversationCreationAttributes
  ): Promise<IConversationAttributes> {
    try {
      const vResponse: IConversationAttributes = await modelConversation.create(itemCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async createWithMessages(
    creationData: IConversationFullCreation
  ): Promise<IConversationAttributes> {
    const transaction = await sequelize.transaction()
    try {
      // 1. Crear conversación
      const conversation = await modelConversation.create(creationData.conversation, {
        transaction,
      })

      // 2. Crear mensajes asociados
      if (creationData.messages?.length) {
        await modelConversationMessage.bulkCreate(
          creationData.messages.map((msg) => ({
            ...msg,
            conversationId: conversation.id,
            metadata: this.prepareMetadata(msg),
          })),
          { transaction }
        )
      }

      await transaction.commit()
      return conversation
    } catch (error) {
      await transaction.rollback()
      console.error('Error creating conversation with messages:', error)
      throw new Error('Failed to create conversation with messages')
    }
  }

  private prepareMetadata(msg: IConversationMessageCreationAttributes): Record<string, any> | null {
    if (msg.from === 'bot' && msg.chatQuestion) {
      return {
        chatQuestion: msg.chatQuestion,
        system: { type: 'bot_message' },
      }
    }

    if (msg.from === 'user' && msg.selectedOption) {
      return {
        selectedOption: msg.selectedOption,
        system: { type: 'user_response' },
      }
    }

    return null
  }

  public async update(
    itemCreationParams: IConversationCreationAttributes,
    id: string
  ): Promise<IConversationAttributes | null> {
    try {
      if (id) {
        const vResponse: IConversationInstance | null = await modelConversation.findOne({
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(itemCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }
  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelConversation.update(
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
export default new ConversationsService()
