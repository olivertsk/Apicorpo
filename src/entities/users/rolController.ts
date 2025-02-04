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
  Put,
  Delete,
} from 'tsoa'
import {
  IRolAttributes,
  IRolCreationAttributes,
  IResponseAllRol,
  IRolFilter,
} from '@users/rolModel'
import RolsService from '@users/rolService'
import { fxI18n } from '@utils/i18n'

@Route('rols')
@Tags('Rol')
export class RolsController extends Controller {
  private rolService: typeof RolsService

  constructor() {
    super()
    this.rolService = RolsService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{rolId}')
  public async get(
    @Path() rolId: string
  ): Promise<{ data: IRolAttributes | null; message?: string }> {
    try {
      const vResponse: IRolAttributes | null = await this.rolService.get(rolId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IRolFilter} pQueryParams - Filtros y parámetros de paginación.
   * @returns {Promise<{ data: rols: IRol[], message?: string }>}
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: IRolFilter): Promise<{
    data: IRolAttributes[] | IResponseAllRol
    message?: string
  }> {
    try {
      const vResponse: IRolAttributes[] | IResponseAllRol = await this.rolService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: fxI18n.__('error') }
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(@Body() requestBody: IRolCreationAttributes): Promise<IRolAttributes | null> {
    try {
      this.setStatus(201) // set return status 201
      await this.rolService.validate(requestBody)
      const item = await this.rolService.create(requestBody)
      return item
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{rolId}')
  public async update(
    @Path() rolId: string,
    @Body() requestBody: IRolCreationAttributes
  ): Promise<{ success: boolean; item: IRolAttributes | null; message?: string }> {
    try {
      await this.rolService.validate(requestBody)
      const vItem: IRolAttributes | null = await this.rolService.update(requestBody, rolId)
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
   * @summary Eliminar un usuario por ID.
   * @param {string} key - ID de usuario a eliminar.
   * @returns {Promise<{ success: boolean, message?: string }>} - Resultado de la operacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.rolService.softDeleteRecord(key)
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
