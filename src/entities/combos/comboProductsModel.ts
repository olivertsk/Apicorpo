import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'
import type { ModelRegistry } from '@db/index'

export interface IComboProductAttributes {
  id?: string
  comboId: string
  productId: string
  quantity: number
  productDetail?: any
  createdAt?: Date
  updatedAt?: Date
}

export interface IResponseAllComboProduct {
  total?: number
  totalPage?: number
  data: IComboProductAttributes[]
  actualPage?: number
}

export interface IComboProductFilter {
  pag?: number
  limit?: number
  name?: string | null
}
export type IComboProductCreationAttributes = Pick<IComboProductAttributes, 'id'> & {
  id?: string
  comboId?: string | null
  productId: string
  quantity: number
  productDetail?: any
  createdAt?: Date
  updatedAt?: Date
}
export interface IComboProductInstance
  extends Model<IComboProductAttributes, IComboProductCreationAttributes>,
    IComboProductAttributes {}

export const vComboProductModelAttributes: SequelizeAttributes<IComboProductAttributes> = {
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
  comboId: {
    type: DataTypes.UUID,
    field: 'combo_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
    defaultValue: null,
    allowNull: true,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
}

export function fxComboProductFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IComboProductInstance>>sequelize.define(
    'ComboProduct',
    {
      ...vComboProductModelAttributes,
    },
    {
      tableName: 'combo_products',
      freezeTableName: true,
      timestamps: true,
      // paranoid: true,
    }
  )
  vData.associate = function (models: ModelRegistry) {
    const { modelComboProduct, modelProduct, modelCombo } = models
    modelProduct.belongsToMany(modelCombo, {
      through: modelComboProduct,
      foreignKey: 'productId',
      otherKey: 'comboId',
      as: 'combos',
    })
  }
  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
