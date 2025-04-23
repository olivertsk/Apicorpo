import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';
import { v4 as uuidv4 } from 'uuid';

export interface IResponseAllSurveyQuestionSurvey {
  total?: number
  totalPage?: number
  data: ISurveyQuestionSurveyAttributes[]
  actualPage?: number
}

export interface ISurveyQuestionSurveyFilter {
  pag?: number
  limit?: number
  title?: string
  order?: string
}

export interface ISurveyQuestionSurveyAttributes {
  id?: string
  surveyId?: string
  questionId?: string
  createdAt?: Date
  updatedAt?: Date
}

export type ISurveyQuestionSurveyCreationAttributes = Pick<
  ISurveyQuestionSurveyAttributes,
  'questionId' | 'surveyId'
> & {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface ISurveyQuestionSurveyInstance extends Model<ISurveyQuestionSurveyAttributes, ISurveyQuestionSurveyCreationAttributes>, ISurveyQuestionSurveyAttributes {}

// Atributos del modelo de tareas
export const vSurveyQuestionSurveyModelAttributes: SequelizeAttributes<ISurveyQuestionSurveyAttributes> = {
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
}

// Función para crear el modelo de tareas
export function fxSurveyQuestionSurveyFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ISurveyQuestionSurveyInstance>>sequelize.define(
    'SurveyQuestionSurvey',
    {
      ...vSurveyQuestionSurveyModelAttributes,
    },
    {
      tableName: 'survey_question_surveys',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
    }
  )

  // vData.associate = function (models: ModelRegistry) {
  //   const { modelSurveyQuestionSurvey } = models
  //   modelSurveyQuestion.hasMany(modelSurveyAnswerOption, {
  //     foreignKey: 'questionId',
  //     as: 'answers',
  //   })
  //   modelSurveyQuestion.hasMany(modelSurveyQuestionSurvey, {
  //     foreignKey: 'questionId',
  //     as: 'surveyQuestionIds',
  //   })
  // }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return vData;
}
