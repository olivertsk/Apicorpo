import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import { type IUserAttributes } from '@users/userModel'
import type { ModelRegistry } from '@db/index'

export enum EMessageSender {
  BOT = 'bot',
  USER = 'user',
  ADMIN = 'admin',
  OPERATOR = 'operator',
}

export enum EMessageType {
  TEXT = 'text',
  OPTION = 'option',
  QUESTION = 'question',
  SYSTEM = 'system',
}

export interface IConversationMessageAttributes {
  id?: string
  conversationId?: IConversationMessageAttributes['id']
  from?: EMessageSender
  messageType?: EMessageType
  message: string
  index: number
  metadata?: Record<string, any> | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IResponseAllConversationMessage {
  total?: number
  totalPage?: number
  data: IConversationMessageAttributes[]
  actualPage?: number
}

export interface IConversationMessageFilter {
  pag?: number
  limit?: number
  userId?: IUserAttributes['id'] | null
}

export type IConversationMessageCreationAttributes = Pick<
  IConversationMessageAttributes,
  'id' | 'message'
> & {
  conversationId?: IConversationMessageAttributes['id']
  from: EMessageSender
  index: number
  messageType?: EMessageType
  metadata?: Record<string, any> | null
  chatQuestion?: any
  selectedOption?: any
}

export interface IConversationMessageInstance
  extends Model<IConversationMessageAttributes, IConversationMessageCreationAttributes>,
    IConversationMessageAttributes {}

export const vConversationMessageModelAttributes: SequelizeAttributes<IConversationMessageAttributes> =
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'conversation_id',
      references: {
        model: 'conversations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    from: {
      type: DataTypes.ENUM('bot', 'user', 'admin', 'operator'),
      field: 'sender_type',
      allowNull: false,
    },
    messageType: {
      type: DataTypes.TINYINT,
      field: 'message_type',
      allowNull: false,
      defaultValue: 'text',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      get() {
        const rawValue = this.getDataValue('metadata')
        const formatValue = rawValue ? JSON.parse(rawValue) : null
        return formatValue
      },
      set(value) {
        this.setDataValue('metadata', value ? JSON.stringify(value) : null)
      },
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  }

export function fxConversationMessageFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IConversationMessageInstance>>sequelize.define(
    'ConversationMessage',
    {
      ...vConversationMessageModelAttributes,
    },
    {
      tableName: 'conversation_messages',
      defaultScope: {
        order: [['createdAt', 'ASC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelConversationMessage, modelConversation } = models
    modelConversationMessage.belongsTo(modelConversation, {
      foreignKey: 'conversationId',
      as: 'conversation',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return vData
}
