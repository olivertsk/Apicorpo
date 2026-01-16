import { modelPaymentMethod } from '@db/index'
import { type FindOptions } from 'sequelize'
import {
  type IPaymentMethodAttributes,
  type IPaymentMethodCreationAttributes,
  type IResponseAllPaymentMethod,
  type IPaymentMethodInstance,
  ETypePaymentMethods,
} from '@entities/paymentMethods/paymentMethodModel'
import {
  fxMuiFilters,
  fxMuiSort,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'

class PaymentMethodsService {
  async validate(data: any) {
    const dataValidate = modelPaymentMethod.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IPaymentMethodAttributes | null> {
    try {
      const vResponse: IPaymentMethodAttributes | null = await modelPaymentMethod.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllPaymentMethod> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelPaymentMethod.name
      )
      if (pParam.type && Object.values(ETypePaymentMethods).includes(pParam.type)) {
        whereStatement.where = {
          ...whereStatement.where,
          type: pParam.type,
          status: true,
        }
      }
      const vResponse: IPaymentMethodAttributes[] = await modelPaymentMethod.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllPaymentMethod = await fxReponseServices(
          pParam,
          whereStatement,
          modelPaymentMethod.name,
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
    viewCreationParams: IPaymentMethodCreationAttributes
  ): Promise<IPaymentMethodAttributes> {
    try {
      const vResponse: IPaymentMethodAttributes =
        await modelPaymentMethod.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: IPaymentMethodCreationAttributes,
    id: string
  ): Promise<IPaymentMethodAttributes | null> {
    try {
      if (id) {
        const vResponse: IPaymentMethodInstance | null = await modelPaymentMethod.findOne({
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
      const record = await modelPaymentMethod.update(
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
export default new PaymentMethodsService()
