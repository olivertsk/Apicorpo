import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IPasswordResetAttributes {
  id?: string
  code: string
  email: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllPasswordReset {
  total?: number
  totalPage?: number
  data: IPasswordResetAttributes[]
  actualPage?: number
}

export interface IPasswordResetFilter {
  pag?: number
  limit?: number
  name?: string | null
}
export type IPasswordResetCreationAttributes = Pick<IPasswordResetAttributes, 'id'> &
  Partial<Pick<IPasswordResetAttributes, 'code' | 'email'>>

export interface IPasswordResetInstance
  extends Model<IPasswordResetAttributes, IPasswordResetCreationAttributes>,
    IPasswordResetAttributes {}

export const vPasswordResetModelAttributes: SequelizeAttributes<IPasswordResetAttributes> = {
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
  code: {
    type: DataTypes.STRING,
    field: 'code',
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
  },
}

export function fxPasswordResetFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IPasswordResetInstance>>sequelize.define(
    'PasswordReset',
    {
      ...vPasswordResetModelAttributes,
    },
    {
      tableName: 'password_resets',
      freezeTableName: true,
      timestamps: true,
    }
  )

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
