import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'
import type { IProductImageCreationAttributes } from './productImagesModel'

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
  priceBs?: number | null
  promotionalPriceBs?: number | null
  priceWithTaxBs?: number | null
  stock: number
  brand?: string | null
  taxRate?: number | null
  model?: string | null
  unit?: string | null
  coverImage?: string | null
  idn?: number
  views?: number | null
  reviewCount?: number | undefined
  averageRating?: number | undefined
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
  model?: string | null
  unit?: string | null
  coverImage?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  views?: number | null
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
  order?: 'maxPrice' | 'minPrice' | 'betterRating' | 'worseRating'
  typeSearch?: string | null
  userId?: string | null
  isClient?: boolean
  typePrice?: 'price' | 'priceBs'
  filters?: any
  sort?: any
  model?: string | null
  unit?: string | null
  brand?: string | null
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
    priceBs?: number | null
    promotionalPriceBs?: number | null
    priceWithTaxBs?: number | null
    views?: number | null
    model?: string | null
    unit?: string | null
    reviewCount?: number | undefined
    averageRating?: number | undefined
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
  priceBs: {
    type: DataTypes.FLOAT,
    field: 'price_bs',
    allowNull: false,
  },
  promotionalPriceBs: {
    type: DataTypes.FLOAT,
    field: 'promotional_price_bs',
    allowNull: true,
    defaultValue: null,
  },
  priceWithTaxBs: {
    type: DataTypes.FLOAT,
    field: 'priceWith_tax_bs',
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
  views: {
    type: DataTypes.INTEGER,
    field: 'views',
    allowNull: true,
    defaultValue: 0,
  },
  model: {
    type: DataTypes.STRING,
    field: 'model',
    allowNull: true,
    defaultValue: null,
  },
  unit: {
    type: DataTypes.STRING,
    field: 'unit',
    allowNull: true,
    defaultValue: null,
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    field: 'review_count',
    defaultValue: 0,
    allowNull: false,
  },
  averageRating: {
    type: DataTypes.DECIMAL(3, 2),
    field: 'average_rating',
    defaultValue: 0,
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
      modelPost,
      modelPostProduct,
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
    modelProduct.belongsToMany(modelPost, {
      through: modelPostProduct,
      foreignKey: 'productId',
      otherKey: 'postId',
      as: 'posts', // Permite ver en qué recetas sale un producto
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
