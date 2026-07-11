import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'
import type { IComboProductAttributes, IComboProductCreationAttributes } from './comboProductsModel'

export interface IComboAttributes {
  id?: string
  name: string
  slug: string
  description?: string | null
  price: number
  priceBs?: number | null
  coverImage?: string | null
  status?: boolean
  products?: IComboProductAttributes[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllCombo {
  total?: number
  totalPage?: number
  data: IComboAttributes[]
  actualPage?: number
}

export interface IComboFilter {
  pag?: number
  limit?: number
  name?: string | null
  search?: string | null
}
export type IComboCreationAttributes = Pick<IComboAttributes, 'id'> & {
  name: string
  slug: string
  description?: string | null
  price: number
  priceBs?: number | null
  coverImage?: string | null
  status?: boolean
  products?: IComboProductCreationAttributes[]
}
export interface IComboInstance
  extends Model<IComboAttributes, IComboCreationAttributes>,
    IComboAttributes {}

export const vComboModelAttributes: SequelizeAttributes<IComboAttributes> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  priceBs: {
    field: 'price_bs',
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  coverImage: {
    field: 'cover_image',
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
}

export function fxComboFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IComboInstance>>sequelize.define(
    'Combo',
    {
      ...vComboModelAttributes,
    },
    {
      tableName: 'combos',
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelCombo, modelProduct, modelComboProduct } = models

    // Relación Muchos a Muchos con Productos usando la tabla intermedia
    modelCombo.belongsToMany(modelProduct, {
      through: modelComboProduct,
      foreignKey: 'comboId',
      otherKey: 'productId',
      as: 'products', // Este alias debe coincidir con tus 'include'
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
