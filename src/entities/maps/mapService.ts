import { modelMap } from '@db/index'
import { type FindOptions } from 'sequelize'
import { type IMapAttributes, type IMapCreationAttributes, type IResponseAllMap, type IMapInstance } from '@entities/maps/mapModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'

class MapsService {
  async validate(data: any) {
    const dataValidate = modelMap.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IMapAttributes | null> {
    try {
      const vResponse: IMapAttributes | null = await modelMap.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllMap> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelMap.name
      )
      const vResponse: IMapAttributes[] = await modelMap.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllMap = await fxReponseServices(
          pParam,
          whereStatement,
          modelMap.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: IMapCreationAttributes): Promise<IMapAttributes> {
    try {
      const vResponse: IMapAttributes = await modelMap.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(itemCreationParams: IMapCreationAttributes, id: string): Promise<IMapAttributes | null> {
    try {
      if (id) {
        const vResponse: IMapInstance | null = await modelMap.findOne({
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
      const record = await modelMap.update(
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
export default new MapsService()
