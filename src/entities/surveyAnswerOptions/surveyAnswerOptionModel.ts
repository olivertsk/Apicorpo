import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
// import { ModelRegistry } from '@db/index'

export interface IResponseAllSurveyAnswerOption {
  total?: number
  totalPage?: number
  data: ISurveyAnswerOptionAttributes[]
  actualPage?: number
}

export interface ISurveyAnswerOptionFilter {
  pag?: number
  limit?: number
  title?: string
  order?: string
}

export enum ESurveyAnswerOptionType {
  SELECTION = 'selection',
  TEXT = 'text',
}

export interface ISurveyAnswerOptionAttributes {
  id?: string
  questionId?: string
  text?: string
  order?: string | number
  type?: ESurveyAnswerOptionType | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type ISurveyAnswerOptionCreationAttributes = Pick<
  ISurveyAnswerOptionAttributes,
  'text' | 'questionId'
> & {
  id?: string
  order?: string | number
  type?: ESurveyAnswerOptionType | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
export interface ISurveyAnswerOptionInstance
  extends Model<ISurveyAnswerOptionAttributes, ISurveyAnswerOptionCreationAttributes>,
    ISurveyAnswerOptionAttributes {}

// Atributos del modelo de tareas
export const vSurveyAnswerOptionModelAttributes: SequelizeAttributes<ISurveyAnswerOptionAttributes> =
  {
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
    questionId: {
      type: DataTypes.UUID,
      field: 'question_id',
      allowNull: false,
      references: {
        model: 'survey_questions',
        key: 'id',
      },
    },
    text: {
      type: DataTypes.STRING,
      field: 'text',
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      field: 'type',
      allowNull: true,
      defaultValue: 'selection',
    },
    order: {
      type: DataTypes.INTEGER,
      field: 'order',
      allowNull: true,
      defaultValue: 0,
    },
  }

// Función para crear el modelo de tareas
export function fxSurveyAnswerOptionFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ISurveyAnswerOptionInstance>>sequelize.define(
    'SurveyAnswerOption',
    {
      ...vSurveyAnswerOptionModelAttributes,
    },
    {
      tableName: 'survey_answer_options',
      defaultScope: {
        order: [['order', 'ASC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  // vData.associate = function (models: ModelRegistry) {
  //   const { modelSurveyAnswerOption, modelSurveyQuestion } = models
  //   modelSurveyQuestion.belongsTo(modelSurveyAnswerOption, {
  //     foreignKey: 'questionId',
  //     as: 'question',
  //   })
  // }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return vData
}
