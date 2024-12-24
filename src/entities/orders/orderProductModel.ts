import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IOrderProductAttributes {
  id?: string
  productId?: string
  orderId?: string
  code?: string
  salePrice: number
  valueTax: number
  quantity: number
  subtotalTax: number
  subtotal: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllOrderProduct {
  total?: number
  totalPage?: number
  data: IOrderProductAttributes[]
  actualPage?: number
}

export interface IOrderProductFilter {
  pag?: number
  limit?: number
  name?: string | null
  isClient?: boolean
}
export type IOrderProductCreationAttributes = Pick<IOrderProductAttributes, 'id'> &
  Partial<Pick<IOrderProductAttributes, 'productId' |
    'orderId' |
    'code' |
    'salePrice' |
    'valueTax' |
    'quantity' |
    'subtotalTax' |
    'subtotal'
    >>
export interface IOrderProductInstance
  extends Model<IOrderProductAttributes, IOrderProductCreationAttributes>,
    IOrderProductAttributes {}

export const vOrderProductModelAttributes: SequelizeAttributes<IOrderProductAttributes> = {
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
    allowNull: true,
    defaultValue: null
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
  orderId: {
    type: DataTypes.UUID,
    field: 'order_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  code: {
    type: DataTypes.STRING,
    field: 'code',
    // comment: 'Codigo de producto',
  },
  salePrice: {
    type: DataTypes.FLOAT,
    field: 'sale_price',
    // comment: 'Precio marcado al momento de venta del producto',
  },
  valueTax: {
    type: DataTypes.FLOAT,
    field: 'value_tax',
    // comment: 'Tax del producto producto',
  },
  quantity: {
    type: DataTypes.INTEGER,
    field: 'quantity',
  },
  subtotalTax: {
    type: DataTypes.FLOAT,
    field: 'subtotal_tax',
    // comment: 'Tax del producto por cantidad',
  },
  subtotal: {
    type: DataTypes.FLOAT,
    field: 'subtotal',
  },
}

export function fxOrderProductFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IOrderProductInstance>>sequelize.define(
    'OrderProduct',
    {
      ...vOrderProductModelAttributes,
    },
    {
      tableName: 'order_products',
      defaultScope: {
        attributes: {
          exclude: ['deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
