import { modelDepartment, modelFavoriteProduct, modelProduct, modelProductImages } from '@db/index'
import { type FindOptions } from 'sequelize'
import { type IFavoriteProductAttributes, type IFavoriteProductCreationAttributes, type IResponseAllFavoriteProduct, type IFavoriteProductInstance } from '@entities/products/favoriteProductModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'

class FavoriteProductsService {
  async validate(data: any) {
    const dataValidate = modelFavoriteProduct.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IFavoriteProductAttributes | null> {
    try {
      const vResponse: IFavoriteProductAttributes | null = await modelFavoriteProduct.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllFavoriteProduct> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelFavoriteProduct.name
      )
      whereStatement.where = {
        ...whereStatement.where,
        userId: pParam.userId,
      }
      whereStatement.include = [
        {
          model: modelProduct,
          as: 'product',
          include: [
            {
              model: modelProductImages,
              as: 'images',
              required: false,
            },
            {
              model: modelDepartment,
              as: 'department',
              required: false,
            },
          ]
        },
      ]
      const vResponse: IFavoriteProductAttributes[] =
        await modelFavoriteProduct.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllFavoriteProduct = await fxReponseServices(
          pParam,
          whereStatement,
          modelFavoriteProduct.name,
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
    viewCreationParams: IFavoriteProductCreationAttributes
  ): Promise<IFavoriteProductAttributes> {
    try {
      const existingFavorite = await modelFavoriteProduct.findOne({
        where: {
          productId: viewCreationParams.productId,
          userId: viewCreationParams.userId,
        },
      })

      if (existingFavorite) {
        return existingFavorite
      }

      const vResponse: IFavoriteProductAttributes =
        await modelFavoriteProduct.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: IFavoriteProductCreationAttributes,
    id: string
  ): Promise<IFavoriteProductAttributes | null> {
    try {
      if (id) {
        const vResponse: IFavoriteProductInstance | null = await modelFavoriteProduct.findOne({
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
      const record = await modelFavoriteProduct.update(
        { deletedAt: new Date() },
        {
          where: { productId: pId },
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
export default new FavoriteProductsService()
