import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IPermissionAttributes {
  id?: string
  rolId?: string
  viewId?: string
  post: boolean
  put: boolean
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllPermission {
  total?: number
  totalPage?: number
  data: IPermissionAttributes[]
  actualPage?: number
}

export interface IPermissionFilter {
  pag?: number
  limit?: number
  name?: string | null
}

export type IPermissionCreationAttributes = Pick<IPermissionAttributes, 'id'> & 
  Partial<Pick<IPermissionAttributes, 'rolId' | 'viewId' >>
  & {
    post: boolean | false
    put: boolean | false
    delete: boolean | false
  };

export interface IPermissionInstance
  extends Model<IPermissionAttributes, IPermissionCreationAttributes>,
    IPermissionAttributes {}

export const vPermissionModelAttributes: SequelizeAttributes<IPermissionAttributes> = {
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
  rolId: {
    type: DataTypes.UUID,
    field: 'rol_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
  viewId: {
    type: DataTypes.UUID,
    field: 'view_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'views',
      key: 'id',
    },
  },
  post: {
    type: DataTypes.BOOLEAN,
    field: 'post',
    defaultValue: null,
    allowNull: true
  },
  put: {
    type: DataTypes.BOOLEAN,
    field: 'put',
    defaultValue: null,
    allowNull: true
  },
  delete: {
    type: DataTypes.BOOLEAN,
    field: 'delete',
    defaultValue: null,
    allowNull: true
  },
}

export function fxPermissionFactory(sequelize: Sequelize) {
  const vPermission = <ModelStatic<IPermissionInstance>>sequelize.define(
    'Permission',
    {
      ...vPermissionModelAttributes,
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

  vPermission.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vPermission
}
