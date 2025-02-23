import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IProductImageAttributes {
  id?: string
  file: string
  alt?: string
  position: number
  isVideo?: boolean
  productId?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllProductImage {
  total?: number
  totalPage?: number
  data: IProductImageAttributes[]
  actualPage?: number
}

export interface IProductImageFilter {
  pag?: number
  limit?: number
  name?: string | null
}
export type IProductImageCreationAttributes = Pick<IProductImageAttributes, 'id' | 'isVideo'> &
  Partial<Pick<IProductImageAttributes, 'file' | 'productId'>> & {
    position?: number | 0
    alt?: string | null
  }
export interface IProductImageInstance
  extends Model<IProductImageAttributes, IProductImageCreationAttributes>,
    IProductImageAttributes {}

export const vProductImageModelAttributes: SequelizeAttributes<IProductImageAttributes> = {
  id: {
    type: DataTypes.UUID,
    field: 'id',
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdAt',
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedAt',
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deletedAt',
  },
  file: {
    type: DataTypes.STRING,
    field: 'file',
    allowNull: false,
  },
  alt: {
    type: DataTypes.STRING,
    field: 'alt',
    allowNull: true,
    defaultValue: null,
  },
  position: {
    type: DataTypes.INTEGER,
    field: 'position',
    allowNull: true,
    defaultValue: 0,
  },
  isVideo: {
    type: DataTypes.BOOLEAN,
    field: 'is_video',
    allowNull: true,
    defaultValue: false,
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
    allowNull: true,
    references: {
      model: 'products',
      key: 'id',
    },
  },
}

export function fxProductImageFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IProductImageInstance>>sequelize.define(
    'ProductImage',
    {
      ...vProductImageModelAttributes,
    },
    {
      tableName: 'product_images',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
