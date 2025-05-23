import { modelView } from '@db/index'
import { type FindOptions } from 'sequelize'
import type {
  IViewAttributes,
  IViewCreationAttributes,
  IViewInstance,
  IResponseAllView,
} from '@entities/views/viewModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'

class ViewService {
  async validate(data: any) {
    const dataValidate = modelView.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IViewAttributes | null> {
    try {
      const vResponse: IViewAttributes | null = await modelView.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllView> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelView.name
      )
      const vResponse: IViewAttributes[] = await modelView.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllView = await fxReponseServices(
          pParam,
          whereStatement,
          modelView.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: IViewCreationAttributes): Promise<IViewAttributes> {
    try {
      const vResponse: IViewAttributes = await modelView.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: IViewCreationAttributes,
    id: string
  ): Promise<IViewAttributes | null> {
    try {
      if (id) {
        const vResponse: IViewInstance | null = await modelView.findOne({
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
      const record = await modelView.update(
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
export default new ViewService()
