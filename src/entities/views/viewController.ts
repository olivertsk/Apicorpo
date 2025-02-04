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
  Put
} from 'tsoa';
import { IViewAttributes, IViewCreationAttributes, IResponseAllView, IViewFilter } from '@entities/views/viewModel';
import ViewService from '@entities/views/viewService';
import { fxI18n } from '@utils/i18n';
 
@Route('views')
@Tags('View')
export class ViewsController extends Controller {
  private viewService: typeof ViewService

  constructor() {
    super()
    this.viewService = ViewService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{viewId}')
  public async get(
    @Path() viewId: string
  ): Promise<{ data: IViewAttributes | null; message?: string }> {
    try {
      const vResponse: IViewAttributes | null = await this.viewService.get(viewId)
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
   * @param {number} page - Número de página.
   * @param {number} count - Cantidad de datos por página.
   * @returns {Promise<{ data: views: IViewAttributes[] | IResponseAllView, message?: string }>}
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: IViewFilter): Promise<{
    data: IViewAttributes[] | IResponseAllView
    message?: string
  }> {
    try {
      const vResponse: IViewAttributes[] | IResponseAllView =
        await this.viewService.all(pQueryParams)
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
    @Body() requestBody: IViewCreationAttributes
  ): Promise<{ success: boolean; item: IViewAttributes | null; message?: string }> {
    try {
      console.log('requestBody :>> ', requestBody)
      await this.viewService.validate(requestBody)
      console.log('paso validacion')
      const vItem: IViewAttributes | null = await this.viewService.create(requestBody)
      console.log('deberia crear')
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{viewId}')
  public async update(
    @Path() viewId: string,
    @Body() requestBody: IViewCreationAttributes
  ): Promise<{ success: boolean; item: IViewAttributes | null; message?: string }> {
    try {
      await this.viewService.validate(requestBody)
      const vItem: IViewAttributes | null = await this.viewService.update(requestBody, viewId)
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
   * @summary Eliminar una historia por ID.
   * @param {string} key - ID de la historia a eliminar.
   * @returns {Promise<{ success: boolean; message?: string }>} - Resultado de la operación.
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.viewService.softDeleteRecord(key)
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