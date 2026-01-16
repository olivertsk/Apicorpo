import { modelPermission } from '@db/index'
import { type FindOptions } from 'sequelize'
import type {
  IPermissionAttributes,
  IPermissionCreationAttributes,
  IPermissionInstance,
  IResponseAllPermission,
} from '@entities/permissions/permissionModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'
import type { IRolAttributes } from '@users/rolModel'

class PermissionService {
  async validate(data: any) {
    const dataValidate = modelPermission.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IPermissionAttributes | null> {
    try {
      const vResponse: IPermissionAttributes | null = await modelPermission.findOne({
        where: {
          id,
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllPermission> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelPermission.name
      )
      whereStatement.attributes = { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
      const vResponse: IPermissionAttributes[] = await modelPermission.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllPermission = await fxReponseServices(
          pParam,
          whereStatement,
          modelPermission.name,
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
    permissionCreationParams: IPermissionCreationAttributes
  ): Promise<IPermissionAttributes> {
    try {
      const vResponse: IPermissionAttributes =
        await modelPermission.create(permissionCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async bulkCreate(
    permissionCreationParams: IPermissionCreationAttributes[],
    rolId: IRolAttributes['id']
  ): Promise<boolean> {
    try {
      await modelPermission.destroy({
        where: { rolId: rolId },
        force: true,
      })
      await modelPermission.bulkCreate(permissionCreationParams)
      return true
    } catch (error) {
      throw error
    }
  }

  public async update(
    causeCreationParams: IPermissionCreationAttributes,
    id: string
  ): Promise<IPermissionAttributes | null> {
    try {
      if (id) {
        const vResponse: IPermissionInstance | null = await modelPermission.findOne({
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(causeCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }
  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelPermission.update(
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
export default new PermissionService()
