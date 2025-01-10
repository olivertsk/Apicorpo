import { modelNotification } from '@db/index'
import { type FindOptions } from 'sequelize'
import { type INotificationAttributes, type INotificationCreationAttributes, type IResponseAllNotification, type INotificationInstance } from '@entities/notification/NotificationModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'
import { Transaction } from 'sequelize'

class NotificationsService {
  async validate(data: any) {
    const dataValidate = modelNotification.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<INotificationAttributes | null> {
    try {
      const vResponse: INotificationAttributes | null = await modelNotification.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllNotification> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelNotification.name
      )
      whereStatement.where = {
        ...whereStatement.where,
        userId: pParam.userId,
      }
      const vResponse: INotificationAttributes[] = await modelNotification.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllNotification = await fxReponseServices(
          pParam,
          whereStatement,
          modelNotification.name,
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
    viewCreationParams: INotificationCreationAttributes
  ): Promise<INotificationAttributes> {
    try {
      const vResponse: INotificationAttributes = await modelNotification.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async createMany(
    viewCreationParams: INotificationCreationAttributes,
    userIds: string[]
  ): Promise<boolean> {
    const notifications: INotificationAttributes[] = []
    console.log('userIds :>> ', userIds);
    if (modelNotification?.sequelize) {
      const transaction: Transaction = await modelNotification.sequelize.transaction()
      try {
        for (const userId of userIds) {
          const notificationParams = { ...viewCreationParams, userId }
          if (userId) {
            const vResponse: INotificationAttributes = await modelNotification.create(
              notificationParams,
              {
                transaction,
              }
            )
            notifications.push(vResponse)
          }
        }

        // Commit the transaction
        await transaction.commit()
        console.log('finalizo');
        return true
      } catch (error) {
        await transaction.rollback()
        console.log('error :>> ', error);
        throw error
      }
    }
    return false
  }

  public async update(
    itemCreationParams: INotificationCreationAttributes,
    id: string
  ): Promise<INotificationAttributes | null> {
    try {
      if (id) {
        const vResponse: INotificationInstance | null = await modelNotification.findOne({
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

  public async updateView(id: string, userId: string): Promise<INotificationAttributes | null> {
    try {
      if (id) {
        const vResponse: INotificationInstance | null = await modelNotification.findOne({
          where: {
            id,
            userId,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update({
          isView: true,
        })
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }
  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelNotification.update(
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
export default new NotificationsService()
