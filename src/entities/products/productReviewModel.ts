import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { IProductAttributes } from '@products/productModel'
import type { IUserAttributes } from '@users/userModel'
import type { ModelRegistry } from '@db/index'

export interface IProductReviewAttributes {
  id?: string
  productId?: IProductAttributes['id']
  userId?: IUserAttributes['id']
  rating: number
  comment?: string
  isApproved?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IResponseAllProductReview {
  total?: number
  totalPage?: number
  data: IProductReviewAttributes[]
  actualPage?: number
}

export interface IProductReviewFilter {
  pag?: number
  limit?: number
  productId?: string
  sort?: any
  search?: string
  isClient?: boolean
}
export type IProductReviewCreationAttributes = Omit<IProductReviewAttributes, 'id'>

export interface IProductReviewInstance
  extends Model<IProductReviewAttributes, IProductReviewCreationAttributes>,
    IProductReviewAttributes {}

export const vProductReviewModelAttributes: SequelizeAttributes<IProductReviewAttributes> = {
  id: {
    type: DataTypes.UUID,
    field: 'id',
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
    allowNull: false,
    references: { model: 'products', key: 'id' },
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }, // Forzamos el rango de estrellas
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    field: 'is_approved',
    defaultValue: false, // Requiere aprobación manual del admin de Corpoindustri
  },
}

export function fxProductReviewFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IProductReviewInstance>>sequelize.define(
    'ProductReview',
    { ...vProductReviewModelAttributes },
    {
      tableName: 'product_reviews',
      timestamps: true,
      freezeTableName: true,
    }
  )

  vData.associate = function (models: ModelRegistry) {
    const { modelProductReview, modelProduct, modelUser } = models
    modelProductReview.belongsTo(modelProduct, { foreignKey: 'productId', as: 'product' })
    modelProductReview.belongsTo(modelUser, { foreignKey: 'userId', as: 'author' })
  }

  return vData
}
