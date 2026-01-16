import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import { type IUserAttributes } from '@users/userModel'
import type { ModelRegistry } from '@db/index'
import { type IConversationMessageCreationAttributes } from './conversationMessageModel'

export enum EConversationStatus {
  ACTIVE = 1,
  COMPLETED = 2,
  ARCHIVED = 3,
  PENDING_REVIEW = 4,
}

export interface IConversationAttributes {
  id?: string
  userId?: IUserAttributes['id'] | null
  context?: Record<string, any> | null
  status: EConversationStatus
  responsibleId?: string | null
  viewTime?: string | null
  messages?: IConversationMessageCreationAttributes[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

// interface GeoIP {
//   lookup(ip: string): GeoIP.Lookup | null
// }

export interface IResponseAllConversation {
  total?: number
  totalPage?: number
  data: IConversationAttributes[]
  actualPage?: number
}

export interface IConversationFilter {
  pag?: number
  limit?: number
  userId?: IUserAttributes['id'] | null
  filters?: any
  sort?: any
  search?: string
}

export type IConversationCreationAttributes = Pick<IConversationAttributes, 'id' | 'context'> & {
  userId?: IUserAttributes['id'] | null
  context?: Record<string, any> | null
  responsibleId?: string | null
  viewTime?: string | null
  status: EConversationStatus
  messages?: IConversationMessageCreationAttributes[]
}

export interface IConversationFullCreation {
  conversation: Omit<IConversationCreationAttributes, 'messages'>
  messages: IConversationMessageCreationAttributes[]
}

export interface IConversationInstance
  extends Model<IConversationAttributes, IConversationCreationAttributes>,
    IConversationAttributes {}

export const vConversationModelAttributes: SequelizeAttributes<IConversationAttributes> = {
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
  userId: {
    type: DataTypes.UUID,
    field: 'userId',
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: EConversationStatus.ACTIVE,
    validate: {
      isIn: [[1, 2, 3, 4]], // Valores permitidos
    },
  },
  context: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null,
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
}

export function fxConversationFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IConversationInstance>>sequelize.define(
    'Conversation',
    {
      ...vConversationModelAttributes,
    },
    {
      tableName: 'conversations',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.associate = function (models: ModelRegistry) {
    const { modelConversation, modelConversationMessage, modelUser } = models
    modelConversation.hasMany(modelConversationMessage, {
      foreignKey: 'conversationId',
      as: 'messages',
    })
    modelConversation.belongsTo(modelUser, {
      foreignKey: 'userId',
      as: 'user',
    })
    modelConversation.belongsTo(modelUser, {
      foreignKey: 'responsibleId',
      as: 'responsible',
    })
  }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
