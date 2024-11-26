import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IViewAttributes {
  id?: string
  icon?: string | null
  name: string
  route?: string
  url?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllView {
  total?: number
  totalPage?: number
  data: IViewAttributes[]
  actualPage?: number
}

export interface IViewFilter {
  pag?: number
  limit?: number
  name?: string | null
}

export type IViewCreationAttributes = Pick<IViewAttributes, 'id' | 'route' | 'url'> & 
  Partial<Pick<IViewAttributes, 'name' >>
  & {
    icon?: string | null
  };

export interface IViewInstance
  extends Model<IViewAttributes, IViewCreationAttributes>,
    IViewAttributes {}

export const vViewModelAttributes: SequelizeAttributes<IViewAttributes> = {
  id: {
    type: DataTypes.UUID,
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
    defaultValue: null,
  },
  icon: {
    type: DataTypes.STRING,
    field: 'icon',
    defaultValue: null,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
    defaultValue: null,
    allowNull: true
  },
  route: {
    type: DataTypes.STRING,
    field: 'route',
    defaultValue: null,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    field: 'url',
    defaultValue: null,
    allowNull: true
  }
}

export function fxViewFactory(sequelize: Sequelize) {
  const vView = <ModelStatic<IViewInstance>>sequelize.define(
    'View',
    {
      ...vViewModelAttributes,
    },
    {
      tableName: 'views',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vView.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vView
}
