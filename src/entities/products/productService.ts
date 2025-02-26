import { modelCategory, modelDepartment, modelFavoriteProduct, modelProduct, modelProductImages } from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import type { IProductAttributes, IProductCreationAttributes, IResponseAllProduct, IProductInstance, IProductAttributesResponse, IProductFilter } from '@entities/products/productModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'
import { IProductImageAttributes, IProductImageCreationAttributes, IProductImageInstance } from './productImagesModel'

class ProductsService {
  async validate(data: any) {
    const dataValidate = modelProduct.build(data)
    await dataValidate.validate()
  }
  public async get(pParams: {
    auth: boolean
    id: string
    userId?: string | null
  }): Promise<IProductAttributes | null> {
    try {
      const whereStatement: FindOptions = {}
      whereStatement.where = {
        id: pParams.id,
      }
      whereStatement.include = [
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
        {
          model: modelCategory,
          as: 'category',
          required: false,
        },
      ]
      if (pParams?.userId) {
        whereStatement.include.push({
          model: modelFavoriteProduct,
          as: 'favorite',
          required: false,
          where: { userId: pParams?.userId },
          attributes: ['id'],
        })
      }
      const vResponse: IProductAttributes | null = await modelProduct.findOne(whereStatement)
      let prodoctReponse: IProductAttributesResponse = JSON.parse(JSON.stringify(vResponse))
      if (!pParams.auth) {
        const paramsRelations = {
          limit: 10,
          name: prodoctReponse.name,
          departmentId: prodoctReponse.departmentId,
          categoryId: prodoctReponse.categoryId,
          notProductId: prodoctReponse.id,
        }
        const relations = await this.relation(paramsRelations)
        prodoctReponse = {
          ...prodoctReponse,
          relations: relations.data,
        }
      }
      return prodoctReponse
    } catch (error) {
      throw error
    }
  }
  public async findByCode(code: string): Promise<IProductAttributes | null> {
    try {
      const whereStatement: FindOptions = {}
      whereStatement.where = {
        code: code,
      }
      const vResponse: IProductAttributes | null = await modelProduct.findOne(whereStatement)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: IProductFilter): Promise<IResponseAllProduct> {
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
          as: 'images',
          required: false,
        },
        {
          model: modelDepartment,
          as: 'department',
          required: false,
        },
        {
          model: modelCategory,
          as: 'category',
          required: false,
        },
      ]
      if (pParam?.userId) {
        whereStatement.include.push({
          model: modelFavoriteProduct,
          as: 'favorite',
          required: false,
          where: { userId: pParam?.userId },
          attributes: ['id'],
        })
      }
      if (pParam?.departmentIds) {
        whereStatement.where = {
          ...whereStatement.where,
          departmentId: {
            [Op.in]: pParam?.departmentIds.split(','),
          },
        }
      }
      if (pParam?.departmentId) {
        let departmentId = pParam.departmentId
        whereStatement.where = {
          ...whereStatement.where,
          departmentId: departmentId,
        }
      }
      if (pParam?.categoriesIds) {
        whereStatement.where = {
          ...whereStatement.where,
          categoryId: {
            [Op.in]: pParam.categoriesIds.split(','),
          },
        }
      }
      if (pParam?.categoryId) {
        whereStatement.where = {
          ...whereStatement.where,
          categoryId: pParam.categoryId,
        }
      }
      if (pParam?.minPrice) {
        whereStatement.where = {
          ...whereStatement.where,
          [Op.and]: {
            [Op.or]: [
              { price: { [Op.gte]: Number(pParam.minPrice) } },
              { promotionalPrice: { [Op.gte]: Number(pParam.minPrice) } },
            ],
          },
        }
      }
      if (pParam?.maxPrice) {
        whereStatement.where = {
          ...whereStatement.where,
          [Op.and]: {
            [Op.or]: [
              { price: { [Op.lte]: Number(pParam.maxPrice) } },
              { promotionalPrice: { [Op.lte]: Number(pParam.maxPrice) } },
            ],
          },
        }
      }
      if (pParam?.order) {
        const type = pParam.order === 'maxPrice' ? 'DESC' : 'ASC'
        whereStatement.order = [
          ['price', type],
          ['promotionalPrice', type],
        ]
      }
      if (!whereStatement.order) {
        whereStatement.order = [['createdAt', 'DESC']]
      }
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
      console.log('error :>> ', error)
      throw error
    }
  }

  public async relation(pParam: any): Promise<IResponseAllProduct> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement.include = [
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
        {
          model: modelCategory,
          as: 'category',
          required: false,
        },
      ]
      if (pParam?.name) {
        whereStatement.where = {
          ...whereStatement.where,
          [Op.or]: {
            name: pParam.name,
          },
        }
      }
      if (pParam?.departmentId) {
        whereStatement.where = {
          ...whereStatement.where,
          [Op.or]: {
            departmentId: pParam.departmentId,
          },
        }
      }
      if (pParam?.categoryId) {
        whereStatement.where = {
          ...whereStatement.where,
          [Op.or]: {
            categoryId: pParam.categoryId,
          },
        }
      }
      if (pParam?.notProductId) {
        console.log('pParam?.notProductId :>> ', pParam?.notProductId)
        whereStatement.where = {
          ...whereStatement.where,
          id: { [Op.not]: pParam.notProductId },
        }
      }
      const vResponse: IProductAttributes[] = await modelProduct.findAll(whereStatement)
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(
    productCreationParams: IProductCreationAttributes
  ): Promise<IProductAttributes> {
    try {
      const vResponse: IProductAttributes = await modelProduct.create(productCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async bulkProductImages(
    dataParams: IProductImageCreationAttributes[],
    productId?: string
  ): Promise<IProductImageAttributes[]> {
    try {
      if (productId) {
        await modelProductImages.destroy({
          where: {
            productId: productId,
          },
          force: true,
        })
      }
      const vResponse: IProductImageAttributes[] = await modelProductImages.bulkCreate(dataParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    productCreationParams: IProductCreationAttributes,
    id: string
  ): Promise<IProductAttributes | null> {
    try {
      if (id) {
        const vResponse: IProductInstance | null = await modelProduct.findOne({
          where: {
            id: id,
          },
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
        { 
          deletedAt: new Date(),
          code: `detele-${pId}-${new Date().getTime()}`
        },
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
          id: pId,
        },
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

  async deleteImagesName(name: string): Promise<string | null> {
    try {
      const vImagesForDetele: IProductImageInstance | null = await modelProductImages.findOne({
        where: {
          file: name,
        },
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

  public async saveMasive2(dataParams: IProductAttributes[]): Promise<IProductAttributes[]> {
    try {
      const vResponse: IProductAttributes[] = await modelProduct.bulkCreate(dataParams, {
        updateOnDuplicate: ['code', 'name', 'departmentId', 'price', 'stock', 'taxRate'],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }
  // Método de servicio
  public async saveMasive1(dataParams: IProductAttributes[]): Promise<IProductAttributes[] | []> {
    if (!modelProduct.sequelize) {
      console.log('no tiene modelProduct.sequelize')
      return []
    }
    const transaction = await modelProduct.sequelize.transaction()
    try {
      const upsertResults = await Promise.all(
        dataParams.map(async (product) => {
          return await modelProduct.upsert(product, { transaction })
        })
      )
      const vResponse: IProductAttributes[] = upsertResults.map((result) => result[0])
      if (vResponse) {
        await transaction.commit()
        return vResponse
      }
      return []
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  public async saveMasive(dataParams: IProductAttributes[]): Promise<IProductAttributes[]> {
    if (!modelProduct.sequelize) {
      console.log('no tiene modelProduct.sequelize')
      return []
    }
    const transaction = await modelProduct.sequelize.transaction()
    try {
      const results: IProductAttributes[] = await Promise.all(
        dataParams.map(async (product) => {
          const existingProduct = await modelProduct.findOne({
            where: { code: product.code },
            transaction,
          })

          if (existingProduct) {
            await existingProduct.update(product, { transaction })
            return existingProduct
          } else {
            return await modelProduct.create(product, { transaction })
          }
        })
      )
      await transaction.commit()
      return results
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
export default new ProductsService()
