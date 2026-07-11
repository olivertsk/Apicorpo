import { modelCategory, modelProduct } from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import type {
  ICategoryAttributes,
  ICategoryCreationAttributes,
  IResponseAllCategory,
  ICategoryInstance,
} from '@entities/categories/categoryModel'
import {
  buildProductWhere,
  fxMuiFilters,
  fxMuiSort,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'

class CategoriesService {
  async validate(data: any) {
    const dataValidate = modelCategory.build(data)
    await dataValidate.validate()
  }
  public async get(
    id: string | undefined,
    name: string | undefined
  ): Promise<ICategoryAttributes | null> {
    try {
      const vResponse: ICategoryAttributes | null = await modelCategory.findOne({
        where: {
          ...(id && { id }),
          ...(name && { name }),
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async firstOrCreateCode(data: {
    code: string
    name: string
  }): Promise<ICategoryAttributes | null> {
    try {
      let vItem: ICategoryAttributes | undefined
      const vResponse: ICategoryInstance | null = await modelCategory.findOne({
        where: {
          [Op.or]: [{ code: data.code }, { name: data.name }],
        },
      })
      if (vResponse) {
        if (vResponse.code === null) {
          vResponse.code = data.code
          await vResponse.save()
        }
        vItem = vResponse
      } else {
        vItem = await this.create({
          ...data,
          status: true,
          isSalient: false,
        })
      }
      return vItem
    } catch (error) {
      throw error
    }
  }
  public async all(pParam: any): Promise<IResponseAllCategory> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelCategory.name
      )
      if ('isSalient' in pParam && pParam.isSalient !== undefined && pParam.isSalient !== null) {
        whereStatement.where = {
          ...whereStatement.where,
          isSalient: pParam.isSalient,
        }
      }
      if (pParam?.departmentId) {
        whereStatement.where = {
          ...whereStatement.where,
          departmentId: pParam.departmentId,
        }
      }
      let vResponse: ICategoryAttributes[] = await modelCategory.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllCategory = await fxReponseServices(
          pParam,
          whereStatement,
          modelCategory.name,
          vResponse
        )
        return vResponsePaginate
      }
      const hasProductFilters = !!(
        pParam?.minPrice ||
        pParam?.maxPrice ||
        pParam?.departmentId ||
        pParam?.categoriesIds ||
        pParam?.productName
      )
      if (hasProductFilters) {
        const filtersProduct = {
          minPrice: pParam?.minPrice,
          maxPrice: pParam?.maxPrice,
          categoryIds: pParam?.categoriesIds,
          search: pParam?.productName,
          typePrice: pParam?.typePrice,
          departmentIds: pParam?.departmentIds,
          departmentId: pParam?.departmentId,
          isClient: true,
        }
        const productWhere = buildProductWhere(filtersProduct, pParam?.isClient)
        // Para cada departamento, contar productos
        const deptsWithCount = await Promise.all(
          vResponse.map(async (dept) => {
            const deptJSON = JSON.parse(JSON.stringify(dept)) as ICategoryAttributes
            const count = await modelProduct.count({
              where: {
                ...productWhere,
                categoryId: dept.id,
              },
            })
            return { ...deptJSON, productCount: count }
          })
        )
        vResponse = deptsWithCount
      }
      return { data: vResponse }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async create(
    viewCreationParams: ICategoryCreationAttributes
  ): Promise<ICategoryAttributes> {
    try {
      const vResponse: ICategoryAttributes = await modelCategory.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: ICategoryCreationAttributes,
    id: string
  ): Promise<ICategoryAttributes | null> {
    try {
      if (id) {
        const vResponse: ICategoryInstance | null = await modelCategory.findOne({
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
      const record = await modelCategory.update(
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
      const vImagesName: ICategoryInstance | null = await modelCategory.findOne({
        where: {
          icon: name,
        },
      })
      await vImagesName?.update({
        icon: '',
      })
    } catch (error) {
      throw error
    }
  }
}
export default new CategoriesService()
