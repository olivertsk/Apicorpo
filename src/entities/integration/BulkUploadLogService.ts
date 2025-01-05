import { modelBulkUploadLog } from '@db/index'
import { type FindOptions } from 'sequelize'
import { type IBulkUploadLogAttributes, type IBulkUploadLogCreationAttributes, type IResponseAllBulkUploadLog, type IBulkUploadLogInstance } from '@entities/integration/BulkUploadLog'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'

class BulkUploadLogsService {
  async validate(data: any) {
    const dataValidate = modelBulkUploadLog.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IBulkUploadLogAttributes | null> {
    try {
      const vResponse: IBulkUploadLogAttributes | null = await modelBulkUploadLog.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllBulkUploadLog> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelBulkUploadLog.name
      )
      const vResponse: IBulkUploadLogAttributes[] = await modelBulkUploadLog.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllBulkUploadLog = await fxReponseServices(
          pParam,
          whereStatement,
          modelBulkUploadLog.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: IBulkUploadLogCreationAttributes): Promise<IBulkUploadLogAttributes> {
    try {
      const vResponse: IBulkUploadLogAttributes = await modelBulkUploadLog.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(itemCreationParams: IBulkUploadLogCreationAttributes, id: string): Promise<IBulkUploadLogAttributes | null> {
    try {
      if (id) {
        const vResponse: IBulkUploadLogInstance | null = await modelBulkUploadLog.findOne({
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
      const record = await modelBulkUploadLog.update(
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
export default new BulkUploadLogsService()
