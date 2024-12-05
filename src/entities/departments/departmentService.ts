import { modelDepartment, modelProduct } from '@db/index'
import { type FindOptions } from 'sequelize'
import type { IDepartmentAttributes, IDepartmentCreationAttributes, IResponseAllDepartment, IDepartmentInstance } from '@entities/departments/departmentModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'

class DepartmentsService {
  async validate(data: any) {
    const dataValidate = modelDepartment.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IDepartmentAttributes | null> {
    try {
      const vResponse: IDepartmentAttributes | null = await modelDepartment.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllDepartment> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelDepartment.name
      )
      if ('isSalient' in pParam && pParam.isSalient !== undefined && pParam.isSalient !== null) {
        whereStatement.where = {
          ...whereStatement.where,
          isSalient: pParam.isSalient
        }
      }
      if (pParam?.product) {
        whereStatement.include = [
          {
            model: modelProduct,
            as: 'products'
          }
        ]
      }
      const vResponse: IDepartmentAttributes[] = await modelDepartment.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllDepartment = await fxReponseServices(
          pParam,
          whereStatement,
          modelDepartment.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: IDepartmentCreationAttributes): Promise<IDepartmentAttributes> {
    try {
      const vResponse: IDepartmentAttributes = await modelDepartment.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(itemCreationParams: IDepartmentCreationAttributes, id: string): Promise<IDepartmentAttributes | null> {
    try {
      if (id) {
        const vResponse: IDepartmentInstance | null = await modelDepartment.findOne({
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

  async deleteImagesName(name: string): Promise<void> {
    try {
      const vImagesName: IDepartmentInstance | null = await modelDepartment.findOne({
        where: {
          icon: name
        }
      })
      await vImagesName?.update({
        icon: ''
      })
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelDepartment.update(
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
export default new DepartmentsService()
