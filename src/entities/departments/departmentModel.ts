import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IDepartmentAttributes {
  id?: string
  icon?: string | null
  name: string
  description?: string | null
  status: boolean | true
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllDepartment {
  total?: number
  totalPage?: number
  data: IDepartmentAttributes[]
  actualPage?: number
}

export interface IDepartmentFilter {
  pag?: number
  limit?: number
  name?: string
}
export type IDepartmentCreationAttributes = Pick<IDepartmentAttributes, 'id' | 'description' | 'icon'> & 
  Partial<Pick<IDepartmentAttributes, 'name' >>
  & {
    status: boolean | true
  };
export interface IDepartmentInstance
  extends Model<IDepartmentAttributes, IDepartmentCreationAttributes>,
    IDepartmentAttributes {}

export const vDepartmentModelAttributes: SequelizeAttributes<IDepartmentAttributes> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdAt',
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedAt',
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deletedAt',
  },
  icon: {
    type: DataTypes.STRING,
    field: "icon",
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    field: "name",
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    field: "description",
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    defaultValue: true,
    allowNull: true,
  },
}

export function fxDepartmentFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IDepartmentInstance>>sequelize.define(
    'Department',
    {
      ...vDepartmentModelAttributes,
    },
    {
      tableName: 'departments',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
