import { modelOrder, modelOrderProducto } from '@db/index'
import { type FindOptions } from 'sequelize'
import { type IOrderAttributes, type IOrderCreationAttributes, type IResponseAllOrder, type IOrderInstance } from '@entities/orders/orderModel'
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

  public async create(viewCreationParams: IOrderCreationAttributes): Promise<IOrderAttributes> {
    try {
      const vResponse: IOrderAttributes = await modelOrder.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(itemCreationParams: IOrderCreationAttributes, id: string): Promise<IOrderAttributes | null> {
    try {
      if (id) {
        const vResponse: IOrderInstance | null = await modelOrder.findOne({
          where: {
            id: id
          }
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
}
export default new OrdersService()
