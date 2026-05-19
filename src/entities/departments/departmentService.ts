import {
  modelCategory,
  modelDepartment,
  modelFavoriteProduct,
  modelProduct,
  modelProductImages,
} from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import type {
  IDepartmentAttributes,
  IDepartmentCreationAttributes,
  IResponseAllDepartment,
  IDepartmentInstance,
} from '@entities/departments/departmentModel'
import {
  buildProductWhere,
  fxMuiFilters,
  fxMuiSort,
  fxOrderNameId,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'

class DepartmentsService {
  async validate(data: any) {
    const dataValidate = modelDepartment.build(data)
    await dataValidate.validate()
  }
  public async get(id?: string, name?: string): Promise<IDepartmentAttributes | null> {
    try {
      const whereStatement: FindOptions = {}
      if (name) {
        whereStatement.where = {
          name: name,
        }
        whereStatement.logging = true
      } else {
        whereStatement.where = {
          id: id,
        }
      }
      const vResponse: IDepartmentAttributes | null = await modelDepartment.findOne(whereStatement)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async firstOrCreateCode(code: string): Promise<IDepartmentAttributes | null> {
    try {
      // const vResponse: IDepartmentInstance | null = await modelDepartment.findOne({
      //   where: {
      //     code: code,
      //   },
      // })
      const vResponse: IDepartmentInstance | null = await modelDepartment.findOne({
        where: {
          [Op.or]: [{ code: code }, { name: code }],
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async firstOrCreate(data: {
    code: string
    name: string
  }): Promise<IDepartmentAttributes | null> {
    try {
      const vResponse: IDepartmentInstance | null = await modelDepartment.findOne({
        where: {
          [Op.or]: [{ code: data.code }, { name: data.name }],
        },
      })
      if (vResponse === null) {
        const vResponseCreate: IDepartmentAttributes = await modelDepartment.create({
          code: data.code,
          name: data.name,
          icon: '',
          status: true,
          isSalient: false,
        })
        return vResponseCreate
      }
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<IResponseAllDepartment> {
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
        modelDepartment.name
      )
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
      if (pParam?.product) {
        const includeProduct: any = [
          {
            model: modelProduct,
            as: 'products',
            limit: 12,
            include: [
              {
                model: modelFavoriteProduct,
                as: 'favorite',
                required: false,
                where: { userId: pParam?.userId },
                attributes: ['id'],
              },
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
            ],
          },
        ]

        if (pParam?.isClient) {
          includeProduct[0].where = {
            status: true,
            stock: {
              [Op.gt]: 10, // Mayor que 0
              [Op.not]: null, // No es null
            },
          }
        }

        whereStatement.include = includeProduct
      }
      if (pParam?.categories) {
        whereStatement.include = [
          {
            model: modelCategory,
            as: 'categories',
            attributes: ['id', 'icon', 'name', 'description'],
            where: {
              status: true,
            },
          },
        ]
      }
      let vResponse: IDepartmentAttributes[] = await modelDepartment.findAll(whereStatement)
      const hasProductFilters = !!(
        pParam?.minPrice ||
        pParam?.maxPrice ||
        pParam?.categoriesIds ||
        pParam?.productName
      )
      if (hasProductFilters) {
        const filtersProduct = {
          minPrice: pParam?.minPrice,
          maxPrice: pParam?.maxPrice,
          categoryIds: pParam?.categoriesIds,
          search: pParam?.productName,
          isClient: true,
        }
        const productWhere = buildProductWhere(filtersProduct, pParam?.isClient)
        // Para cada departamento, contar productos
        const deptsWithCount = await Promise.all(
          vResponse.map(async (dept) => {
            const deptJSON = JSON.parse(JSON.stringify(dept)) as IDepartmentAttributes
            const count = await modelProduct.count({
              where: {
                ...productWhere,
                departmentId: dept.id,
              },
            })
            return { ...deptJSON, productCount: count }
          })
        )
        vResponse = deptsWithCount
      }
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllDepartment = await fxReponseServices(
          pParam,
          whereStatement,
          modelDepartment.name,
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

  public async create(
    viewCreationParams: IDepartmentCreationAttributes
  ): Promise<IDepartmentAttributes> {
    try {
      const vResponse: IDepartmentAttributes = await modelDepartment.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: IDepartmentCreationAttributes,
    id: string
  ): Promise<IDepartmentAttributes | null> {
    try {
      if (id) {
        const vResponse: IDepartmentInstance | null = await modelDepartment.findOne({
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

  async deleteImagesName(name: string): Promise<void> {
    try {
      const vImagesName: IDepartmentInstance | null = await modelDepartment.findOne({
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

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelDepartment.update(
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
}
export default new DepartmentsService()
