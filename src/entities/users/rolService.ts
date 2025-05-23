import { modelRol } from '@db/index'
import { type FindOptions } from 'sequelize'
import {
  type IRolAttributes,
  type IRolCreationAttributes,
  type IResponseAllRol,
  type IRolInstance,
} from '@entities/users/rolModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'

class RolsService {
  async validate(data: any) {
    const dataValidate = modelRol.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IRolAttributes | null> {
    try {
      const vResponse: IRolAttributes | null = await modelRol.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllRol> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelRol.name
      )
      const vResponse: IRolAttributes[] = await modelRol.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllRol = await fxReponseServices(
          pParam,
          whereStatement,
          modelRol.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: IRolCreationAttributes): Promise<IRolAttributes> {
    try {
      const vResponse: IRolAttributes = await modelRol.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: IRolCreationAttributes,
    id: string
  ): Promise<IRolAttributes | null> {
    try {
      if (id) {
        const vResponse: IRolInstance | null = await modelRol.findOne({
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
      console.log('error :>> ', error)
      throw error
    }
  }
  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelRol.update(
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
export default new RolsService()
