import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'
import type { IPermissionCreationAttributes } from '@entities/permissions/permissionModel'

export interface IRolAttributes {
  id?: string
  name: string
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export interface IResponseAllRol {
  total?: number
  totalPage?: number
  data: IRolAttributes[]
  actualPage?: number
}

export interface IRolFilter {
  pag?: number
  limit?: number
  name?: string | null
}

export type IRolCreationAttributes = Pick<IRolAttributes, 'id' | 'name'> & {
  permissions?: IPermissionCreationAttributes[]
}

export interface IRolInstance
  extends Model<IRolAttributes, IRolCreationAttributes>,
    IRolAttributes {}

export const vRolModelAttributes: SequelizeAttributes<IRolAttributes> = {
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
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
  },
}

export function fxRolFactory(sequelize: Sequelize) {
  const vRol = <ModelStatic<IRolInstance>>sequelize.define(
    'Rol',
    {
      ...vRolModelAttributes,
    },
    {
      tableName: 'roles',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )
  vRol.associate = function (models: ModelRegistry) {
    const { modelUser, modelRol, modelPermission } = models
    modelRol.hasMany(modelUser, {
      foreignKey: 'rolId',
      as: 'users',
    })
    modelRol.hasMany(modelPermission, {
      foreignKey: 'rolId',
      as: 'permissions',
    })
  }

  vRol.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vRol
}
