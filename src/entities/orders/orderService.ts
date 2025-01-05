import sequelize, { modelOrder, modelOrderProducto, modelProduct, modelUser } from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import { type IOrderAttributes, type IOrderCreationAttributes, type IResponseAllOrder, type IOrderInstance, EStatusOrder, EWasSent } from '@entities/orders/orderModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'
import { IOrderProductAttributes, IOrderProductCreationAttributes } from './orderProductModel'

class OrdersService {
  async validate(data: any) {
    const dataValidate = modelOrder.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IOrderAttributes | null> {
    try {
      const vResponse: IOrderAttributes | null = await modelOrder.findOne({
        where: {
          id,
        },
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
          },
          {
            model: modelUser,
            as: 'user',
          },
          {
            model: modelUser,
            as: 'admin',
          },
        ],
      })
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
      console.log('itemCreationParams :>> ', itemCreationParams)
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
    wasSent: number
    product: boolean
    fecha: string
  }): Promise<IOrderAttributes[]> {
    try {
      const day = new Date(param.fecha).getDate()
      const month = new Date(param.fecha).getMonth() + 1 // getMonth() is zero-based
      const year = new Date(param.fecha).getFullYear()
      const orders: IOrderAttributes[] = await modelOrder.findAll({
        attributes: [
          'id',
          'userId',
          'numberClient',
          'direction',
          'referencePoint',
          'observation',
          'time',
          'type',
          'amount',
          'amountWithoutTax',
          'valueTax',
          'createdAt',
          'tax',
        ],
        where: {
          ...(param.fecha && {
            [Op.and]: [
              sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), month),
              sequelize.where(sequelize.fn('DAY', sequelize.col('createdAt')), day),
              sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), year),
            ],
          }),
          ...('wasSent' in param && !param.product ? { wasSent: EWasSent.noSent } : {}),
          ...('wasSent' in param && param.product ? { wasSent: EWasSent.sentOrder } : {}),
        },
        include: [
          {
            model: modelOrderProducto,
            as: 'products',
            include: [{ model: modelProduct, as: 'product' }],
          },
          {
            model: modelUser,
            as: 'dataUser',
            attributes: ['id', 'name', 'email', 'dni', 'nit', 'phoneNumber', 'lastName'],
          },
          // {
          //   model: Payment,
          //   as: 'payment',
          //   attributes: [
          //     'id',
          //     'orderId',
          //     'transactionId',
          //     'amount',
          //     'discount',
          //     'type',
          //     'issuingBank',
          //     'receivingBank',
          //     'reference',
          //     'date',
          //     'name',
          //     'userId',
          //     'description',
          //     'tax',
          //     'isPayment',
          //   ],
          // },
        ],
        order: [['id', 'DESC']],
      })
      return orders
    } catch (error) {
      throw error
    }
  }
}
export default new OrdersService()
