import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import { ModelRegistry } from '@db/index'

export interface IResponseAllSurveyUser {
  total?: number
  totalPage?: number
  data: ISurveyUserAttributes[]
  actualPage?: number
}

export interface ISurveyUserFilter {
  pag?: number
  limit?: number
  title?: string
  order?: string
  userId?: string
}
export interface ISurveyUserAttributes {
  id?: string
  userId?: string
  surveyId?: string
  date?: string
  name?: string
  lastname?: string
  phoneNumber?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ISurveyUserCreationAttributes {
  userId?: string
  surveyId?: string
  calendlyUri?: string
  date?: string
  name?: string
  lastname?: string
  phoneNumber?: string
  day?: string
  timeCall?: string
  surveyUrl?: string
}

export interface ISurveyUserUpdateAttributes {
  id?: string
  userId?: string
  surveyId?: string
  calendlyUri?: string
  date?: string
  name?: string
  lastname?: string
  phoneNumber?: string
  day?: string
  timeCall?: string
  surveyUrl?: string
}

export interface ISurveyUserInstance
  extends Model<ISurveyUserAttributes, ISurveyUserAttributes>,
    ISurveyUserAttributes {}

// Atributos del modelo de tareas
export const vSurveyUserModelAttributes: SequelizeAttributes<ISurveyUserAttributes> = {
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
  date: {
    type: DataTypes.STRING,
    field: 'date',
    allowNull: true,
    defaultValue: null,
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: true,
    defaultValue: null,
  },
  lastname: {
    type: DataTypes.STRING,
    field: 'lastname',
    allowNull: true,
    defaultValue: null,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number',
    allowNull: true,
    defaultValue: null,
  },
}

// Función para crear el modelo de tareas
export function fxSurveyUserFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ISurveyUserInstance>>sequelize.define(
    'SurveyUser',
    {
      ...vSurveyUserModelAttributes,
    },
    {
      tableName: 'survey_users',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelSurveyUser, modelSurvey, modelSurveyResponse, modelUser } = models

    modelSurveyUser.hasMany(modelSurvey, {
      foreignKey: 'id',
      sourceKey: 'surveyId',
      as: 'surveys',
    })

    modelSurveyUser.hasMany(modelSurveyResponse, {
      foreignKey: 'surveyUserId',
      as: 'responses',
    })
    modelSurveyUser.belongsTo(modelSurvey, {
      targetKey: 'id',
      foreignKey: 'surveyId',
      as: 'survey',
    })
    modelSurveyUser.belongsTo(modelUser, {
      targetKey: 'id',
      foreignKey: 'userId',
      as: 'user',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return vData
}
