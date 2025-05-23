import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Queries,
  Security,
  Delete,
  Put,
} from 'tsoa'
import {
  IBannerAttributes,
  IBannerCreationAttributes,
  IResponseAllBanner,
  IBannerFilter,
} from '@entities/banners/bannerModel'
import BannerService from '@entities/banners/bannerService'
import { fxI18n } from '@utils/i18n'
import { fxMoveImages } from '@utils/helpers'

@Route('banners')
@Tags('Banner')
export class BannersController extends Controller {
  private bannerService: typeof BannerService

  constructor() {
    super()
    this.bannerService = BannerService
  }

  @Get('/show/{bannerId}')
  public async get(
    @Path() bannerId: string
  ): Promise<{ data: IBannerAttributes | null; message?: string }> {
    try {
      const vResponse: IBannerAttributes | null = await this.bannerService.get(bannerId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      console.error('Error en el controlador:', error)
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IBannerFilter} pQueryParams - Filtros.
   * @returns {Promise<{ data: IBannerAttributes[] | IResponseAllBanner, message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IBannerFilter): Promise<{
    data: IBannerAttributes[] | IResponseAllBanner
    message?: string
  }> {
    try {
      const vResponse: IBannerAttributes[] | IResponseAllBanner =
        await this.bannerService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: IBannerCreationAttributes
  ): Promise<{ success: boolean; item: IBannerAttributes | null; message?: string }> {
    try {
      await this.bannerService.validate(requestBody)
      if (requestBody.images) {
        requestBody.images = await fxMoveImages(requestBody.images)
      }
      if (requestBody.mobileImage) {
        requestBody.mobileImage = await fxMoveImages(requestBody.mobileImage)
      }
      const vItem: IBannerAttributes | null = await this.bannerService.create(requestBody)
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{bannerId}')
  public async update(
    @Path() bannerId: string,
    @Body() requestBody: IBannerCreationAttributes
  ): Promise<{ success: boolean; item: IBannerAttributes | null; message?: string }> {
    try {
      await this.bannerService.validate(requestBody)
      if (requestBody?.images) {
        requestBody.images = await fxMoveImages(requestBody.images)
      }
      if (requestBody?.mobileImage) {
        requestBody.mobileImage = await fxMoveImages(requestBody.mobileImage)
      }
      const vItem: IBannerAttributes | null = await this.bannerService.update(requestBody, bannerId)
      if (vItem) {
        this.setStatus(200) // set return status 200
        return { success: true, item: vItem }
      }
      this.setStatus(404) // set return status 404
      return { success: false, item: vItem, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }

  /**
   * @summary Eliminar una item por ID.
   * @param {string} key - ID de la item a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ status: boolean, message?: string }>} - Promesa que resuelve con la eliminacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.bannerService.softDeleteRecord(key)
      if (vResponse) {
        this.setStatus(200)
        return { success: true }
      }
      this.setStatus(400)
      return { success: false, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }
}
