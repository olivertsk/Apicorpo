import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { IProductAttributes } from '@products/productModel'
import type { IPostAttributes } from './postModel'
import type { ModelRegistry } from '@db/index'

export interface IPostProductAttributes {
  id?: string
  postId?: IPostAttributes['id']
  productId?: IProductAttributes['id']
  createdAt?: Date
  updatedAt?: Date
}

export interface IResponseAllPostProduct {
  total?: number
  totalPage?: number
  data: IPostProductAttributes[]
  actualPage?: number
}

export interface IPostProductFilter {
  pag?: number
  limit?: number
  name?: string | null
  isClient?: boolean
  filters?: any
  sort?: any
  search?: string
}
export type IPostProductCreationAttributes = Pick<IPostProductAttributes, 'id'> & {
  postId?: IPostAttributes['id']
  productId?: IProductAttributes['id']
}
export interface IPostProductInstance
  extends Model<IPostProductAttributes, IPostProductCreationAttributes>,
    IPostProductAttributes {}

export const vPostProductModelAttributes: SequelizeAttributes<IPostProductAttributes> = {
  id: {
    type: DataTypes.UUID,
    field: 'id',
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
  postId: {
    type: DataTypes.UUID,
    field: 'post_id',
    references: { model: 'posts', key: 'id' },
    onDelete: 'CASCADE',
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
    references: { model: 'products', key: 'id' },
    onDelete: 'CASCADE',
  },
}

export function fxPostProductFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IPostProductInstance>>sequelize.define(
    'PostProduct',
    {
      ...vPostProductModelAttributes,
    },
    {
      tableName: 'post_products',
      defaultScope: {
        attributes: {
          exclude: ['deletedAt'],
        },
      },
      freezeTableName: true,
      timestamps: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelPostProduct, modelPost, modelProduct } = models
    modelPostProduct.belongsTo(modelPost, { foreignKey: 'postId', as: 'post' })
    modelPostProduct.belongsTo(modelProduct, { foreignKey: 'productId', as: 'product' })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
