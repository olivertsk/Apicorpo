import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import { type IChatAnswerCreationAttributes } from './ChatAnswerModel'
import type { ModelRegistry } from '@db/index'

export interface IChatQuestionAttributes {
  id?: string
  name: string
  chatQuestionId?: string | null
  chatAnswerId?: string | null
  type?: string
  status?: boolean
  autoResponse?: string
  options?: IChatAnswerCreationAttributes[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface IResponseAllChatQuestion {
  total?: number
  totalPage?: number
  data: IChatQuestionAttributes[]
  actualPage?: number
}

export interface IChatQuestionFilter {
  pag?: number
  limit?: number
  name?: string | null
  isClient?: boolean
}

export interface IChatShowClientFilter {
  chatQuestionId?: string | null
  chatAnswerId?: string | null
  type?: string
}

export type IChatQuestionCreationAttributes = Partial<Pick<IChatQuestionAttributes, 'name'>> & {
  id?: string | null
  status?: boolean | true
  chatQuestionId?: string | null
  chatAnswerId?: string | null
  type?: string
  autoResponse?: string | null
  options?: IChatAnswerCreationAttributes[]
}
export interface IChatQuestionInstance
  extends Model<IChatQuestionAttributes, IChatQuestionCreationAttributes>,
    IChatQuestionAttributes {}

export const vChatQuestionModelAttributes: SequelizeAttributes<IChatQuestionAttributes> = {
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
  chatAnswerId: {
    field: 'chat_answer_id',
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    field: 'type',
    defaultValue: null,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    allowNull: true,
    defaultValue: true,
  },
  autoResponse: {
    type: DataTypes.STRING,
    field: 'auto_response',
    defaultValue: null,
    allowNull: true,
  },
}

export function fxChatQuestionFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IChatQuestionInstance>>sequelize.define(
    'ChatQuestion',
    {
      ...vChatQuestionModelAttributes,
    },
    {
      tableName: 'chat_questions',
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
    const { modelChatQuestion, modelChatAnswer } = models
    modelChatQuestion.hasMany(modelChatAnswer, {
      foreignKey: 'chatQuestionId',
      sourceKey: 'id',
      as: 'options',
    })
    modelChatQuestion.belongsTo(modelChatAnswer, {
      foreignKey: 'chatQuestionId',
      as: 'parentQuestion',
    })
    modelChatQuestion.belongsTo(modelChatQuestion, {
      foreignKey: 'chatAnswerId',
      as: 'parentAnswer',
    })
  }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
