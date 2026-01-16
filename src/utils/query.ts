/* eslint-disable indent */
import { Op, type FindOptions } from 'sequelize'
import sequelize from '@db/index'

export enum EOrderQuery {
  MASNUEVOS = 1,
  NOMBRE = 2,
  MASVIEJOS = 3,
}
export const fxOrderNameId = (pParam: any, pWhereStatement: FindOptions) => {
  if (Number(pParam?.orden) === EOrderQuery.NOMBRE) {
    pWhereStatement.order =
      pWhereStatement.order instanceof Array
        ? [...pWhereStatement.order, ['name', 'ASC']]
        : [['name', 'ASC']]
  } else if (Number(pParam?.orden) === EOrderQuery.MASVIEJOS) {
    pWhereStatement.order =
      pWhereStatement.order instanceof Array
        ? [...pWhereStatement.order, ['createdAt', 'ASC']]
        : [['createdAt', 'ASC']]
  } else {
    pWhereStatement.order =
      pWhereStatement.order instanceof Array
        ? [...pWhereStatement.order, ['createdAt', 'DESC']]
        : [['createdAt', 'DESC']]
  }
  return pWhereStatement.order
}

const fxSearchILikeQuery = (
  pParam: any,
  pWhereStatement: FindOptions,
  pName: string,
  pAttibutesPermisse: string | string[]
) => {
  const vName = pName.trim()
  const search = pParam?.search || pParam?.name || pParam?.title || pParam?.text || ''
  if (pAttibutesPermisse.includes(vName)) {
    if (search.includes(',')) {
      const searchs: string[] = search.split(',')
      const searchsParse = searchs.map((search: string) => `%${search}%`)
      pWhereStatement.where = {
        ...pWhereStatement.where,
        [vName]: {
          [Op.or]: searchsParse.map((search) => ({ [Op.like]: search })),
        },
      }
    } else {
      pWhereStatement.where = {
        ...pWhereStatement.where,
        [vName]: { [Op.like]: `%${search}%` },
      }
    }
  }
  return pWhereStatement.where || {}
}

export const fxSearchILike = (
  pParam: any,
  pWhereStatement: FindOptions,
  pName: string = 'name',
  pModelName: string
) => {
  const vModelAttributes: any = sequelize.models[pModelName].getAttributes()
  const vAttibutesPermisse = Object.keys(vModelAttributes).filter(
    (key) =>
      vModelAttributes[key].type.key === 'STRING' || vModelAttributes[key].type.key === 'TEXT'
  )
  if (pParam?.search || pParam?.name || pParam?.title || pParam.text) {
    if (pParam?.typeSearch && pParam.typeSearch.includes(',')) {
      const vTypeSearchs = pParam.typeSearch.split(',')
      for (const typeSearch of vTypeSearchs) {
        const where = fxSearchILikeQuery(pParam, pWhereStatement, typeSearch, vAttibutesPermisse)
        pWhereStatement.where = { ...pWhereStatement.where, ...where }
      }
    } else {
      pWhereStatement.where = fxSearchILikeQuery(pParam, pWhereStatement, pName, vAttibutesPermisse)
    }
  }
  return pWhereStatement.where || {}
}

// export const fxFilterDate = (pParam: any, pWhereStatement: FindOptions) => {
//   if (pParam?.initDate) {
//     const vDate = new Date(pParam?.initDate)
//     const where = {
//       createdAt: {
//         [Op.gte]: vDate.toISOString().split('T')[0]
//       },
//     }
//     pWhereStatement.where = { ...pWhereStatement.where, ...where }
//   }
//   return pWhereStatement.where || {}
// }

