import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'

export interface IPermissionAttributes {
  id?: string
  rolId?: string
  viewId?: string
  post: boolean
  put: boolean
  delete: boolean
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export interface Permission {
  id: string
  name: string
  description?: string
  path: string // Ruta asociada al permiso
  group: string // Grupo de menú (ej: "Leads", "Contactos", etc.)
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
  name?: string
}
// export type IGroupCreationAttributes = Pick<IGroupAttributes, 'id' | 'name'> & Partial<Pick<IGroupAttributes, 'status' >>;

export type IPermissionCreationAttributes = Pick<
  IPermissionAttributes,
  'id' | 'rolId' | 'viewId'
> & {
  post?: boolean | false
  put?: boolean | false
  delete?: boolean | false
}

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
    allowNull: true,
  },
  put: {
    type: DataTypes.BOOLEAN,
    field: 'put',
    defaultValue: null,
    allowNull: true,
  },
  delete: {
    type: DataTypes.BOOLEAN,
    field: 'delete',
    defaultValue: null,
    allowNull: true,
  },
}

export function fxPermissionFactory(sequelize: Sequelize) {
  const vPermission = <ModelStatic<IPermissionInstance>>sequelize.define(
    'Permission',
    {
      ...vPermissionModelAttributes,
    },
    {
      tableName: 'permissions',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vPermission.associate = function (models: ModelRegistry) {
    const { modelPermission, modelView } = models
    modelPermission.belongsTo(modelView, {
      foreignKey: 'viewId',
      as: 'view',
    })
  }
  vPermission.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vPermission
}
