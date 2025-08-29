import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'

export enum ESurveyQuestionType {
  SELECTION = 'selection',
  TEXT = 'text',
}

export interface IResponseAllSurveyQuestion {
  total?: number
  totalPage?: number
  data: ISurveyQuestionAttributes[]
  actualPage?: number
}

export interface ISurveyQuestionFilter {
  pag?: number
  limit?: number
  text?: string
  order?: string
  type?: ESurveyQuestionType
}

export interface ISurveyQuestionAttributes {
  id?: string
  text?: string
  type?: ESurveyQuestionType
  order?: number | 0
  surveyId?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type ISurveyQuestionCreationAttributes = Pick<ISurveyQuestionAttributes, 'text'> & {
  id?: string
  type?: string
  surveyId?: string
  order?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type ISurveyQuestionUpdateAttributes = Pick<ISurveyQuestionAttributes, 'text'> & {
  id: string
  type?: ESurveyQuestionType
  surveyId?: string
  order?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
export interface ISurveyQuestionInstance
  extends Model<ISurveyQuestionAttributes, ISurveyQuestionCreationAttributes>,
    ISurveyQuestionAttributes {}

// Atributos del modelo de tareas
export const vSurveyQuestionModelAttributes: SequelizeAttributes<ISurveyQuestionAttributes> = {
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
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT,
    field: 'text',
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    field: 'order',
    allowNull: true,
    defaultValue: 0,
  },
  type: {
    // type: DataTypes.ENUM('selection', 'text'),
    type: DataTypes.STRING,
    field: 'type',
    allowNull: false,
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
}

// Función para crear el modelo de tareas
export function fxSurveyQuestionFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ISurveyQuestionInstance>>sequelize.define(
    'SurveyQuestion',
    {
      ...vSurveyQuestionModelAttributes,
    },
    {
      tableName: 'survey_questions',
      defaultScope: {
        order: [['order', 'ASC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.associate = function (models: ModelRegistry) {
    const { modelSurveyQuestion, modelSurveyAnswerOption } = models
    modelSurveyQuestion.hasMany(modelSurveyAnswerOption, {
      foreignKey: 'questionId',
      as: 'answers',
    })
  }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return vData
}
