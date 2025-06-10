import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
// import { ModelRegistry } from '@db/index'

export interface IResponseAllSuggestion {
  total?: number
  totalPage?: number
  data: ISuggestionAttributes[]
  actualPage?: number
}

export interface ISuggestionFilter {
  pag?: number
  limit?: number
  title?: string
  order?: string
}

export enum ESuggestionType {
  SELECTION = 'selection',
  TEXT = 'text',
}

export enum ESuggestionStatus {
  'PENDIENTE',
  'EN_REVISION',
  'RESUELTO',
  'RECHAZADO',
}

export enum ESuggestionPriority {
  'BAJA',
  'MEDIA',
  'ALTA',
  'URGENTE',
}
export interface ISuggestionAttributes {
  id?: string
  type?: string | null
  title: string
  description: string
  status?: ESuggestionStatus | null
  priority?: ESuggestionPriority | null
  userId?: ESuggestionStatus | null
  assignedTo?: ESuggestionStatus | null
  response?: ESuggestionStatus | null
  responseDate?: ESuggestionStatus | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type ISuggestionCreationAttributes = Pick<ISuggestionAttributes, 'title' | 'description'> & {
  id?: string
  type?: string | null
  status?: ESuggestionStatus | null
  priority?: ESuggestionPriority | null
  userId?: ESuggestionStatus | null
  assignedTo?: ESuggestionStatus | null
  response?: ESuggestionStatus | null
  responseDate?: ESuggestionStatus | null
}
export interface ISuggestionInstance
  extends Model<ISuggestionAttributes, ISuggestionCreationAttributes>,
    ISuggestionAttributes {}

// Atributos del modelo de tareas
export const vSuggestionModelAttributes: SequelizeAttributes<ISuggestionAttributes> = {
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
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(), //'PENDIENTE', 'EN_REVISION', 'RESUELTO', 'RECHAZADO'
    defaultValue: 'PENDIENTE',
  },
  priority: {
    type: DataTypes.STRING(), //'BAJA', 'MEDIA', 'ALTA', 'URGENTE'
    defaultValue: 'MEDIA',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  responseDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}

// Función para crear el modelo de tareas
export function fxSuggestionFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<ISuggestionInstance>>sequelize.define(
    'Suggestion',
    {
      ...vSuggestionModelAttributes,
    },
    {
      tableName: 'suggestions',
      defaultScope: {
        order: [['order', 'ASC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  // vData.associate = function (models: ModelRegistry) {
  //   const { modelSuggestion, modelSurveyQuestion } = models
  //   modelSurveyQuestion.belongsTo(modelSuggestion, {
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
