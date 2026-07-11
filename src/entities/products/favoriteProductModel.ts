import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'

export interface IFavoriteProductAttributes {
  id?: string
  productId: string
  userId: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllFavoriteProduct {
  total?: number
  totalPage?: number
  data: IFavoriteProductAttributes[]
  actualPage?: number
}

export interface IFavoriteProductFilter {
  pag?: number
  limit?: number
  name?: string | null
  userId?: string | null
  isClient?: boolean | null
}
export type IFavoriteProductCreationAttributes = Pick<IFavoriteProductAttributes, 'productId'> &
  Partial<Pick<IFavoriteProductAttributes, 'id' | 'userId'>>
export interface IFavoriteProductInstance
  extends Model<IFavoriteProductAttributes, IFavoriteProductCreationAttributes>,
    IFavoriteProductAttributes {}

export const vFavoriteProductModelAttributes: SequelizeAttributes<IFavoriteProductAttributes> = {
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
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deletedAt',
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}

export function fxFavoriteProductFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IFavoriteProductInstance>>sequelize.define(
    'FavoriteProduct',
    {
      ...vFavoriteProductModelAttributes,
    },
    {
      tableName: 'favorite_products',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelFavoriteProduct, modelProduct, modelUser } = models
    modelFavoriteProduct.belongsTo(modelProduct, {
      foreignKey: 'productId',
      as: 'product',
    })
    modelFavoriteProduct.belongsTo(modelUser, {
      foreignKey: 'userId',
      as: 'user',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
