import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'
import type { IProductAttributes } from '@products/productModel'

export interface IProductAlertQueueAttributes {
  id?: string
  productId: string
  previousPrice?: number | null
  currentPrice?: number | null
  previousStock?: number | null
  currentStock?: number | null
  alertType: 'price_drop' | 'stock_available'
  processed: boolean
  processedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
  product?: IProductAttributes | null
}

export type IProductAlertQueueCreationAttributes = Pick<
  IProductAlertQueueAttributes,
  'productId' | 'alertType'
> &
  Partial<
    Pick<
      IProductAlertQueueAttributes,
      | 'id'
      | 'previousPrice'
      | 'currentPrice'
      | 'previousStock'
      | 'currentStock'
      | 'processed'
      | 'processedAt'
    >
  >

export interface IProductAlertQueueInstance
  extends Model<IProductAlertQueueAttributes, IProductAlertQueueCreationAttributes>,
    IProductAlertQueueAttributes {}

export const vProductAlertQueueModelAttributes: SequelizeAttributes<IProductAlertQueueAttributes> =
  {
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
    productId: {
      type: DataTypes.UUID,
      field: 'product_id',
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    previousPrice: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'previous_price',
      allowNull: true,
    },
    currentPrice: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'current_price',
      allowNull: true,
    },
    previousStock: {
      type: DataTypes.INTEGER,
      field: 'previous_stock',
      allowNull: true,
    },
    currentStock: {
      type: DataTypes.INTEGER,
      field: 'current_stock',
      allowNull: true,
    },
    alertType: {
      type: DataTypes.ENUM('price_drop', 'stock_available'),
      field: 'alert_type',
      allowNull: false,
    },
    processed: {
      type: DataTypes.BOOLEAN,
      field: 'processed',
      defaultValue: false,
    },
    processedAt: {
      type: DataTypes.DATE,
      field: 'processed_at',
      allowNull: true,
    },
  }

export function fxProductAlertQueueFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IProductAlertQueueInstance>>sequelize.define(
    'ProductAlertQueue',
    {
      ...vProductAlertQueueModelAttributes,
    },
    {
      tableName: 'product_alert_queue',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: false, // No soft delete para esta tabla de cola
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelProductAlertQueue, modelProduct } = models
    modelProductAlertQueue.belongsTo(modelProduct, {
      foreignKey: 'productId',
      as: 'product',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
