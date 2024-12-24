
import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';
import { v4 as uuidv4 } from 'uuid';
import { IOrderProductCreationAttributes } from './orderProductModel';

export interface IOrderAttributes {
  id: string
  userId: string
  dni: string
  nameClient: string
  phoneNumber: string
  observation: string
  date: string
  amount: number
  amountWithoutTax: number
  valueTax: number
  location?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllOrder {
  total?: number;
  totalPage?: number;
  data: IOrderAttributes[];
  actualPage?: number;
}

export interface IOrderFilter {
  pag?: number;
  limit?: number;
  
}

export type IOrderCreationAttributes = Pick<IOrderAttributes, 'id'> &
  Partial<
    Pick<
      IOrderAttributes,
      | 'userId'
      | 'dni'
      | 'observation'
      | 'date'
      | 'amount'
      | 'amountWithoutTax'
      | 'valueTax'
      | 'location'
    >
  > & {
    products?: IOrderProductCreationAttributes[]
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
    defaultValue: null
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
  );

  vData.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };
  return vData;
}
