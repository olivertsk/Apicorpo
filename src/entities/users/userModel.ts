import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { IRolAttributes } from './rolModel'
import { ModelRegistry } from '@db/index'

export interface IUserAttributes {
  id?: string
  name: string
  lastName?: string | null
  email: string
  avatar?: string | null
  dni?: string | number | null
  dniType?: string | null
  phoneNumber?: string | null
  dob?: string | null
  password: string
  rolId: IRolAttributes['id'] | null
  status?: boolean
  location?: string | null
  tokenPush?: string | null
  receiveNotification?: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllUser {
  total?: number
  totalPage?: number
  data: IUserAttributes[]
  actualPage?: number
}

export interface IUserFilter {
  pag?: number
  limit?: number
  email?: string | null
  role?: string | null
  name?: string | null
}
export type IUserCreationAttributes = Pick<IUserAttributes, 'id' | 'email' | 'password'> &
  Partial<Pick<IUserAttributes, 'name'>> & {
    passwordConfirmation?: string | null
    avatar?: string | null
    location?: string | null
    rolId?: IRolAttributes['id'] | null
    receiveNotification?: boolean
  }

export type IUserUpdatenAttributes = Pick<IUserAttributes, 'id' | 'rolId'> &
  Omit<IUserAttributes, 'password'> & {
    avatar?: string | null
    location?: string | null
    lastName?: string | null
    dni?: string | number | null
    dniType?: string | null
    phoneNumber?: string | null
    receiveNotification?: boolean
    dob?: string | null
  }

export type IAuthUserUpdatenAttributes = {
  id?: string
  avatar?: string | null
  location?: string | null
  lastName?: string | null
  dni?: string | number | null
  dniType?: string | null
  phoneNumber?: string | null
  receiveNotification?: boolean
  dob?: string | null
  name: string
  tokenPush?: string | null
}

export interface IUserInstance
  extends Model<IUserAttributes, IUserCreationAttributes>,
    IUserAttributes {}

export const vUserModelAttributes: SequelizeAttributes<IUserAttributes> = {
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
  name: {
    type: DataTypes.STRING,
    field: 'name',
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
    allowNull: true,
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
    defaultValue: null,
    unique: true,
    validate: {
      // isEmail: true,
      customValidator(value: string) {
        if (!/^[\w\\.g]+@+[\w]+[.]+[\D]{2,10}$/.test(value)) {
          throw new Error('invalid_email')
        }
      },
    },
  },
  avatar: {
    type: DataTypes.STRING,
    field: 'avatar',
  },
  dni: {
    type: DataTypes.INTEGER,
    field: 'dni',
    defaultValue: null,
    allowNull: true,
  },
  dniType: {
    type: DataTypes.STRING,
    field: 'dni_type',
    defaultValue: null,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number',
    defaultValue: null,
    allowNull: true,
  },
  dob: {
    type: DataTypes.STRING,
    field: 'date_of_birthdate',
    defaultValue: null,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    field: 'password',
    defaultValue: null,
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    defaultValue: true,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    field: 'location',
    defaultValue: true,
    allowNull: true,
  },
  rolId: {
    type: DataTypes.UUID,
    field: 'rol_id',
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'roles',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  tokenPush: {
    type: DataTypes.STRING,
    field: 'token_push',
    defaultValue: true,
    allowNull: true,
  },
  receiveNotification: {
    type: DataTypes.BOOLEAN,
    field: 'receive_notification',
    defaultValue: true,
    allowNull: true,
  },
}

export function fxUserFactory(sequelize: Sequelize) {
  const vUser = <ModelStatic<IUserInstance>>sequelize.define(
    'User',
    {
      ...vUserModelAttributes,
    },
    {
      tableName: 'users',
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
        order: [['createdAt', 'DESC']],
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ['password'],
          },
        },
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vUser.associate = function (models: ModelRegistry) {
    const { modelUser, modelRol } = models
    modelUser.belongsTo(modelRol, {
      foreignKey: 'rolId',
      as: 'rol',
    })
  }

  vUser.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vUser
}
