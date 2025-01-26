import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface INotificationAttributes {
  id?: string | null
  title: string
  body: string
  data?: string
  type?: string
  userId: string
  url: string
  isView?: boolean | true
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllNotification {
  total?: number
  totalPage?: number
  data: INotificationAttributes[]
  actualPage?: number
}

export interface INotificationFilter {
  pag?: number
  limit?: number
  name?: string | null
  userId?: string
  isView?: boolean | true
}
export type INotificationCreationAttributes = Pick<INotificationAttributes, 'title' | 'body'> &
  Partial<Pick<INotificationAttributes, 'id' | 'body'>> & {
    data?: string
    url?: string
    type?: string
    isView?: boolean | true
    userId?: string
  }
export interface INotificationInstance
  extends Model<INotificationAttributes, INotificationCreationAttributes>,
    INotificationAttributes {}

export const vNotificationModelAttributes: SequelizeAttributes<INotificationAttributes> = {
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
  title: {
    type: DataTypes.STRING,
    field: 'title',
  },
  body: {
    type: DataTypes.STRING,
    field: 'body',
  },
  data: {
    type: DataTypes.STRING,
    field: 'data',
    allowNull: true,
    defaultValue: null,
  },
  type: {
    type: DataTypes.STRING,
    field: 'type',
    allowNull: true,
    defaultValue: null,
  },
  url: {
    type: DataTypes.STRING,
    field: 'url',
    allowNull: true,
    defaultValue: null,
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: {
        tableName: 'users',
      },
      key: 'id',
    },
  },
  isView: {
    type: DataTypes.BOOLEAN,
    field: 'is_view',
    defaultValue: false,
    allowNull: true,
  },
}

export function fxNotificationFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<INotificationInstance>>sequelize.define(
    'Notification',
    {
      ...vNotificationModelAttributes,
    },
    {
      tableName: 'notifications',
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
