import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'

export interface IResponseAllSurveyResponse {
  total?: number
  totalPage?: number
  data: ISurveyResponseAttributes[]
  actualPage?: number
}

export interface ISurveyResponseFilter {
  pag?: number
  limit?: number
  title?: string
  order?: string
  userId?: string
  filters?: any
  sort?: any
  search?: string
}
export interface ISurveyResponseAttributes {
  id?: string
  userId?: string
  surveyId: string
  questionId: string
  answerOptionId?: string | null
  text?: string | null
  surveyUserId?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface ISurveyResponseCreation {
  userId?: string
  surveyId: string
  questionId: string
  answerOptionId?: string | null
  text?: string | null
  surveyUserId?: string | null
}

export type ISurveyResponseCreationAttributes = {
  name?: string
  email?: string
  phone?: string
  phoneCode?: string
  calendlyUri?: string
  date?: string
  surveyUrl?: string
  surveyId?: string
  surveyUserId?: string | null
  responses: ISurveyResponseAttributes[]
}
export interface ISurveyResponseInstance
  extends Model<ISurveyResponseAttributes, ISurveyResponseAttributes>,
    ISurveyResponseAttributes {}

// Atributos del modelo de tareas
export const vSurveyResponseModelAttributes: SequelizeAttributes<ISurveyResponseAttributes> = {
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
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  surveyId: {
    type: DataTypes.UUID,
    field: 'survey_id',
    allowNull: false,
    references: {
      model: 'surveys',
      key: 'id',
    },
  },
  questionId: {
    type: DataTypes.UUID,
    field: 'question_id',
    allowNull: false,
    references: {
      model: 'survey_questions',
      key: 'id',
    },
  },
  answerOptionId: {
    type: DataTypes.UUID,
    field: 'answer_option_id',
    allowNull: true,
    references: {
      model: 'survey_answer_options',
      key: 'id',
    },
  },
  surveyUserId: {
    type: DataTypes.UUID,
    field: 'survey_user_id',
    allowNull: true,
    references: {
      model: 'survey_users',
      key: 'id',
    },
  },
  text: {
    type: DataTypes.TEXT,
    field: 'text',
    allowNull: true,
  },
}

// Función para crear el modelo de tareas
export function fxSurveyResponseFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ISurveyResponseInstance>>sequelize.define(
    'SurveyResponse',
    {
      ...vSurveyResponseModelAttributes,
    },
    {
      tableName: 'survey_responses',
      freezeTableName: true,
      timestamps: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const {
      modelSurveyResponse,
      modelSurveyQuestion,
      modelSurvey,
      modelUser,
      modelSurveyAnswerOption,
    } = models

    modelSurveyResponse.belongsTo(modelSurveyQuestion, {
      targetKey: 'id',
      foreignKey: 'questionId',
      as: 'question',
    })
    modelSurveyResponse.belongsTo(modelSurvey, {
      targetKey: 'id',
      foreignKey: 'surveyId',
      as: 'survey',
    })
    modelSurveyResponse.belongsTo(modelUser, {
      targetKey: 'id',
      foreignKey: 'userId',
      as: 'user',
    })
    modelSurveyResponse.belongsTo(modelSurveyAnswerOption, {
      targetKey: 'id',
      foreignKey: 'answerOptionId',
      as: 'answerOption',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return vData
}
