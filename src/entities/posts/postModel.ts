import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'

export interface IPostAttributes {
  id?: string
  title: string
  slug: string
  content: string
  excerpt?: string | null
  coverImage?: string | null
  type: 'article' | 'recipe'
  metaTitle?: string | null
  metaDescription?: string | null
  status: boolean
  authorId?: string | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllPost {
  total?: number
  totalPage?: number
  data: IPostAttributes[]
  actualPage?: number
}

export interface IPostFilter {
  pag?: number
  limit?: number
  // name?: string | null
  isClient?: boolean
  filters?: any
  sort?: any
  search?: string
  title?: string
  type?: string
  typeSearch?: string
}

export type IPostCreationAttributes = Pick<IPostAttributes, 'id'> & {
  title: string
  slug: string
  content: string
  excerpt?: string | null
  coverImage?: string | null
  type: 'article' | 'recipe'
  metaTitle?: string | null
  metaDescription?: string | null
  status: boolean
  authorId?: string | null
  deletedAt?: null
}
export interface IPostInstance
  extends Model<IPostAttributes, IPostCreationAttributes>,
    IPostAttributes {}

export const vPostModelAttributes: SequelizeAttributes<IPostAttributes> = {
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
  title: { type: DataTypes.STRING, allowNull: false },
  // SEO: URL amigable basada en el título
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  excerpt: { type: DataTypes.STRING, allowNull: true }, // Para metas y listados
  coverImage: { type: DataTypes.STRING, field: 'cover_image' },
  type: {
    type: DataTypes.ENUM('article', 'recipe'),
    defaultValue: 'article',
  },
  // SEO Técnico
  metaTitle: { type: DataTypes.STRING, field: 'meta_title' },
  metaDescription: { type: DataTypes.STRING, field: 'meta_description' },
  status: { type: DataTypes.BOOLEAN, defaultValue: true },
  authorId: {
    type: DataTypes.UUID,
    field: 'author_id',
    references: { model: 'users', key: 'id' },
  },
}

export function fxPostFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IPostInstance>>sequelize.define(
    'Post',
    {
      ...vPostModelAttributes,
    },
    {
      tableName: 'posts',
      defaultScope: {
        attributes: {
          exclude: ['deletedAt'],
        },
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.associate = function (models: ModelRegistry) {
    const { modelPostProduct, modelPost, modelProduct } = models
    modelPost.belongsToMany(modelProduct, {
      through: modelPostProduct,
      foreignKey: 'postId',
      otherKey: 'productId',
      as: 'products',
    })
  }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
