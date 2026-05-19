import { modelProductComment } from '@db/index'
import { type FindOptions } from 'sequelize'
import {
  type IProductCommentAttributes,
  type IProductCommentCreationAttributes,
  type IResponseAllProductComment,
  type IProductCommentFilter,
} from '@entities/products/productCommentModel'
import { fxMuiFilters, fxPaginate, fxReponseServices } from '../../utils/query'

class ProductCommentService {
  async validate(data: any) {
    const dataValidate = modelProductComment.build(data)
    await dataValidate.validate()
  }

  public async create(data: IProductCommentCreationAttributes): Promise<IProductCommentAttributes> {
    try {
      return await modelProductComment.create(data)
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async all(pParam: IProductCommentFilter): Promise<IResponseAllProductComment> {
    try {
      let whereStatement: FindOptions = {
        where: { parentId: null }, // Traemos solo comentarios "padre" por defecto
      }

      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)

      if (pParam?.productId) {
        whereStatement.where = { ...whereStatement.where, productId: pParam.productId }
      }

      const vResponse = await modelProductComment.findAll({
        ...whereStatement,
        include: [
          { association: 'author', attributes: ['id', 'name'] },
          {
            association: 'replies',
            include: [{ association: 'author', attributes: ['id', 'name'] }],
          },
        ],
        order: [['createdAt', 'DESC']],
      })

      if (Number(pParam?.pag)) {
        return await fxReponseServices(pParam, whereStatement, modelProductComment.name, vResponse)
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async delete(id: string): Promise<boolean> {
    const result = await modelProductComment.destroy({ where: { id } })
    return result > 0
  }
}

export default new ProductCommentService()
