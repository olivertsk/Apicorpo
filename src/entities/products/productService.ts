import sequelize, {
  modelCategory,
  modelDepartment,
  modelFavoriteProduct,
  modelProduct,
  modelProductImages,
} from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import type {
  IProductAttributes,
  IProductCreationAttributes,
  IResponseAllProduct,
  IProductInstance,
  IProductAttributesResponse,
  IProductFilter,
} from '@entities/products/productModel'
import {
  fxMuiFilters,
  fxMuiSort,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'
import type {
  IProductImageAttributes,
  IProductImageCreationAttributes,
  IProductImageInstance,
} from './productImagesModel'

class ProductsService {
  async validate(data: any) {
    const dataValidate = modelProduct.build(data)
    await dataValidate.validate()
  }
  public async get(pParams: {
    auth: boolean
    id?: string
    name?: string
    userId?: string | null
  }): Promise<IProductAttributes | null> {
    try {
      const whereStatement: FindOptions = {}
      if (pParams?.name) {
        whereStatement.where = {
          name: pParams.name,
        }
      } else {
        whereStatement.where = {
          id: pParams.id,
        }
      }
      whereStatement.attributes = {
        include: [
          [
            sequelize.literal(
              // eslint-disable-next-line quotes
              `(SELECT ROUND(AVG(rating), 1) FROM product_reviews WHERE product_id = Product.id AND is_approved = true)`
            ),
            'avgRating',
          ],
          [
            sequelize.literal(
              // eslint-disable-next-line quotes
              `(SELECT COUNT(*) FROM product_reviews WHERE product_id = Product.id AND is_approved = true)`
            ),
            'totalReviews',
          ],
          [
            sequelize.literal(
              // eslint-disable-next-line quotes
              `(SELECT COUNT(*) FROM product_comments WHERE product_id = Product.id AND is_approved = true)`
            ),
            'totalComments',
          ],
        ],
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
      // if (!pParams.auth) {
      const paramsRelations = {
        limit: 10,
        name: prodoctReponse.name,
        departmentId: prodoctReponse.departmentId,
        categoryId: prodoctReponse.categoryId,
        notProductId: prodoctReponse.id,
      }
      if (vResponse?.id) {
        modelProduct
          .increment('views', { by: 1, where: { id: vResponse.id } })
          .catch((err) => console.error('Error al incrementar views:', err))
      }
      const relations = await this.relation(paramsRelations)
      prodoctReponse = {
        ...prodoctReponse,
        relations: relations.data,
      }
      // }
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

  public async all(pParam: IProductFilter): Promise<IResponseAllProduct | any> {
    try {
      pParam.limit = pParam?.limit || 50
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)

      let scoreSql = ''

      if (pParam?.search) {
        const searchString = pParam.search.trim().replace(/([0-9]+)([a-zA-Z]+)/g, '$1 $2')
        const stopWords = [
          'und',
          'unds',
          'unidad',
          'unidades',
          'kg',
          'gr',
          'g',
          'ml',
          'de',
          'la',
          'el',
          'con',
          'para',
        ]

        const words = searchString
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 1 && !stopWords.includes(word))

        if (words.length > 0) {
          const orConditions: any[] = []
          words.forEach((word) => {
            orConditions.push({ name: { [Op.like]: `%${word}%` } })
            // orConditions.push({ brand: { [Op.like]: `%${word}%` } })
            // orConditions.push({ model: { [Op.like]: `%${word}%` } })
            // orConditions.push({ unit: { [Op.like]: `%${word}%` } })
          })

          whereStatement.where = {
            ...whereStatement.where,
            [Op.or]: orConditions,
          }

          // 2. Ajustamos el Scoring para darle máxima prioridad a coincidencias en el Nombre
          scoreSql = words
            .map(
              (word) => `CASE WHEN LOWER(\`Product\`.\`name\`) LIKE '%${word}%' THEN 3 ELSE 0 END`
            )
            .join(' + ')
        }
      } else {
        whereStatement.where = fxSearchILike(
          pParam,
          whereStatement,
          pParam?.typeSearch || 'name',
          modelProduct.name
        )
      }

      // --- Inyección de Atributos Extra (Reviews/Comments) ---
      whereStatement.attributes = {
        include: [
          [
            sequelize.literal(
              '(SELECT ROUND(AVG(rating), 1) FROM product_reviews AS reviews WHERE reviews.product_id = Product.id AND reviews.is_approved = true)'
            ),
            'avgRating',
          ],
          [
            sequelize.literal(
              // eslint-disable-next-line quotes
              `(SELECT COUNT(*) FROM product_reviews AS reviews WHERE reviews.product_id = Product.id AND reviews.is_approved = true)`
            ),
            'totalReviews',
          ],
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM product_comments AS comments WHERE comments.product_id = Product.id AND comments.is_approved = true)'
            ),
            'totalComments',
          ],
        ],
      }

      // --- Relaciones/Includes ---
      whereStatement.include = [
        { model: modelProductImages, as: 'images', required: false },
        { model: modelDepartment, as: 'department', required: false },
        { model: modelCategory, as: 'category', required: false },
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

      // --- Filtros por Categorías y Departamentos ---
      if (pParam?.departmentIds) {
        whereStatement.where = {
          ...whereStatement.where,
          departmentId: { [Op.in]: pParam?.departmentIds.split(',') },
        }
      }
      if (pParam?.departmentId) {
        whereStatement.where = { ...whereStatement.where, departmentId: pParam.departmentId }
      }
      if (pParam?.categoriesIds) {
        whereStatement.where = {
          ...whereStatement.where,
          categoryId: { [Op.in]: pParam.categoriesIds.split(',') },
        }
      }
      if (pParam?.categoryId) {
        whereStatement.where = { ...whereStatement.where, categoryId: pParam.categoryId }
      }
      // --- Nuevos Filtros Directos de Facetas (Desde el Front) ---
      if (pParam?.brand) {
        whereStatement.where = {
          ...whereStatement.where,
          brand: pParam.brand, // Filtra exactamente por la marca seleccionada
        }
      }

      if (pParam?.model) {
        whereStatement.where = {
          ...whereStatement.where,
          model: pParam.model, // Filtra exactamente por el modelo (Ej: 225GR)
        }
      }

      if (pParam?.unit) {
        whereStatement.where = {
          ...whereStatement.where,
          unit: pParam.unit, // Filtra exactamente por la unidad (Ej: 12UND)
        }
      }

      // --- Filtros de Rangos de Precio (USD / Bs) ---
      const priceConditions: any[] = []
      if (pParam?.minPrice && pParam.typePrice === 'price') {
        priceConditions.push({
          [Op.or]: [
            { price: { [Op.gte]: Number(pParam.minPrice) } },
            { promotionalPrice: { [Op.gte]: Number(pParam.minPrice) } },
          ],
        })
      }
      if (pParam?.maxPrice && pParam.typePrice === 'price') {
        priceConditions.push({
          [Op.or]: [
            { price: { [Op.lte]: Number(pParam.maxPrice) } },
            { promotionalPrice: { [Op.lte]: Number(pParam.maxPrice) } },
          ],
        })
      }
      if (pParam?.minPrice && pParam.typePrice === 'priceBs') {
        priceConditions.push({
          [Op.or]: [
            { priceBs: { [Op.gte]: Number(pParam.minPrice) } },
            { promotionalPriceBs: { [Op.gte]: Number(pParam.minPrice) } },
          ],
        })
      }
      if (pParam?.maxPrice && pParam.typePrice === 'priceBs') {
        priceConditions.push({
          [Op.or]: [
            { priceBs: { [Op.lte]: Number(pParam.maxPrice) } },
            { promotionalPriceBs: { [Op.lte]: Number(pParam.maxPrice) } },
          ],
        })
      }
      if (priceConditions.length > 0) {
        whereStatement.where = { ...whereStatement.where, [Op.and]: priceConditions }
      }

      // --- Regla de negocio para clientes ---
      if ('isClient' in pParam && pParam.isClient) {
        whereStatement.where = {
          ...whereStatement.where,
          status: true,
          stock: { [Op.gt]: 10, [Op.not]: null },
        }
      }

      // --- Construcción del Ordenamiento Combinado ---
      const finalOrder: any[] = []
      if (scoreSql) {
        finalOrder.push([sequelize.literal(`(${scoreSql})`), 'DESC'])
      }
      if (pParam?.order) {
        const type = pParam.order === 'maxPrice' ? 'DESC' : 'ASC'
        finalOrder.push(['price', type])
        finalOrder.push(['promotionalPrice', type])
      }
      finalOrder.push(['views', 'DESC'])
      finalOrder.push(['createdAt', 'DESC'])
      whereStatement.order = finalOrder

      // --- 3. 🔥 EJECUCIÓN DE QUERIES COMPLEMENTARIAS (FACETAS) ---
      let facets: { brands: any[]; models: any[]; units: any[] } = {
        brands: [],
        models: [],
        units: [],
      }

      // Solo calculamos facetas si el usuario está buscando algo textualmente (pág 1)
      // y para no recargar las consultas en paginaciones avanzadas.
      if (pParam?.search && (!pParam.pag || Number(pParam.pag) === 1)) {
        // Clonamos el objeto where actual para que respete los filtros aplicados (ej: departamento, stock, etc)
        const facetsWhere = { ...whereStatement.where }

        // Ejecutamos consultas paralelas ultra eficientes agrupando por MySQL
        const [brandFacets, modelFacets, unitFacets] = await Promise.all([
          modelProduct.findAll({
            where: { ...facetsWhere, brand: { [Op.not]: null } },
            attributes: ['brand', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            group: ['brand'],
            order: [[sequelize.literal('count'), 'DESC']],
            limit: 10, // Top 10 marcas más relevantes de esa búsqueda
            raw: true,
          }),
          modelProduct.findAll({
            where: { ...facetsWhere, model: { [Op.not]: null } },
            attributes: ['model', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            group: ['model'],
            order: [[sequelize.literal('count'), 'DESC']],
            limit: 10,
            raw: true,
          }),
          modelProduct.findAll({
            where: { ...facetsWhere, unit: { [Op.not]: null } },
            attributes: ['unit', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            group: ['unit'],
            order: [[sequelize.literal('count'), 'DESC']],
            limit: 10,
            raw: true,
          }),
        ])

        facets = {
          brands: brandFacets.map((f: any) => ({ name: f.brand, count: f.count })),
          models: modelFacets.map((f: any) => ({ name: f.model, count: f.count })),
          units: unitFacets.map((f: any) => ({ name: f.unit, count: f.count })),
        }
      }

      // --- Ejecución de la consulta principal de productos ---
      const vResponse: IProductAttributes[] = await modelProduct.findAll(whereStatement)

      if (Number(pParam?.pag)) {
        const vResponsePaginate: any = await fxReponseServices(
          pParam,
          whereStatement,
          modelProduct.name,
          vResponse
        )

        // Inyectamos las facetas en la respuesta paginada
        return {
          ...vResponsePaginate,
          facets: facets,
        }
      }

      return { data: vResponse, facets }
    } catch (error) {
      console.error('Error en ProductsService.all:', error)
      throw error
    }
  }

  public async relation(pParam: any): Promise<IResponseAllProduct> {
    console.log('relation')
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
      let orConditions: any[] = []

      let name = pParam.name
      if (pParam?.name) {
        if (name.includes('UND')) {
          name = name.replace('UND', '')
        }
        if (name.includes('GR')) {
          name = name.replace('GR', '')
        }
        orConditions.push({ name: { [Op.like]: `%${name}%` } })
      }
      // if (pParam?.departmentId) {
      //   orConditions.push({ departmentId: pParam.departmentId })
      // }
      if (pParam?.categoryId) {
        orConditions.push({ categoryId: pParam.categoryId })
      }
      if (pParam?.notProductId) {
        whereStatement.where = {
          ...whereStatement.where,
          id: { [Op.not]: pParam.notProductId },
        }
      }
      whereStatement.where = {
        [Op.or]: orConditions,
        ...whereStatement.where,
        status: true,
        stock: {
          [Op.gt]: 10,
          [Op.not]: null,
        },
      }
      whereStatement.limit = 50
      const vResponse: IProductAttributes[] = await modelProduct.findAll(whereStatement)

      // Ordenar los resultados por la cantidad de letras comunes en los nombres
      const sortedResponse = vResponse.sort((a, b) => {
        const commonLettersCountA = this.getCommonLettersCount(name, a.name)
        const commonLettersCountB = this.getCommonLettersCount(name, b.name)
        return commonLettersCountB - commonLettersCountA // Orden descendente
      })

      // Seleccionar los primeros 12 productos después de ordenar
      const limitedResponse = sortedResponse.slice(0, 12)
      return { data: limitedResponse }
    } catch (error) {
      throw error
    }
  }

  private getCommonLettersCount = (str1: string, str2: string): number => {
    const set1 = new Set(str1)
    const set2 = new Set(str2)
    let commonCount = 0
    set1.forEach((char) => {
      if (set2.has(char)) {
        commonCount++
      }
    })
    return commonCount
  }
  public async create(
    productCreationParams: IProductCreationAttributes
  ): Promise<IProductAttributes> {
    try {
      const { name, code } = productCreationParams

      // 1. Buscar si ya existe un producto activo con el mismo nombre
      const existingProduct = await modelProduct.findOne({
        where: {
          name: name,
          deletedAt: null, // solo productos no eliminados
        },
      })

      // 2. Si existe, modificar el nombre añadiendo el código
      let finalName = name
      if (existingProduct) {
        finalName = `${name} (${code})`
        // Opcional: si temes que el nombre+code también pudiera existir (raro, porque code es único),
        // podrías hacer una verificación recursiva sencilla.
      }
      // SELECT name, COUNT(name) AS repeticiones
      // FROM products
      // WHERE deletedAt IS NULL
      // GROUP BY name
      // HAVING COUNT(name) > 1
      // ORDER BY repeticiones DESC;

      // 3. Crear el producto con el nombre (posiblemente modificado)
      const vResponse: IProductAttributes = await modelProduct.create({
        ...productCreationParams,
        name: finalName,
      })
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
          code: `detele-${pId}-${new Date().getTime()}`,
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

  public async getSuggestions(search: string): Promise<{ id: string; name: string }[]> {
    try {
      const vResponse: any = await modelProduct.findAll({
        // CRÍTICO: Solo traemos las columnas mínimas para máxima velocidad
        attributes: ['name'],
        where: {
          status: true,
          // Mantenemos la regla de Corpoindustri de no sugerir cosas sin stock real
          stock: {
            [Op.gt]: 0,
            // [Op.not]: null,
          },
          // Búsqueda insensible a mayúsculas/minúsculas
          name: {
            [Op.like]: `${search}%`,
          },
        },
        // Ordenamos alfabéticamente para que se vea predecible
        order: [
          ['views', 'DESC'],
          ['name', 'ASC'],
        ],
        // Limitamos estrictamente a las 5 sugerencias solicitadas
        limit: 5,
        logging: false, // Desactivamos logs aquí para no saturar la consola en cada pulsación
      })

      return vResponse
    } catch (error) {
      throw error
    }
  }
}
export default new ProductsService()
