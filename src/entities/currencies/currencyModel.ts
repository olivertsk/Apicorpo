import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface ICurrencyAttributes {
  id?: string
  name: string
  code: string // USD, EUR, etc.
  symbol?: string
  exchangeRate: number
  autoUpdate: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ICurrencyFilter {
  pag?: number
  limit?: number
  name?: string | null
  filters?: any
  sort?: any
  search?: string
}

export type ICurrencyCreationAttributes = Pick<
  ICurrencyAttributes,
  'name' | 'code' | 'exchangeRate' | 'autoUpdate' | 'symbol'
>

export interface ICurrencyInstance
  extends Model<ICurrencyAttributes, ICurrencyCreationAttributes>,
    ICurrencyAttributes {}

export const vCurrencyModelAttributes: SequelizeAttributes<ICurrencyAttributes> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  exchangeRate: {
    type: DataTypes.DECIMAL(18, 4),
    allowNull: false,
    get() {
      return parseFloat(this.getDataValue('exchangeRate') as any)
    },
  },
  autoUpdate: {
    type: DataTypes.BOOLEAN,
    field: 'auto_update',
    defaultValue: true,
  },
}

export function fxCurrencyFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ICurrencyInstance>>sequelize.define(
    'Currency',
    {
      ...vCurrencyModelAttributes,
    },
    {
      tableName: 'currencies',
      timestamps: true,
      paranoid: true,
    }
  )

  return vData
}
