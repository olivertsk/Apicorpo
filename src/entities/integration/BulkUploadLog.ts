import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IBulkUploadLogAttributes {
  id?: string
  type: string
  quantity: string
  date: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllBulkUploadLog {
  total?: number
  totalPage?: number
  data: IBulkUploadLogAttributes[]
  actualPage?: number
}

export interface IBulkUploadLogFilter {
  pag?: number
  limit?: number
}
export type IBulkUploadLogCreationAttributes = Pick<IBulkUploadLogAttributes, 'id'> &
  Partial<Pick<IBulkUploadLogAttributes, 'type' | 'quantity' | 'date'>>

export interface IBulkUploadLogInstance
  extends Model<IBulkUploadLogAttributes, IBulkUploadLogCreationAttributes>,
    IBulkUploadLogAttributes {}

export const vBulkUploadLogModelAttributes: SequelizeAttributes<IBulkUploadLogAttributes> = {
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
  type: {
    type: DataTypes.STRING,
    field: 'type',
  },
  quantity: {
    type: DataTypes.STRING,
    field: 'quantity',
  },
  date: {
    type: DataTypes.STRING,
    field: 'date',
  },
}

export function fxBulkUploadLogFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IBulkUploadLogInstance>>sequelize.define(
    'BulkUploadLog',
    {
      ...vBulkUploadLogModelAttributes,
    },
    {
      tableName: 'bulk_upload_logs',
      defaultScope: {
        attributes: {
          exclude: ['deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
    }
  )

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
