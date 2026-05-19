import sequelize, { modelPost } from '@db/index'
import { type FindOptions } from 'sequelize'
import {
  type IPostAttributes,
  type IPostCreationAttributes,
  type IResponseAllPost,
  type IPostInstance,
  type IPostFilter,
} from '@entities/posts/postModel'
import {
  fxMuiFilters,
  fxMuiSort,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'

class PostsService {
  async validate(data: any) {
    const dataValidate = modelPost.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<IPostAttributes | null> {
    try {
      const vResponse: IPostAttributes | null = await modelPost.findOne({
        where: {
          id,
        },
        include: [
          {
            association: 'products',
          },
        ],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }
  public async getBySlug(slug: string): Promise<IPostAttributes | null> {
    try {
      const vResponse: IPostAttributes | null = await modelPost.findOne({
        where: {
          slug,
        },
        include: [
          {
            association: 'products',
          },
        ],
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: IPostFilter): Promise<IResponseAllPost> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)
      if (pParam?.search) {
        pParam.typeSearch = 'title, slug, excerpt, content, metaTitle, metaDescription'
        whereStatement.where = fxSearchILike(pParam, whereStatement, 'search', modelPost.name)
      }
      if (pParam?.title) {
        whereStatement.where = {
          ...whereStatement.where,
          title: fxSearchILike(pParam, whereStatement, 'title', modelPost.name),
        }
      }
      if (pParam?.type) {
        whereStatement.where = {
          ...whereStatement.where,
          type: pParam?.type,
        }
      }
      whereStatement.logging = true
      const vResponse: IPostAttributes[] = await modelPost.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllPost = await fxReponseServices(
          pParam,
          whereStatement,
          modelPost.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: IPostCreationAttributes): Promise<IPostAttributes> {
    try {
      const vResponse: IPostAttributes = await modelPost.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async createWithProducts(
    viewCreationParams: IPostCreationAttributes,
    productIds: string[]
  ): Promise<IPostAttributes> {
    const t = await sequelize.transaction() // Iniciamos transacción

    try {
      // 1. Crear el Post (Artículo o Receta)
      const vPost = await modelPost.create(viewCreationParams, { transaction: t })

      // 2. Si hay productos y es tipo 'recipe', los vinculamos
      if (productIds.length > 0 && viewCreationParams.type === 'recipe') {
        await (vPost as any).setProducts(productIds, { transaction: t })
      }

      await t.commit() // Confirmamos todo
      return vPost
    } catch (error) {
      await t.rollback() // Si algo falla, deshacemos la creación del Post
      throw error
    }
  }

  public async updateWithProducts(
    id: string,
    itemUpdateParams: IPostCreationAttributes,
    productIds: string[]
  ): Promise<IPostAttributes | null> {
    const t = await sequelize.transaction() // Importante para la integridad

    try {
      const vPost = await modelPost.findOne({
        where: { id: id },
        transaction: t,
      })

      if (!vPost) {
        await t.rollback()
        return null
      }

      // 1. Actualizar datos básicos del Post (Título, Contenido, SEO, etc.)
      await vPost.update(itemUpdateParams, { transaction: t })

      // 2. Sincronizar productos si es una receta
      if (itemUpdateParams.type === 'recipe') {
        // setProducts limpia los anteriores y deja solo los nuevos IDs
        await (vPost as any).setProducts(productIds, { transaction: t })
      } else {
        // Si el post dejó de ser receta, limpiamos las relaciones de productos
        await (vPost as any).setProducts([], { transaction: t })
      }

      await t.commit()
      return vPost
    } catch (error) {
      await t.rollback()
      throw error
    }
  }
  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelPost.update(
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
  async deleteImagesName(name: string): Promise<void> {
    try {
      const vImagesName: IPostInstance | null = await modelPost.findOne({
        where: {
          coverImage: name,
        },
      })
      await vImagesName?.update({
        coverImage: '',
      })
    } catch (error) {
      throw error
    }
  }
}
export default new PostsService()
