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
  IMapAttributes,
  IMapCreationAttributes,
  IResponseAllMap,
  IMapFilter,
} from '@entities/maps/mapModel'
import MapService from '@entities/maps/mapService'
import { fxI18n } from '@utils/i18n'
import { fxMoveImages } from '@utils/helpers'

@Route('maps')
@Tags('Map')
export class MapsController extends Controller {
  private mapService: typeof MapService

  constructor() {
    super()
    this.mapService = MapService
  }

  @Get('/show/{mapId}')
  public async get(
    @Path() mapId: string
  ): Promise<{ data: IMapAttributes | null; message?: string }> {
    try {
      const vResponse: IMapAttributes | null = await this.mapService.get(mapId)
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
   * @param {IMapFilter} pQueryParams - Datos de filtrado.
   * @returns {Promise<{ data: IMapAttributes[] | IResponseAllMap, message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IMapFilter): Promise<{
    data: IMapAttributes[] | IResponseAllMap
    message?: string
  }> {
    try {
      const vResponse: IMapAttributes[] | IResponseAllMap = await this.mapService.all(pQueryParams)
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
    @Body() requestBody: IMapCreationAttributes
  ): Promise<{ success: boolean; item: IMapAttributes | null; message?: string }> {
    try {
      await this.mapService.validate(requestBody)
      if (requestBody.image) {
        requestBody.image = await fxMoveImages(requestBody.image)
      }
      const vItem: IMapAttributes | null = await this.mapService.create(requestBody)
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{mapId}')
  public async update(
    @Path() mapId: string,
    @Body() requestBody: IMapCreationAttributes
  ): Promise<{ success: boolean; item: IMapAttributes | null; message?: string }> {
    try {
      await this.mapService.validate(requestBody)
      if (requestBody.image) {
        requestBody.image = await fxMoveImages(requestBody.image)
      }
      const vItem: IMapAttributes | null = await this.mapService.update(requestBody, mapId)
      if (vItem) {
        this.setStatus(200) // set return status 200
        return { success: true, item: vItem }
      }
      this.setStatus(404) // set return status 404
      return { success: false, item: vItem, message: fxI18n.__('item_not_found') }
    } catch (error) {
      console.log('error :>> ', error)
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
      const vResponse = await this.mapService.softDeleteRecord(key)
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
