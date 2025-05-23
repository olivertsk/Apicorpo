import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IMapAttributes {
  id?: string
  image?: string
  name: string
  description?: string | null
  address?: string
  phoneNumber?: string
  email?: string
  map: string
  status: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllMap {
  total?: number
  totalPage?: number
  data: IMapAttributes[]
  actualPage?: number
}

export interface IMapFilter {
  pag?: number
  limit?: number
  name?: string | null
  isClient?: boolean
}
export type IMapCreationAttributes = Pick<IMapAttributes, 'id'> &
  Partial<Pick<IMapAttributes, 'name' | 'image' | 'map'>> & {
    status: boolean | true
    description?: string | null
    address?: string
    phoneNumber?: string
    email?: string
    order?: number | 0
    deletedAt?: null
  }
export interface IMapInstance
  extends Model<IMapAttributes, IMapCreationAttributes>,
    IMapAttributes {}

export const vMapModelAttributes: SequelizeAttributes<IMapAttributes> = {
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
  image: {
    type: DataTypes.STRING,
    field: 'image',
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    field: 'description',
    allowNull: true,
    defaultValue: null,
  },
  address: {
    type: DataTypes.STRING,
    field: 'address',
    allowNull: true,
    defaultValue: null,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number',
    allowNull: true,
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
    allowNull: true,
    defaultValue: null,
  },
  map: {
    type: DataTypes.STRING,
    field: 'map',
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    defaultValue: true,
    allowNull: true,
  },
  order: {
    type: DataTypes.STRING,
    field: 'order',
    defaultValue: 0,
    allowNull: true,
  },
}

export function fxMapFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IMapInstance>>sequelize.define(
    'Map',
    {
      ...vMapModelAttributes,
    },
    {
      tableName: 'maps',
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
