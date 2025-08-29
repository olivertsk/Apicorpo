import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { IOrderProductCreationAttributes } from './orderProductModel'
import type { ModelRegistry } from '@db/index'
import type {
  ETypePaymentMethods,
  IPaymentMethodInstance,
} from '@entities/paymentMethods/paymentMethodModel'

export enum EWasSent {
  noSent = 0,
  sentOrder = 1,
  sentProductOrder = 2,
}

export interface IGetUserParams {
  orderId: string
  isClient: boolean
  userId: string | undefined
  adminId?: string
}
export interface IOrderAttributes {
  id?: string
  userId: string
  dni: string | number
  dniType: string
  nameClient: string
  phoneNumber: string
  observation: string | null
  date: string
  amount: number
  amountWithoutTax: number
  valueTax: number
  location?: string
  status?: EStatusOrder | null
  adminId?: string | null
  updatedStatus: string
  reason?: string | null
  wasSent?: EWasSent
  reference?: string | null
  typePayment?: ETypePaymentMethods | null
  paymentMethodId?: IPaymentMethodInstance['id'] | null
  code?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  responsibleId?: string
  viewTime?: string
  paymentVoucher?: string
}
export enum EStatusOrder {
  Pending = 'pending',
  Process = 'process',
  Approve = 'approve',
  Decline = 'decline',
}
export interface IResponseAllOrder {
  total?: number
  totalPage?: number
  data: IOrderAttributes[]
  actualPage?: number
  status?: EStatusOrder | null
}

export interface IOrderFilter {
  pag?: number
  limit?: number
  isClient?: boolean
  rolType?: string
  userId?: string
}

export type IOrderCreationAttributes = Pick<IOrderAttributes, 'id'> &
  Partial<
    Pick<
      IOrderAttributes,
      | 'userId'
      | 'dniType'
      | 'dni'
      | 'date'
      | 'amount'
      | 'amountWithoutTax'
      | 'valueTax'
      | 'location'
      | 'nameClient'
      | 'phoneNumber'
    >
  > & {
    products?: IOrderProductCreationAttributes[]
    observation?: string | null
    status?: EStatusOrder | null
    reference?: string | null
    typePayment?: ETypePaymentMethods | null
    paymentMethodId?: IPaymentMethodInstance['id'] | null
    responsibleId?: string
    viewTime?: string
    paymentVoucher?: string
  }

export interface IOrderInstance
  extends Model<IOrderAttributes, IOrderCreationAttributes>,
    IOrderAttributes {}

export const vOrdersModelAttributes: SequelizeAttributes<IOrderAttributes> = {
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
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  dni: {
    type: DataTypes.STRING,
    field: 'dni',
  },
  dniType: {
    type: DataTypes.STRING,
    field: 'dni_type',
  },
  nameClient: {
    type: DataTypes.STRING,
    field: 'name_client',
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number',
    defaultValue: null,
    allowNull: true,
  },
  observation: {
    type: DataTypes.STRING,
    field: 'observation',
    defaultValue: null,
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING,
    field: 'date',
    defaultValue: null,
    allowNull: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    field: 'amount',
  },
  amountWithoutTax: {
    type: DataTypes.FLOAT,
    field: 'amount_without_tax',
  },
  valueTax: {
    type: DataTypes.FLOAT,
    field: 'value_tax',
  },
  location: {
    type: DataTypes.STRING,
    field: 'location',
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.STRING,
    field: 'status',
    allowNull: true,
    defaultValue: null,
  },
  adminId: {
    type: DataTypes.STRING,
    field: 'admin_id',
    allowNull: true,
    defaultValue: null,
  },
  updatedStatus: {
    field: 'updated_status',
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  reason: {
    field: 'reason',
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  wasSent: {
    field: 'was_sent',
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  reference: {
    type: DataTypes.STRING,
    field: 'reference',
    defaultValue: true,
    allowNull: true,
  },
  typePayment: {
    type: DataTypes.STRING,
    field: 'type_payment',
    defaultValue: true,
    allowNull: true,
  },
  paymentMethodId: {
    type: DataTypes.UUID,
    field: 'payment_method_id',
    defaultValue: true,
    allowNull: true,
  },
  code: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  responsibleId: {
    type: DataTypes.STRING,
    field: 'responsible_id',
    defaultValue: true,
    allowNull: true,
  },
  viewTime: {
    type: DataTypes.STRING,
    field: 'view_time',
    defaultValue: true,
    allowNull: true,
  },
  paymentVoucher: {
    type: DataTypes.STRING,
    field: 'payment_voucher',
    defaultValue: true,
    allowNull: true,
  },
}

export function fxOrdersFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IOrderInstance>>sequelize.define(
    'Orders',
    {
      ...vOrdersModelAttributes,
    },
    {
      tableName: 'orders',
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.associate = function (models: ModelRegistry) {
    const { modelOrder, modelOrderProducto, modelUser, modelPaymentMethod } = models
    modelOrder.hasMany(modelOrderProducto, {
      foreignKey: 'orderId',
      as: 'products',
    })
    modelOrder.belongsTo(modelUser, {
      foreignKey: 'adminId',
      as: 'admin',
    })
    modelOrder.belongsTo(modelUser, {
      foreignKey: 'responsibleId',
      as: 'responsible',
    })
    modelOrder.belongsTo(modelUser, {
      foreignKey: 'userId',
      as: 'user',
    })
    modelOrder.belongsTo(modelUser, {
      foreignKey: 'userId',
      as: 'dataUser',
    })
    modelOrder.belongsTo(modelPaymentMethod, {
      foreignKey: 'paymentMethodId',
      as: 'method',
    })
  }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
