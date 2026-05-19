import { modelProductReview } from '@db/index'
import { type FindOptions } from 'sequelize'
import {
  type IProductReviewAttributes,
  type IProductReviewCreationAttributes,
  type IResponseAllProductReview,
  type IProductReviewFilter,
} from '@entities/products/productReviewModel'
import { fxMuiFilters, fxMuiSort, fxPaginate, fxReponseServices } from '../../utils/query'

class ProductReviewService {
  async validate(data: any) {
    const dataValidate = modelProductReview.build(data)
    await dataValidate.validate()
  }

  public async create(data: IProductReviewCreationAttributes): Promise<IProductReviewAttributes> {
    try {
      // Usamos create directo ya que no tiene tablas intermedias complejas
      const vResponse = await modelProductReview.create(data)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: IProductReviewFilter): Promise<IResponseAllProductReview> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)

      // Filtro por producto específico (muy común para el front)
      if (pParam?.productId) {
        whereStatement.where = { ...whereStatement.where, productId: pParam.productId }
      }

      if (pParam.isClient) {
        whereStatement.where = {
          ...whereStatement.where,
          isApproved: true,
        }
      }
      const vResponse: IProductReviewAttributes[] = await modelProductReview.findAll({
        ...whereStatement,
        include: [{ association: 'author', attributes: ['id', 'name', 'lastName'] }],
      })

      if (Number(pParam?.pag)) {
        return await fxReponseServices(pParam, whereStatement, modelProductReview.name, vResponse)
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  // Útil para el administrador de Corpoindustri
  public async toggleApproval(id: string, status: boolean): Promise<boolean> {
    const record = await modelProductReview.findByPk(id)
    if (record) {
      await record.update({ isApproved: status })
      return true
    }
    return false
  }
}

export default new ProductReviewService()
