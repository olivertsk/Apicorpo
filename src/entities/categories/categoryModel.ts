import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface ICategoryAttributes {
  id?: string
  icon?: string | null
  name: string
  description?: string | null
  status: boolean | true
  departmentId?: string | null
  isSalient?: boolean | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllCategory {
  total?: number
  totalPage?: number
  data: ICategoryAttributes[]
  actualPage?: number
}

export interface ICategoryFilter {
  pag?: number
  limit?: number
  name?: string | null
  isSalient?: boolean | null
  departmentId?: string | null
  isClient?: boolean
}
export type ICategoryCreationAttributes = Pick<ICategoryAttributes, 'id' | 'description' | 'icon'> & 
  Partial<Pick<ICategoryAttributes, 'name' >>
  & {
    status: boolean | true
    departmentId?: string | null
    isSalient?: boolean | null
  };
export interface ICategoryInstance
  extends Model<ICategoryAttributes, ICategoryCreationAttributes>,
    ICategoryAttributes {}

export const vCategoryModelAttributes: SequelizeAttributes<ICategoryAttributes> = {
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
    defaultValue: false,
    allowNull: true,
  },
  departmentId: {
    type: DataTypes.UUID,
    field: 'department_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'departments',
      key: 'id',
    },
  },
}

export function fxCategoryFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ICategoryInstance>>sequelize.define(
    'Category',
    {
      ...vCategoryModelAttributes,
    },
    {
      tableName: 'categories',
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
