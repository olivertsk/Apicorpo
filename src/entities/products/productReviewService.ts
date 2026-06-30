import sequelize, { modelProduct, modelProductReview } from '@db/index'
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

  public async toggleApproval(id: string, status: boolean): Promise<boolean> {
    const transaction = await sequelize.transaction()
    try {
      // 1. Obtener la reseña (sin bloqueo, solo lectura)
      const review = await modelProductReview.findByPk(id, { transaction })
      if (!review) {
        await transaction.rollback()
        return false
      }
      // Si ya está en el estado deseado, no hacemos nada
      if (review.isApproved === status) {
        await transaction.commit()
        return true
      }

      const productId = review.productId

      // 2. Bloquear el producto para actualización (SELECT ... FOR UPDATE)
      const product = await modelProduct.findByPk(productId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      })
      if (!product) {
        await transaction.rollback()
        return false
      }

      const currentCount = product.reviewCount || 0
      const currentAvg = product.averageRating || 0
      const rating = review.rating

      let newCount = currentCount
      let newAvg = currentAvg

      if (status) {
        // --- APROBAR ---
        newCount = currentCount + 1
        newAvg = (currentAvg * currentCount + rating) / newCount
      }

      // 3. Actualizar reseña y producto
      await review.update({ isApproved: status }, { transaction })
      await product.update(
        {
          reviewCount: newCount,
          averageRating: newAvg,
        },
        { transaction }
      )

      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  public async initializeProductReviews() {
    const products = await modelProduct.findAll()
    for (const product of products) {
      const approved = await modelProductReview.findAll({
        where: { productId: product.id, isApproved: true },
        attributes: ['rating'],
      })
      const count = approved.length
      let avg = 0
      if (count > 0) {
        avg = approved.reduce((s, r) => s + r.rating, 0) / count
      }
      await product.update({ reviewCount: count, averageRating: avg })
    }
  }
}

export default new ProductReviewService()
