import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { IRolAttributes } from './rolModel'
import type { ModelRegistry } from '@db/index'

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
  gender?: string | null
  state?: string | null
  city?: string | null
  zone?: string | null
  uid?: string | null
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
  filters?: any
  sort?: any
  search?: string
}

// export type IUserCreationParams =
//   | (Pick<IUser, 'email' | 'avatar' | 'name' | 'password'> &
//       Partial<Pick<IUser, 'uid' | 'email' | 'name' | 'healthCenter' | 'licenseNumber'>>)
//   | (Pick<IUser, 'email' | 'uid'> &
//       Partial<Pick<IUser, 'avatar' | 'name' | 'password' | 'healthCenter' | 'licenseNumber'>>)
//   | {
//       name?: string
//       email?: string
//       password?: string
//       avatar?: string
//       healthCenter?: string
//       licenseNumber?: string
//       idToken: string
//     }

export type IUserCreationAttributes =
  | (Partial<Pick<IUserAttributes, 'uid'>> & {
      email?: string
      avatar?: string
      name?: string
      rolId?: string
      passwordConfirmation?: string | null
      password?: string | null
      recaptchaToken?: string
    })
  | (Pick<IUserAttributes, 'id' | 'email' | 'password'> &
      Partial<Pick<IUserAttributes, 'name'>> & {
        passwordConfirmation?: string | null
        avatar?: string | null
        location?: string | null
        rolId?: IRolAttributes['id'] | null
        receiveNotification?: boolean
        dob?: string | null
        gender?: string | null
        state?: string | null
        city?: string | null
        zone?: string | null
        idToken?: string | null
        recaptchaToken?: string | null
      })
  | {
      name?: string
      email?: string
      password?: string
      passwordConfirmation?: string
      avatar?: string
      healthCenter?: string
      licenseNumber?: string
      idToken: string
      rolId?: string
      recaptchaToken?: string
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
    gender?: string | null
    state?: string | null
    city?: string | null
    zone?: string | null
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
  gender?: string | null
  state?: string | null
  city?: string | null
  zone?: string | null
}

export interface IPasswordRecovery {
  passwordConfirmation: string
  password: string
  code: string
}
export interface IAuthGoogle {
  email?: string
  avatar?: string
  name?: string
  uid: string
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
  gender: {
    type: DataTypes.STRING,
    field: 'gender',
    defaultValue: true,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    field: 'state',
    defaultValue: true,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    field: 'city',
    defaultValue: true,
    allowNull: true,
  },
  zone: {
    type: DataTypes.STRING,
    field: 'zone',
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
