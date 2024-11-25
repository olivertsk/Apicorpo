import { modelProduct, modelProductImages } from '@db/index'
import { type FindOptions } from 'sequelize'
import type { IProductAttributes, IProductCreationAttributes, IResponseAllProduct, IProductInstance } from '@entities/products/productModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'
import { IProductImageAttributes, IProductImageCreationAttributes, IProductImageInstance } from './productImagesModel'

class ProductsService {
  async validate(data: any) {
    const dataValidate = modelProduct.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IProductAttributes | null> {
    try {
      const vResponse: IProductAttributes | null = await modelProduct.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllProduct> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelProduct.name
      )
      whereStatement.include = [
        {
          model: modelProductImages,
          as: 'images'
        }
      ]
      const vResponse: IProductAttributes[] = await modelProduct.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllProduct = await fxReponseServices(
          pParam,
          whereStatement,
          modelProduct.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(productCreationParams: IProductCreationAttributes): Promise<IProductAttributes> {
    try {
      const vResponse: IProductAttributes = await modelProduct.create(productCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async bulkProductImages(dataParams: IProductImageCreationAttributes[]): Promise<IProductImageAttributes[]> {
    try {
      const vResponse: IProductImageAttributes[] = await modelProductImages.bulkCreate(dataParams, {
        updateOnDuplicate: ['id']
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(productCreationParams: IProductCreationAttributes, id: string): Promise<IProductAttributes | null> {
    try {
      if (id) {
        const vResponse: IProductInstance | null = await modelProduct.findOne({
          where: {
            id: id
          }
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(productCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }
  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelProduct.update(
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
  async deleteImages(pId: string): Promise<string | null> {
    try {
      const vImagesForDetele: IProductImageInstance | null = await modelProductImages.findOne({
        where: {
          id: pId
        }
      })
      const nameImages = vImagesForDetele?.file || ''
      const record = await vImagesForDetele?.destroy({ force: true })
      if (!record) {
        return null
      }
      return nameImages
    } catch (error) {
      throw error
    }
  }
}
export default new ProductsService()
