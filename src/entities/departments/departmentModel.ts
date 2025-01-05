import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import { ModelRegistry } from '@db/index'

export interface IDepartmentAttributes {
  id?: string
  icon?: string | null
  name: string
  description?: string | null
  code?: string | null
  status: boolean | true
  isSalient: boolean | true
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
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
  name?: string | null
  isSalient?: boolean | null
  product?: boolean
  userId?: string | null
  isClient?: boolean
  categories?: boolean
}
export type IDepartmentCreationAttributes = Pick<IDepartmentAttributes, 'id' | 'description' | 'icon'> &
  Partial<Pick<IDepartmentAttributes, 'name'>> & {
    status: boolean | true
    isSalient: boolean | false
    code?: string | null
  }
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
  code: {
    type: DataTypes.STRING,
    field: "code",
    allowNull: true,
    defaultValue: null
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
  isSalient: {
    type: DataTypes.BOOLEAN,
    field: 'isSalient',
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
  vData.associate = function (models: ModelRegistry) {
    const { modelProduct, modelDepartment, modelCategory } = models
    modelDepartment.hasMany(modelProduct, {
      foreignKey: 'departmentId',
      sourceKey: 'id',
      as: 'products',
    })
    modelDepartment.hasMany(modelCategory, {
      foreignKey: 'departmentId',
      sourceKey: 'id',
      as: 'categories',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
