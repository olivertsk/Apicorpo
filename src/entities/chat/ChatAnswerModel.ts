import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import { type IChatQuestionCreationAttributes } from './chatQuestionModel'
import type { ModelRegistry } from '@db/index'

export interface IChatAnswerAttributes {
  id?: string
  image?: string
  name: string
  chatQuestionId?: string
  answerType?: string | null
  status?: boolean
  autoResponse?: string
  chatQuestion?: IChatQuestionCreationAttributes
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllChatAnswer {
  total?: number
  totalPage?: number
  data: IChatAnswerAttributes[]
  actualPage?: number
}

export interface IChatAnswerFilter {
  pag?: number
  limit?: number
  name?: string | null
  isClient?: boolean
}
export type IChatAnswerCreationAttributes = Partial<Pick<IChatAnswerAttributes, 'name'>> & {
  id?: string
  status?: boolean | true
  chatQuestionId?: string
  chatAnswerId?: string
  autoResponse?: string
  answerType?: string | null
  chatQuestion?: IChatQuestionCreationAttributes
  deletedAt?: null
}
export interface IChatAnswerInstance
  extends Model<IChatAnswerAttributes, IChatAnswerCreationAttributes>,
    IChatAnswerAttributes {}

export const vChatAnswerModelAttributes: SequelizeAttributes<IChatAnswerAttributes> = {
  id: {
    type: DataTypes.UUID,
    field: 'id',
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
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: false,
  },
  chatQuestionId: {
    field: 'chat_question_id',
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'chat_questions',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    allowNull: true,
    defaultValue: true,
  },
  answerType: {
    type: DataTypes.STRING,
    field: 'type',
    defaultValue: null,
    allowNull: true,
  },
  autoResponse: {
    type: DataTypes.STRING,
    field: 'auto_response',
    defaultValue: null,
    allowNull: true,
  },
}

export function fxChatAnswerFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IChatAnswerInstance>>sequelize.define(
    'ChatAnswer',
    {
      ...vChatAnswerModelAttributes,
    },
    {
      tableName: 'chat_answers',
      defaultScope: {
        attributes: {
          exclude: ['deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelChatAnswer, modelChatQuestion } = models
    modelChatAnswer.belongsTo(modelChatQuestion, {
      foreignKey: 'chatQuestionId',
      as: 'question',
    })
    // modelChatAnswer.hasOne(modelChatQuestion, {
    //   foreignKey: 'chatAnswerId',
    //   as: 'childQuestion',
    // })
    modelChatAnswer.hasOne(modelChatQuestion, {
      foreignKey: 'chatAnswerId',
      as: 'chatQuestion',
    })
  }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
