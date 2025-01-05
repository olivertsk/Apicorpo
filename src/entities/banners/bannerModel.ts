import { type Sequelize, type Model, DataTypes } from 'sequelize'
import type { SequelizeAttributes, ModelStatic } from '@type/SequelizeTypes'
import { v4 as uuidv4 } from 'uuid'

export interface IBannerAttributes {
  id?: string
  images?: string | null
  name: string
  description?: string | null
  alt?: string | null
  status?: boolean
  position: EPositionBanner
  mobileImage?: string | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export enum EPositionBanner {
  HomePrincipal = 'homePrincipal',
  HomeSecondary = 'homeSecondary',
  HomeTertiary = 'homeTertiary',
  TikTok = 'TikTok',
  Instagram = 'Instagram'
}
export interface IResponseAllBanner {
  total?: number
  totalPage?: number
  data: IBannerAttributes[]
  actualPage?: number
}

export interface IBannerFilter {
  pag?: number
  limit?: number
  name?: string | null
  position?: EPositionBanner
  isClient?: boolean
}
export type IBannerCreationAttributes = Pick<IBannerAttributes, 'id'> &
  Partial<Pick<IBannerAttributes, 'name' | 'images'>> & {
    status: boolean | true
    description?: string | null
    alt?: string | null
    position?: EPositionBanner | EPositionBanner.HomePrincipal
    mobileImage?: string | null
  }
export interface IBannerInstance
  extends Model<IBannerAttributes, IBannerCreationAttributes>,
    IBannerAttributes {}

export const vBannerModelAttributes: SequelizeAttributes<IBannerAttributes> = {
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
  images: {
    type: DataTypes.STRING,
    field: 'images',
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    field: 'description',
    allowNull: true,
    defaultValue: null,
  },
  alt: {
    type: DataTypes.STRING,
    field: 'alt',
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.BOOLEAN,
    field: 'status',
    defaultValue: true,
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING,
    field: 'position',
    defaultValue: true,
    allowNull: true,
  },
  mobileImage: {
    type: DataTypes.STRING,
    field: 'mobile_image',
    defaultValue: null,
    allowNull: true,
  },
}

export function fxBannerFactory(sequelize: Sequelize) {
  const vData = <ModelStatic<IBannerInstance>>sequelize.define(
    'Banner',
    {
      ...vBannerModelAttributes,
    },
    {
      tableName: 'banners',
      defaultScope: {
        order: [['createdAt', 'DESC']],
      },
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  )

  vData.prototype.toJSON = function () {
    const values = { ...this.get() }
    return values
  }
  return vData
}
