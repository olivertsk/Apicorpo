import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { IProductAttributes } from '@products/productModel'
import type { IUserAttributes } from '@users/userModel'
import type { ModelRegistry } from '@db/index'

export interface IProductCommentAttributes {
  id?: string
  productId?: IProductAttributes['id']
  userId?: IUserAttributes['id']
  parentId?: string | null
  content: string
  isApproved?: boolean
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export interface IProductCommentFilter {
  pag?: number
  limit?: number
  productId?: string
  sort?: any
  search?: string
  isClient?: boolean
}

export interface IResponseAllProductComment {
  total?: number
  totalPage?: number
  data: IProductCommentAttributes[]
  actualPage?: number
}

export type IProductCommentCreationAttributes = Omit<
  IProductCommentAttributes,
  'id' | 'parentId'
> & {
  parentId?: string | null
}

export interface IProductCommentInstance
  extends Model<IProductCommentAttributes, IProductCommentCreationAttributes>,
    IProductCommentAttributes {}

export const vProductCommentModelAttributes: SequelizeAttributes<IProductCommentAttributes> = {
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
  parentId: {
    type: DataTypes.UUID,
    field: 'parent_id',
    allowNull: true,
    references: { model: 'product_comments', key: 'id' },
    onDelete: 'CASCADE', // Si se borra el comentario padre, se borran las respuestas
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    field: 'is_approved',
    defaultValue: false,
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
}

export function fxProductCommentFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IProductCommentInstance>>sequelize.define(
    'ProductComment',
    { ...vProductCommentModelAttributes },
    {
      tableName: 'product_comments',
      timestamps: true,
      freezeTableName: true,
    }
  )

  vData.associate = function (models: ModelRegistry) {
    const { modelProductComment, modelProduct, modelUser } = models
    modelProductComment.belongsTo(modelProduct, { foreignKey: 'productId', as: 'product' })
    modelProductComment.belongsTo(modelUser, { foreignKey: 'userId', as: 'author' })

    // Asociación recursiva para hilos de conversación
    modelProductComment.hasMany(modelProductComment, { foreignKey: 'parentId', as: 'replies' })
    modelProductComment.belongsTo(modelProductComment, { foreignKey: 'parentId', as: 'parent' })
  }

  return vData
}
