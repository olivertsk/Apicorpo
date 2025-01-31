import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import { ModelRegistry } from '@db/index'
import { IProductImageCreationAttributes } from './productImagesModel'

export interface IProductAttributes {
  id?: string
  name: string
  code: string
  departmentId?: string | null
  categoryId?: string | null
  status?: boolean
  description?: string | null
  longDescription?: string | null
  price: number
  promotionalPrice?: number | null
  priceWithTax?: number | null
  stock: number
  brand?: string | null
  taxRate?: number | null
  coverImage?: string | null
  idn?: number
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export interface IProductAttributesResponse {
  id?: string
  name: string
  code: string
  departmentId?: string | null
  categoryId?: string | null
  status?: boolean
  description?: string | null
  longDescription?: string | null
  price: number
  promotionalPrice?: number | null
  stock: number
  brand?: string | null
  taxRate?: number | null
  coverImage?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  relations?: IProductAttributes[]
}

export interface IResponseAllProduct {
  total?: number
  totalPage?: number
  data: IProductAttributes[]
  actualPage?: number
}

export interface IProductFilter {
  pag?: number
  limit?: number
  name?: string | null
  search?: string | null
  departmentId?: string | null
  departmentIds?: string | null
  categoryId?: string | null
  categoriesIds?: string | null
  minPrice?: number | null
  maxPrice?: number | null
  order?: 'maxPrice' | 'minPrice'
  typeSearch?: string | null
  userId?: string | null
  isClient?: boolean
}
export type IProductCreationAttributes = Pick<
  IProductAttributes,
  'id' | 'departmentId' | 'categoryId' | 'description'
> &
  Partial<Pick<IProductAttributes, 'name' | 'code' | 'price' | 'priceWithTax'>> & {
    status?: boolean | true
    promotionalPrice?: number | null
    stock?: number
    brand?: string | null
    taxRate?: number | null
    longDescription?: string | null
    coverImage?: string | null
    images?: IProductImageCreationAttributes[]
  }
export interface IProductInstance
  extends Model<IProductAttributes, IProductCreationAttributes>,
    IProductAttributes {}

export const vProductModelAttributes: SequelizeAttributes<IProductAttributes> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdAt',
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedAt',
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deletedAt',
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    field: 'code',
    allowNull: false,
    unique: true,
  },
  departmentId: {
    type: DataTypes.UUID,
    field: 'department_id',
    allowNull: true,
    references: {
      model: 'departments',
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.UUID,
    field: 'category_id',
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    defaultValue: true,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    field: 'description',
    allowNull: true,
    defaultValue: null,
  },
  longDescription: {
    type: DataTypes.TEXT,
    field: 'long_description',
    allowNull: true,
    defaultValue: null,
  },
  price: {
    type: DataTypes.FLOAT,
    field: 'price',
    allowNull: false,
  },
  promotionalPrice: {
    type: DataTypes.FLOAT,
    field: 'promotional_price',
    allowNull: true,
    defaultValue: null,
  },
  priceWithTax: {
    type: DataTypes.FLOAT,
    field: 'price_with_tax',
    allowNull: true,
    defaultValue: null,
  },
  stock: {
    type: DataTypes.INTEGER,
    field: 'stock',
    allowNull: true,
    defaultValue: 0,
  },
  brand: {
    type: DataTypes.STRING,
    field: 'brand',
    allowNull: true,
    defaultValue: null,
  },
  taxRate: {
    type: DataTypes.FLOAT,
    field: 'tax_rate',
    allowNull: true,
    defaultValue: 0,
  },
  coverImage: {
    type: DataTypes.STRING,
    field: 'cover_image',
    allowNull: true,
    defaultValue: '',
  },
  idn: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
}

export function fxProductFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IProductInstance>>sequelize.define(
    'Product',
    {
      ...vProductModelAttributes,
    },
    {
      tableName: 'products',
      // defaultScope: {
      //   order: [['createdAt', 'DESC']],
      // },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const {
      modelProduct,
      modelProductImages,
      modelDepartment,
      modelCategory,
      modelFavoriteProduct,
    } = models
    modelProduct.hasMany(modelProductImages, {
      foreignKey: 'productId',
      as: 'images',
    })
    modelProduct.belongsTo(modelDepartment, {
      foreignKey: 'departmentId',
      as: 'department',
    })
    modelProduct.belongsTo(modelCategory, {
      foreignKey: 'categoryId',
      as: 'category',
    })
    modelProduct.hasOne(modelFavoriteProduct, {
      foreignKey: 'productId',
      as: 'favorite',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
