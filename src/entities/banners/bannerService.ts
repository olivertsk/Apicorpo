import { modelBanner } from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import {
  type IBannerAttributes,
  type IBannerCreationAttributes,
  type IResponseAllBanner,
  type IBannerInstance,
  EPositionBanner,
  type IBannerFilter,
} from '@entities/banners/bannerModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '../../utils/query'

class BannersService {
  async validate(data: any) {
    const dataValidate = modelBanner.build(data)
    await dataValidate.validate()
  }

  public async getPosition(id?: string): Promise<IBannerAttributes | null> {
    console.log('id :>> ', id)
    try {
      let whereStatement: FindOptions = {}
      whereStatement.where = {
        [Op.or]: [
          { position: EPositionBanner.AlwaysPopup },
          { position: EPositionBanner.PopupOnce },
        ],
        status: true,
      }
      if (id) {
        whereStatement.where = {
          ...whereStatement.where,
          id: {
            [Op.not]: id,
          },
        }
      }
      whereStatement.logging = true
      const vResponse: IBannerAttributes | null = await modelBanner.findOne(whereStatement)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async get(id: string): Promise<IBannerAttributes | null> {
    try {
      const vResponse: IBannerAttributes | null = await modelBanner.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: IBannerFilter): Promise<IResponseAllBanner> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelBanner.name
      )
      if (pParam.position && Object.values(EPositionBanner).includes(pParam.position)) {
        whereStatement.where = {
          ...whereStatement.where,
          position: pParam.position,
        }
      }
      if (pParam.isClient) {
        whereStatement.where = {
          ...whereStatement.where,
          status: true,
        }
      }
      const vResponse: IBannerAttributes[] = await modelBanner.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllBanner = await fxReponseServices(
          pParam,
          whereStatement,
          modelBanner.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(viewCreationParams: IBannerCreationAttributes): Promise<IBannerAttributes> {
    try {
      const vResponse: IBannerAttributes = await modelBanner.create(viewCreationParams)
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    itemCreationParams: IBannerCreationAttributes,
    id: string
  ): Promise<IBannerAttributes | null> {
    try {
      console.log('itemCreationParams :>> ', itemCreationParams)
      if (id) {
        const vResponse: IBannerInstance | null = await modelBanner.findOne({
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(itemCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelBanner.update(
        { deletedAt: new Date() },
        {
          where: { id: pId },
        }
      )
      if (!record) {
        return false
      }
      return true
    } catch (error) {
      throw error
    }
  }

  async deleteImagesName(name: string): Promise<void> {
    try {
      const vImagesName: IBannerInstance | null = await modelBanner.findOne({
        where: {
          images: name,
        },
      })
      if (vImagesName) {
        await vImagesName?.update({
          images: null,
        })
      } else {
        const vImagesNameMobile: IBannerInstance | null = await modelBanner.findOne({
          where: {
            mobileImage: name,
          },
        })
        if (vImagesNameMobile) {
          await vImagesNameMobile?.update({
            mobileImage: null,
          })
        }
      }
    } catch (error) {
      throw error
    }
  }
}
export default new BannersService()