export const fxFilterDate = (pParam: any, pWhereStatement: FindOptions) => {
  pWhereStatement.where = pWhereStatement.where || {}
  const initFilter = pParam?.type === 'suspension' ? 'init' : 'createdAt'
  const endFilter = pParam?.type === 'suspension' ? 'end' : 'createdAt'
  if (pParam?.initDate) {
    const [year, day, month] = pParam.initDate.split('/')
    const vDate = new Date(`${year}/${month}/${day}`)
    const where = {
      [initFilter]: {
        [Op.gt]: `${vDate.toISOString().split('T')[0]} 00:00:00.000 +00:00`,
      },
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  if (pParam?.endDate) {
    const [year, day, month] = pParam.endDate.split('/')
    const vDate = new Date(`${year}/${month}/${day}`)
    let where = {}
    if (pWhereStatement?.where && 'createdAt' in pWhereStatement.where) {
      where = {
        [endFilter]: {
          ...pWhereStatement.where.createdAt,
          [Op.lt]: `${vDate.toISOString().split('T')[0]} 24:00:00.000 +00:00`,
        },
      }
    } else {
      where = {
        [endFilter]: {
          [Op.lt]: `${vDate.toISOString().split('T')[0]} 24:00:00.000 +00:00`,
        },
      }
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  return pWhereStatement.where || {}
}

export const fxFilterDateUTC = (pParam: any, pWhereStatement: FindOptions) => {
  pWhereStatement.where = pWhereStatement.where || {}
  if (pParam?.initDate) {
    const vDate = pParam.initDate
    const where = {
      createdAt: {
        [Op.gte]: vDate.toISOString().split('T')[0] + 'Z',
      },
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  if (pParam?.endDate) {
    const vDate = pParam.endDate
    let where = {}
    if (pWhereStatement?.where && 'createdAt' in pWhereStatement.where) {
      where = {
        createdAt: {
          ...pWhereStatement.where.createdAt,
          [Op.lte]: vDate.toISOString().split('T')[0] + 'Z',
        },
      }
    } else {
      where = {
        createdAt: {
          [Op.lte]: vDate.toISOString().split('T')[0] + 'Z',
        },
      }
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  return pWhereStatement.where || {}
}

export const fxPaginate = (pParam: any, pWhereStatement: FindOptions) => {
  if (Number(pParam?.pag)) {
    const limit = Number(pParam?.limit) || 10 // Define cuantos registros por pagina quieres mostrar
    pWhereStatement.limit = limit
    pWhereStatement.offset = (pParam.pag - 1) * limit
  }
  return pWhereStatement
}

export const fxReponseServices = async (
  pParam: any,
  pWhereStatement: FindOptions,
  pModelName: string,
  vResponse: any
) => {
  const vLimit = Number(pParam?.limit) || 10
  const vCount = await sequelize.models[pModelName].count({
    ...pWhereStatement,
    distinct: true,
    col: 'id',
  })
  const vResponsePaginate: any = {
    data: vResponse,
    meta: {
      totalPage: Math.ceil(vCount / vLimit),
      total: vCount,
      actualPage: Number(pParam.pag),
    },
  }
  return vResponsePaginate
}

export interface MuiFilterItem {
  field: string
  operator: string
  value: string | number | boolean
}

const formatValue = (value: any, field: string): any => {
  if (typeof value === 'string') {
    if (field === 'status' || field === 'isSalient' || field === 'isClient') {
      console.log('llega no o si ', value)
      if (
        value.toLocaleLowerCase() === 'si' ||
        value.toLocaleLowerCase() === 'yes' ||
        value.toLocaleLowerCase() === 'Activo'
      ) {
        return true
      }
      if (
        value.toLocaleLowerCase() === 'no' ||
        value.toLocaleLowerCase() === 'no' ||
        value.toLocaleLowerCase() === 'Inactivo'
      ) {
        return false
      }
    }
    return `%${value}%`
  }
  return value
}
export const fxMuiFilters = (pParam: any, pWhereStatement: FindOptions): FindOptions => {
  if (!pParam?.filters) {
    return pWhereStatement
  }
  let filters = pParam.filters
  if (!Array.isArray(pParam.filters) && typeof pParam.filters === 'string') {
    filters = JSON.parse(pParam.filters)
  }
  if (filters.length === 0) {
    return pWhereStatement
  }
  const filterConditions: any[] = []
  filters.forEach((filter: MuiFilterItem) => {
    const { field, operator, value } = filter

    // Manejar el caso especial de "None"
    if (value === 'None' || (Array.isArray(value) && value.includes('None'))) {
      handleNoneFilter(filterConditions, field, operator, value)
      return
    }

    if (!value && value !== false) return // Skip empty filters

    switch (operator) {
      case 'contains':
        filterConditions.push({
          [field]: { [Op.like]: formatValue(value, field) },
        })
        break

      case 'in':
        filterConditions.push({
          [field]: { [Op.in]: value },
        })
        break

      case 'notIn':
        filterConditions.push({
          [field]: { [Op.notIn]: value },
        })
        break

      case 'notLike':
        filterConditions.push({
          [field]: { [Op.notLike]: `%${value}%` },
        })
        break

      case 'equals':
        filterConditions.push({
          [field]: { [Op.eq]: value },
        })
        break

      case 'startsWith':
        filterConditions.push({
          [field]: { [Op.like]: `${value}%` },
        })
        break

      case 'endsWith':
        filterConditions.push({
          [field]: { [Op.like]: `%${value}` },
        })
        break

      case 'isEmpty':
        filterConditions.push({
          [field]: { [Op.or]: [{ [Op.is]: null }, { [Op.eq]: '' }] },
        })
        break

      case 'isNotEmpty':
        filterConditions.push({
          [field]: { [Op.and]: [{ [Op.not]: null }, { [Op.ne]: '' }] },
        })
        break

      case '>':
        filterConditions.push({
          [field]: { [Op.gt]: value },
        })
        break

      case '>=':
        filterConditions.push({
          [field]: { [Op.gte]: value },
        })
        break

      case '<':
        filterConditions.push({
          [field]: { [Op.lt]: value },
        })
        break

      case '<=':
        filterConditions.push({
          [field]: { [Op.lte]: value },
        })
        break

      case 'is':
        if (value === 'true') {
          filterConditions.push({ [field]: true })
        } else if (value === 'false') {
          filterConditions.push({ [field]: false })
        }
        filterConditions.push({ [field]: value })
        break

      case 'includesAny':
        if (Array.isArray(value)) {
          const orConditions = value.map((val: string) => {
            if (val === 'None') {
              // Para "None" buscar valores nulos o vacíos
              return {
                [field]: {
                  [Op.or]: [{ [Op.is]: null }, { [Op.eq]: '' }, { [Op.eq]: 'None' }],
                },
              }
            } else {
              return {
                [field]: {
                  [Op.or]: [
                    { [Op.eq]: val },
                    { [Op.like]: `${val};%` },
                    { [Op.like]: `%;${val}` },
                    { [Op.like]: `%;${val};%` },
                  ],
                },
              }
            }
          })
          filterConditions.push({ [Op.or]: orConditions })
        }
        break

      case 'excludesAll':
        if (Array.isArray(value)) {
          const andConditions = value.map((val: string) => {
            if (val === 'None') {
              // Para "None" excluir valores nulos o vacíos
              return {
                [field]: {
                  [Op.and]: [{ [Op.not]: null }, { [Op.ne]: '' }, { [Op.ne]: 'None' }],
                },
              }
            } else {
              return {
                [field]: {
                  [Op.and]: [
                    { [Op.notLike]: `${val};%` },
                    { [Op.notLike]: `%;${val}` },
                    { [Op.notLike]: `%;${val};%` },
                    { [Op.ne]: val },
                  ],
                },
              }
            }
          })
          filterConditions.push({ [Op.and]: andConditions })
        }
        break

      default:
        // Default to contains for unknown operators
        filterConditions.push({
          [field]: { [Op.like]: `%${value}%` },
        })
    }
  })

  if (filterConditions.length > 0) {
    pWhereStatement.where = {
      ...pWhereStatement.where,
      [Op.and]: [
        ...(pWhereStatement.where && (pWhereStatement.where as any)[Op.and]
          ? [(pWhereStatement.where as any)[Op.and]]
          : []),
        ...filterConditions,
      ],
    }
  }

  return pWhereStatement
}

const handleNoneFilter = (filterConditions: any[], field: string, operator: string, value: any) => {
  console.log('handleNoneFilter')
  if (operator === 'includesAny') {
    if (Array.isArray(value)) {
      // Si hay múltiples valores incluyendo "None"
      const otherValues = value.filter((v) => v !== 'None')
      const orConditions = []

      // Condición para "None" (valores nulos o vacíos)
      orConditions.push({
        [field]: {
          [Op.or]: [{ [Op.is]: null }, { [Op.eq]: '' }, { [Op.eq]: 'None' }],
        },
      })

      // Condiciones para otros valores
      if (otherValues.length > 0) {
        otherValues.forEach((val) => {
          orConditions.push({
            [field]: {
              [Op.or]: [
                { [Op.eq]: val },
                { [Op.like]: `${val};%` },
                { [Op.like]: `%;${val}` },
                { [Op.like]: `%;${val};%` },
              ],
            },
          })
        })
      }

      filterConditions.push({ [Op.or]: orConditions })
    } else {
      // Solo "None"
      filterConditions.push({
        [field]: {
          [Op.or]: [{ [Op.is]: null }, { [Op.eq]: '' }, { [Op.eq]: 'None' }],
        },
      })
    }
  } else if (operator === 'excludesAll') {
    // Excluir "None" significa buscar solo valores no nulos/no vacíos
    filterConditions.push({
      [field]: {
        [Op.and]: [{ [Op.not]: null }, { [Op.ne]: '' }, { [Op.ne]: 'None' }],
      },
    })
  } else if (operator === 'equals') {
    // Búsqueda exacta de "None"
    filterConditions.push({
      [field]: {
        [Op.or]: [{ [Op.is]: null }, { [Op.eq]: '' }, { [Op.eq]: 'None' }],
      },
    })
  }
}

export const fxMuiSort = (pParam: any, pWhereStatement: FindOptions): FindOptions => {
  if (!pParam?.sort) {
    pWhereStatement.order = [['createdAt', 'DESC']]
    return pWhereStatement
  }

  try {
    let sortData: Array<{ field: string; sort: 'asc' | 'desc' }> = []

    if (typeof pParam.sort === 'string') {
      sortData = JSON.parse(pParam.sort)
    } else if (Array.isArray(pParam.sort)) {
      sortData = pParam.sort
    } else {
      pWhereStatement.order = [['createdAt', 'DESC']]
      return pWhereStatement
    }

    const validSortData = sortData.filter(
      (item) =>
        item &&
        item.field &&
        typeof item.field === 'string' &&
        item.field.trim() !== '' &&
        item.sort &&
        ['asc', 'desc'].includes(item.sort.toLowerCase())
    )

    if (validSortData.length === 0) {
      pWhereStatement.order = [['createdAt', 'DESC']]
      return pWhereStatement
    }

    // Crear array de ordenamiento para Sequelize
    const orderClauses: any[] = []

    validSortData.forEach((sortItem) => {
      const { field, sort } = sortItem
      const direction = sort.toUpperCase() as 'ASC' | 'DESC'

      // Manejar campos anidados (relaciones)
      if (field.includes('.')) {
        const fieldParts = field.split('.')

        if (fieldParts.length === 2) {
          // Para relación simple: ['relacion', 'campo', 'ASC']
          orderClauses.push([fieldParts[0], fieldParts[1], direction])
        } else if (fieldParts.length === 3) {
          // Para relación más profunda: ['relacion', 'otraRelacion', 'campo', 'ASC']
          orderClauses.push([fieldParts[0], fieldParts[1], fieldParts[2], direction])
        } else {
          // Si hay más niveles, construir dinámicamente
          const orderItem: any[] = []
          for (let i = 0; i < fieldParts.length; i++) {
            if (i === fieldParts.length - 1) {
              // Último elemento es el campo y dirección
              orderItem.push(fieldParts[i])
              orderItem.push(direction)
            } else {
              orderItem.push(fieldParts[i])
            }
          }
          orderClauses.push(orderItem)
        }
      } else {
        // Campo normal
        orderClauses.push([field, direction])
      }
    })

    // Aplicar el ordenamiento
    if (orderClauses.length > 0) {
      pWhereStatement.order = orderClauses
    }

    return pWhereStatement
  } catch (error) {
    console.warn('Error processing MUI sort:', error)
    pWhereStatement.order = [['createdAt', 'DESC']]
    return pWhereStatement
  }
}
