import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IPaymentMethodAttributes {
  id?: string
  type: ETypePaymentMethods
  name: string
  dni?: string | null
  email?: string | null
  numberAccount?: string | null
  phoneNumber?: string | null
  accountType?: string | null
  status: boolean | true
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export enum ETypePaymentMethods {
  Cash = 'cash',
  Bank = 'bank',
  Zelle = 'zelle',
  PagoMovil = 'pago movil'
}

export interface IResponseAllPaymentMethod {
  total?: number
  totalPage?: number
  data: IPaymentMethodAttributes[]
  actualPage?: number
}

export interface IPaymentMethodFilter {
  pag?: number
  limit?: number
  name?: string | null
  type?: ETypePaymentMethods
  isClient?: boolean
}
export type IPaymentMethodCreationAttributes = Pick<IPaymentMethodAttributes, 'id'> &
  Partial<Pick<IPaymentMethodAttributes, 'name'>> & {
    dni?: string | null
    email?: string | null
    numberAccount?: string | null
    accountType?: string | null
    status: boolean | true
    type: ETypePaymentMethods | ETypePaymentMethods.Cash
    phoneNumber?: string | null
  }
export interface IPaymentMethodInstance
  extends Model<IPaymentMethodAttributes, IPaymentMethodCreationAttributes>,
    IPaymentMethodAttributes {}

export const vPaymentMethodModelAttributes: SequelizeAttributes<IPaymentMethodAttributes> = {
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
  type: {
    type: DataTypes.STRING,
    field: 'type',
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
  },
  dni: {
    type: DataTypes.STRING,
    field: 'dni',
    defaultValue: null,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
    defaultValue: null,
    allowNull: true,
  },
  numberAccount: {
    type: DataTypes.STRING,
    field: 'number_account',
    defaultValue: null,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number',
    defaultValue: null,
    allowNull: true,
  },
  accountType: {
    type: DataTypes.STRING,
    field: 'account_type',
    defaultValue: null,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    defaultValue: true,
    allowNull: true,
  },
}

export function fxPaymentMethodFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IPaymentMethodInstance>>sequelize.define(
    'PaymentMethod',
    {
      ...vPaymentMethodModelAttributes,
    },
    {
      tableName: 'payment_methods',
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
    return values
  }
  return vData
}
