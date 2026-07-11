import sequelize, {
  modelCategory,
  modelCombo,
  modelComboProduct,
  modelFavoriteProduct,
  modelProduct,
  modelProductImages,
} from '@db/index'
import { type FindOptions, Sequelize } from 'sequelize'
import type {
  IComboAttributes,
  IComboCreationAttributes,
  IResponseAllCombo,
} from '@entities/combos/comboModel'
import {
  fxMuiFilters,
  fxMuiSort,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'

// Definimos un tipo para los productos del combo con cantidad
interface IComboProductInput {
  productId: string
  quantity: number
}

class CombosService {
  async validate(data: any) {
    const dataValidate = modelCombo.build(data)
    await dataValidate.validate()
  }

  // Obtener un combo por ID o slug (con productos y cálculos)
  public async getByIdOrSlug(identifier: string, isClient = false): Promise<any | null> {
    try {
      const where: any = {}
      // Determinar si es UUID o slug (asumo slug es string sin guiones)
      if (identifier.includes('-') && identifier.length === 36) {
        where.id = identifier
      } else {
        where.slug = identifier
      }
      const combo: any = await modelCombo.findOne({
        where,
        include: [
          {
            model: modelProduct,
            as: 'products',
            through: { attributes: ['quantity'] },
            required: false,
            include: [
              {
                model: modelProductImages,
                as: 'images',
                required: false,
              },
            ],
          },
        ],
      })
      if (!combo) return null

      // Calcular stock y ahorro
      const comboData = combo.toJSON()
      let minStock = Infinity
      let totalOriginalPrice = 0
      let availableStock = 0

      if (comboData.products && comboData.products.length > 0) {
        for (const p of comboData.products) {
          // En las relaciones belongsToMany, los atributos intermedios se guardan en el alias del pivote
          const pivot = p.comboProduct || p.combo_product || p.ComboProduct
          const quantity = pivot?.quantity || 1
          const stock = p.stock || 0 // ¡Ojo! El stock le pertenece a 'p' (Product), no a p.product

          const price =
            p.promotionalPrice && p.promotionalPrice < p.price ? p.promotionalPrice : p.price
          totalOriginalPrice += price * quantity

          const stockForCombo = Math.floor(stock / quantity)
          if (stockForCombo < minStock) minStock = stockForCombo
        }
        availableStock = minStock === Infinity ? 0 : minStock
      } else {
        availableStock = 0
      }

      const savedAmount = totalOriginalPrice - comboData.price

      // Si es cliente y stock <= 10, podríamos devolver null o manejarlo
      if (isClient && availableStock <= 10) {
        return null
      }

      return {
        ...comboData,
        availableStock,
        savedAmount,
        totalOriginalPrice,
      }
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllCombo> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'search',
        modelCombo.name
      )

      // Filtros específicos de combo
      if ('isSalient' in pParam && pParam.isSalient !== undefined && pParam.isSalient !== null) {
        whereStatement.where = {
          ...whereStatement.where,
          isSalient: pParam.isSalient,
        }
      }
      if (pParam?.isClient) {
        whereStatement.where = {
          ...whereStatement.where,
          status: true,
        }
      }

      // Incluir productos con cantidad (si se requiere)
      if (pParam?.withProducts || pParam?.product) {
        // Si se pide con productos, lo incluimos
        whereStatement.include = [
          {
            model: modelProduct,
            as: 'products',
            through: { attributes: ['quantity'] },
            required: false,
            include: [
              {
                model: modelProductImages,
                as: 'images',
                required: false,
              },
              {
                model: modelFavoriteProduct,
                as: 'favorite',
                required: false,
                where: pParam?.userId ? { userId: pParam.userId } : {},
                attributes: ['id'],
              },
              {
                model: modelCategory,
                as: 'category',
                required: false,
              },
            ],
          },
        ]
      }

      // Si se pide categorías (no aplica a combo directamente, pero se puede ignorar)

      let vResponse: IComboAttributes[] = await modelCombo.findAll(whereStatement)

      // Procesar cada combo para calcular stock y ahorro (si se incluyeron productos)
      if (pParam?.withProducts || pParam?.product) {
        const processed = vResponse.map((combo: any) => {
          const comboJSON = combo.toJSON ? combo.toJSON() : combo
          let minStock = Infinity
          let totalOriginalPrice = 0
          let availableStock = 0
          const products = comboJSON.products || []
          if (products.length > 0) {
            for (const p of products) {
              // p viene con el atributo 'comboProduct' que tiene quantity
              const quantity = p.comboProduct?.quantity || 1
              const stock = p.stock || 0
              const price =
                p.promotionalPrice && p.promotionalPrice < p.price ? p.promotionalPrice : p.price
              totalOriginalPrice += price * quantity
              const stockForCombo = Math.floor(stock / quantity)
              if (stockForCombo < minStock) minStock = stockForCombo
            }
            availableStock = minStock === Infinity ? 0 : minStock
          } else {
            availableStock = 0
          }
          const savedAmount = totalOriginalPrice - comboJSON.price
          return {
            ...comboJSON,
            availableStock,
            savedAmount,
            totalOriginalPrice,
          }
        })

        // Filtrar por stock si es cliente (availableStock <= 10)
        if (pParam?.isClient) {
          vResponse = processed.filter((item) => item.availableStock > 10)
        } else {
          vResponse = processed
        }
      }

      // Si hay filtros de producto (minPrice, maxPrice, categoriesIds) pero esto es para combos?
      // La especificación no lo pide, pero si se necesita, podemos implementar similar a departamentos.
      // Por ahora, lo dejamos.

      if (Number(pParam?.pag)) {
        // Nota: fxReponseServices espera que vResponse sea el array de resultados, pero ya lo procesamos.
        // Podríamos pasar el array procesado.
        const vResponsePaginate: IResponseAllCombo = await fxReponseServices(
          pParam,
          whereStatement,
          modelCombo.name,
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

  // Crear combo con sus productos
  public async create(
    data: IComboCreationAttributes & { products?: IComboProductInput[] }
  ): Promise<IComboAttributes> {
    const transaction = await sequelize.transaction()
    try {
      // Crear el combo
      const combo = await modelCombo.create(data, { transaction })
      // Si hay productos, crear los registros en comboProducts
      if (data.products && data.products.length > 0) {
        const comboProducts: any = data.products.map((item) => ({
          comboId: combo.id,
          productId: item.productId,
          quantity: item.quantity,
        }))
        await modelComboProduct.bulkCreate(comboProducts, { transaction })
      }
      await transaction.commit()
      // Retornar el combo con los productos (opcional)
      return combo
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  // Actualizar combo
  public async update(
    id: string,
    data: IComboCreationAttributes & { products?: IComboProductInput[] }
  ): Promise<IComboAttributes | null> {
    const transaction = await sequelize.transaction()
    try {
      const combo = await modelCombo.findByPk(id, { transaction })
      if (!combo) {
        await transaction.rollback()
        return null
      }
      // Actualizar campos del combo sin la relación products
      const { products, ...comboData } = data
      await combo.update(comboData, { transaction })
      // Actualizar productos: eliminar los existentes y crear los nuevos
      if (products) {
        await modelComboProduct.destroy({
          where: { comboId: id },
          transaction,
        })
        if (products.length > 0) {
          const comboProducts = products.map((item) => ({
            comboId: id,
            productId: item.productId,
            quantity: item.quantity,
          }))
          await modelComboProduct.bulkCreate(comboProducts, { transaction })
        }
      }
      await transaction.commit()
      // Retornar el combo actualizado (sin productos, o puedes recargar)
      return combo
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  // Eliminar (soft delete) si se usa paranoid
  public async softDelete(id: string): Promise<boolean> {
    try {
      const combo = await modelCombo.findByPk(id)
      if (!combo) return false
      await combo.destroy() // si paranoid: true, hace soft delete
      return true
    } catch (error) {
      throw error
    }
  }

  // Eliminar permanentemente (si es necesario)
  public async hardDelete(id: string): Promise<boolean> {
    try {
      const combo = await modelCombo.findByPk(id)
      if (!combo) return false
      await combo.destroy({ force: true })
      return true
    } catch (error) {
      throw error
    }
  }
}

export default new CombosService()
