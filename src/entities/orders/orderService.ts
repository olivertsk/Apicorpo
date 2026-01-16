import sequelize, {
  modelOrder,
  modelOrderProducto,
  modelPaymentMethod,
  modelProduct,
  modelUser,
} from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import {
  EStatusOrder,
  type IOrderAttributes,
  type IOrderCreationAttributes,
  type IResponseAllOrder,
  type IOrderInstance,
  EWasSent,
} from '@entities/orders/orderModel'
import {
  fxMuiFilters,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'
import type { IOrderProductAttributes, IOrderProductCreationAttributes } from './orderProductModel'

class OrdersService {
  async validate(data: any) {
    const dataValidate = modelOrder.build(data)
    await dataValidate.validate()
  }

  public async get(data: {
    orderId: string
    isClient: boolean
    userId: string | undefined
    adminId?: string
  }): Promise<IOrderAttributes | null> {
    try {
      const whereCondition: any = {
        id: data.orderId,
      }

      if (data.isClient && data.userId) {
        whereCondition.userId = data.userId
      }
      const vResponse: IOrderInstance | null = await modelOrder.findOne({
        where: whereCondition,
        include: [
          {
            model: modelOrderProducto,
            as: 'products',
            include: [
              {
                model: modelProduct,
                as: 'product',
              },
            ],
            required: false,
          },
          {
            model: modelUser,
            as: 'user',
            required: false,
          },
          {
            model: modelUser,
            as: 'admin',
            required: false,
          },
          {
            model: modelUser,
            as: 'responsible',
            required: false,
          },
          {
            model: modelPaymentMethod,
            as: 'method',
            attributes: [
              'type',
              'name',
              'dni',
              'email',
              'numberAccount',
              'phoneNumber',
              'accountType',
            ],
            required: false,
          },
        ],
      })
      if (vResponse) {
        if ((!vResponse.responsibleId || vResponse.responsibleId === '1') && data.adminId) {
          vResponse.responsibleId = data.adminId
          vResponse.viewTime = new Date().toISOString()
          vResponse.status = EStatusOrder.Process
          await vResponse.save()
          await vResponse.save()

          await vResponse.reload({
            include: [
              {
                model: modelOrderProducto,
                as: 'products',
                include: [
                  {
                    model: modelProduct,
                    as: 'product',
                  },
                ],
                required: false,
              },
              {
                model: modelUser,
                as: 'user',
                required: false,
              },
              {
                model: modelUser,
                as: 'admin',
                required: false,
              },
              {
                model: modelUser,
                as: 'responsible',
                required: false,
              },
              {
                model: modelPaymentMethod,
                as: 'method',
                attributes: [
                  'type',
                  'name',
                  'dni',
                  'email',
                  'numberAccount',
                  'phoneNumber',
                  'accountType',
                ],
                required: false,
              },
            ],
          })
        }
      }
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllOrder> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelOrder.name
      )
      if (pParam.status) {
        whereStatement.where = {
          status: pParam.status,
        }
      }
      if (pParam.isClient || pParam.rolType !== 'admin') {
        whereStatement.where = {
          userId: pParam.userId,
        }
      } else {
        if (pParam.userId) {
          whereStatement.where = {
            userId: pParam.userId,
          }
        }
        whereStatement.include = [
          {
            model: modelUser,
            as: 'responsible',
          },
        ]
      }
      const vResponse: IOrderAttributes[] = await modelOrder.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllOrder = await fxReponseServices(
          pParam,
          whereStatement,
          modelOrder.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(itemCreationParams: IOrderCreationAttributes): Promise<IOrderAttributes> {
    try {
      const vResponse: IOrderAttributes = await modelOrder.create(itemCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: IOrderCreationAttributes,
    id: string
  ): Promise<IOrderAttributes | null> {
    try {
      if (id) {
        const vResponse: IOrderInstance | null = await modelOrder.findOne({
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

  public async updateStatus(
    body: { status: EStatusOrder; reason?: string | null; adminId?: string | null },
    id: string
  ): Promise<IOrderAttributes | null> {
    try {
      const date = new Date().toISOString()
      if (id) {
        const vResponse: IOrderInstance | null = await modelOrder.findOne({
          where: {
            id: id,
            [Op.not]: { status: body.status },
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update({
          status: body.status,
          reason: body?.reason || null,
          updatedStatus: date,
          adminId: body?.adminId || null,
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
      const record = await modelOrder.update(
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
  public async bulkProductImages(
    dataParams: IOrderProductCreationAttributes[]
  ): Promise<IOrderProductAttributes[]> {
    try {
      const vResponse: IOrderProductAttributes[] = await modelOrderProducto.bulkCreate(dataParams, {
        updateOnDuplicate: ['id'],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }
  public async downloadOrder(param: {
    fe?: string
    wasSent?: number
    product?: boolean
  }): Promise<IOrderAttributes[]> {
    try {
      let day
      let month
      let year
      if (param?.fe) {
        day = new Date(param.fe).getDate()
        month = new Date(param.fe).getMonth() + 1
        year = new Date(param.fe).getFullYear()
      }
      if (day && day.toLocaleString.length === 1) {
        day = `0${day}`
      }
      if (month && month.toLocaleString.length === 1) {
        month = `0${month}`
      }
      let whereCondition: any
      // const whereCondition: any = {
      //   ...(param.fecha && {
      //     [Op.and]: [
      //       sequelize.where(sequelize.fn('MONTH', sequelize.col('orders.createdAt')), month),
      //       sequelize.where(sequelize.fn('DAY', sequelize.col('orders.createdAt')), day),
      //       sequelize.where(sequelize.fn('YEAR', sequelize.col('orders.createdAt')), year),
      //     ],
      //   }),
      //   ...('wasSent' in param && !param.product ? { wasSent: EWasSent.noSent } : {}),
      //   ...('wasSent' in param && param.product ? { wasSent: EWasSent.sentOrder } : {}),
      // }
      if ('fe' in param && param?.fe) {
        whereCondition = {
          ...(param.fe && {
            [Op.and]: [
              sequelize.where(sequelize.fn('MONTH', sequelize.col('Orders.createdAt')), month),
              sequelize.where(sequelize.fn('DAY', sequelize.col('Orders.createdAt')), day),
              sequelize.where(sequelize.fn('YEAR', sequelize.col('Orders.createdAt')), year),
            ],
          }),
        }
      } else {
        whereCondition = {
          ...('wasSent' in param && !param.product ? { wasSent: EWasSent.noSent } : {}),
          ...('wasSent' in param && param.product ? { wasSent: EWasSent.sentOrder } : {}),
        }
      }
      const orders: IOrderAttributes[] = await modelOrder.findAll({
        attributes: [
          'id',
          'dni',
          'code',
          'userId',
          'phoneNumber',
          'location',
          'observation',
          'amount',
          'amountWithoutTax',
          'valueTax',
          'createdAt',
          'nameClient',
        ],
        where: whereCondition,
        include: [
          {
            model: modelOrderProducto,
            as: 'products',
            include: [{ model: modelProduct, as: 'product' }],
            required: false,
          },
          {
            model: modelUser,
            as: 'dataUser',
            attributes: ['id', 'name', 'email', 'dni', 'phoneNumber', 'lastName'],
            required: false,
          },
        ],
        order: [['code', 'DESC']],
      })
      if (!('fe' in param && param?.fe)) {
        await modelOrder.update(
          { wasSent: param?.product ? EWasSent.sentProductOrder : EWasSent.sentOrder },
          { where: whereCondition }
        )
      }
      return orders
    } catch (error) {
      throw error
    }
  }
}
export default new OrdersService()
