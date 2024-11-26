import { modelCategory } from '@db/index'
import { type FindOptions } from 'sequelize'
import type { ICategoryAttributes, ICategoryCreationAttributes, IResponseAllCategory, ICategoryInstance } from '@entities/categories/categoryModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'

class CategoriesService {
  async validate(data: any) {
    const dataValidate = modelCategory.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<ICategoryAttributes | null> {
    try {
      const vResponse: ICategoryAttributes | null = await modelCategory.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllCategory> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelCategory.name
      )
      if ('isSalient' in pParam && pParam.isSalient !== undefined && pParam.isSalient !== null) {
        whereStatement.where = {
          ...whereStatement.where,
          isSalient: pParam.isSalient
        }
      }
      const vResponse: ICategoryAttributes[] = await modelCategory.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllCategory = await fxReponseServices(
          pParam,
          whereStatement,
          modelCategory.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: ICategoryCreationAttributes): Promise<ICategoryAttributes> {
    try {
      const vResponse: ICategoryAttributes = await modelCategory.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(itemCreationParams: ICategoryCreationAttributes, id: string): Promise<ICategoryAttributes | null> {
    try {
      if (id) {
        const vResponse: ICategoryInstance | null = await modelCategory.findOne({
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
      const record = await modelCategory.update(
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
export default new CategoriesService()
