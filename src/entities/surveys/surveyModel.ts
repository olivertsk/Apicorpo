import { type Sequelize, type Model, DataTypes } from 'sequelize';
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes';
import { v4 as uuidv4 } from 'uuid';
import { ModelRegistry } from '@db/index';

export interface IResponseAllSurvey {
  total?: number
  totalPage?: number
  data: ISurveyAttributes[]
  actualPage?: number
}

export interface ISurveyFilter {
  pag?: number
  limit?: number
  title?: string
  order?: string
}

export enum ESurveyType {
  FIRSTPURCHASE = 'firstPurchase',
  REGISTER = 'register',
}

export interface ISurveyAttributes {
  id?: string
  title: string
  description: string
  type?: ESurveyType | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type ISurveyCreationAttributes = Pick<ISurveyAttributes, 'title' | 'description'> & {
  id?: string
  type?: ESurveyType | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
export interface ISurveyInstance extends Model<ISurveyAttributes, ISurveyCreationAttributes>, ISurveyAttributes {}

// Atributos del modelo de tareas
export const vSurveyModelAttributes: SequelizeAttributes<ISurveyAttributes> = {
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
  title: {
    type: DataTypes.STRING,
    field: 'title',
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    field: 'description',
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    field: 'type',
    allowNull: true,
  },
}

// Función para crear el modelo de tareas
export function fxSurveyFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ISurveyInstance>>sequelize.define(
    'Survey',
    {
      ...vSurveyModelAttributes,
    },
    {
      tableName: 'surveys',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );

  vData.associate = function (models: ModelRegistry) {
    const { 
      modelSurvey,
      modelSurveyQuestion,
      // modelSurveyQuestionSurvey,
      modelSurveyResponse,
      // modelSurveyUser
    } =
      models

    // modelSurvey.belongsToMany(modelSurveyQuestion, {
    //   through: modelSurveyQuestionSurvey,
    //   foreignKey: 'surveyId', // Foreign key in the join table that points to the modelSurvey table
    //   otherKey: 'questionId', // Foreign key in the join table that points to the modelSurveyQuestion table
    //   as: 'questions',
    // })

    // modelSurveyQuestion.belongsToMany(modelSurvey, {
    //   through: modelSurveyQuestionSurvey,
    //   foreignKey: 'questionId', // Foreign key in the join table that points to the modelSurveyQuestion table
    //   otherKey: 'surveyId', // Foreign key in the join table that points to the modelSurvey table
    //   as: 'surveys',
    // })

    modelSurvey.hasMany(modelSurveyQuestion, {
      foreignKey: 'surveyId',
      as: 'questions',
    })
    modelSurvey.hasMany(modelSurveyResponse, { foreignKey: 'surveyId' })
    // modelSurvey.hasMany(modelSurveyUser, {
    //   foreignKey: 'surveyId',
    //   as: 'surveyUsers',
    // })
  }

  vData.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return vData;
}
