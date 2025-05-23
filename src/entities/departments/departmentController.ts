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
  Request,
} from 'tsoa'
import {
  IDepartmentAttributes,
  IDepartmentCreationAttributes,
  IResponseAllDepartment,
  IDepartmentFilter,
} from '@entities/departments/departmentModel'
import DepartmentService from '@entities/departments/departmentService'
import { fxI18n } from '@utils/i18n'
import { IUserAttributes } from '@users/userModel'
import { fxMoveImages } from '@utils/helpers'

@Route('departments')
@Tags('Department')
export class DepartmentsController extends Controller {
  private departmentService: typeof DepartmentService

  constructor() {
    super()
    this.departmentService = DepartmentService
  }

  @Get('/show/{departmentId}')
  public async get(
    @Path() departmentId: string
  ): Promise<{ data: IDepartmentAttributes | null; message?: string }> {
    try {
      const vResponse: IDepartmentAttributes | null = await this.departmentService.get(departmentId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IDepartmentFilter} pQueryParams - Datos de filtrado.
   * @returns {Promise<{ data: IDepartmentAttributes[] | IResponseAllDepartment, message?: string }>} - Promesa que resuelve con los datos
   */
  @Security('bearerAuth', ['optional'])
  @Get('/all')
  public async all(
    @Queries() pQueryParams: IDepartmentFilter,
    @Request() requestBody: { auth: IUserAttributes }
  ): Promise<{
    data: IDepartmentAttributes[] | IResponseAllDepartment
    message?: string
  }> {
    try {
      const auth = requestBody?.auth
      pQueryParams.userId = auth?.id || null
      // TODO Verificar si es admin para filtrar los status false
      const vResponse: IDepartmentAttributes[] | IResponseAllDepartment =
        await this.departmentService.all(pQueryParams)
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
    @Body() requestBody: IDepartmentCreationAttributes
  ): Promise<{ success: boolean; item: IDepartmentAttributes | null; message?: string }> {
    try {
      await this.departmentService.validate(requestBody)
      if (requestBody.icon) {
        requestBody.icon = await fxMoveImages(requestBody.icon)
      }
      const vItem: IDepartmentAttributes | null = await this.departmentService.create(requestBody)
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{departmentId}')
  public async update(
    @Path() departmentId: string,
    @Body() requestBody: IDepartmentCreationAttributes
  ): Promise<{ success: boolean; item: IDepartmentAttributes | null; message?: string }> {
    try {
      await this.departmentService.validate(requestBody)
      if (requestBody.icon) {
        requestBody.icon = await fxMoveImages(requestBody.icon)
      }
      const vItem: IDepartmentAttributes | null = await this.departmentService.update(
        requestBody,
        departmentId
      )
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
      const vResponse = await this.departmentService.softDeleteRecord(key)
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
