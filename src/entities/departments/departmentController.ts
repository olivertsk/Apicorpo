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
import { IDepartmentAttributes, IDepartmentCreationAttributes, IResponseAllDepartment, IDepartmentFilter } from '@entities/departments/departmentModel';
import DepartmentService from '@entities/departments/departmentService';
import { fxI18n } from '@utils/i18n';
 
@Route('departments')
@Tags('Department')
export class DepartmentsController extends Controller {
  private departmentService: typeof DepartmentService

  constructor() {
    super()
    this.departmentService = DepartmentService
  }

  @Security('bearerAuth', ["admin"])
  @Get('/show/{departmentId}')
  public async get(
    @Path() departmentId: string,
  ): Promise<{ data: IDepartmentAttributes | null, message?: string }> {
    try {
      const vResponse: IDepartmentAttributes | null = await this.departmentService.get(departmentId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {number} page - Número de página.
   * @param {number} count - Cantidad de datos por página.
   * @returns {Promise<{ data: { departments: IDepartment[], message?: string }, status: boolean }>}
   */
  @Security('bearerAuth', ["admin"])
  @Get('/all')
  public async all(@Queries() pQueryParams: IDepartmentFilter): Promise<{
    data: IDepartmentAttributes[] | IResponseAllDepartment
    message?: string
  }> {
    try {
      const vResponse: IDepartmentAttributes[] | IResponseAllDepartment = await this.departmentService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500);
      return { data: [], message: 'Ocurrió un error' };
    }
  }
  
  @Security('bearerAuth', ["admin"])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: IDepartmentCreationAttributes
  ): Promise<{ success: boolean, item: IDepartmentAttributes | null, message?: string }> {
    try {
      await this.departmentService.validate(requestBody)
      const vItem: IDepartmentAttributes | null = await this.departmentService.create(requestBody);
      this.setStatus(201); // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ["admin"])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{departmentId}')
  public async update(
    @Path() departmentId: string,
    @Body() requestBody: IDepartmentCreationAttributes
  ): Promise<{ success: boolean, item: IDepartmentAttributes | null, message?: string }> {
    try {
      await this.departmentService.validate(requestBody)
      const vItem: IDepartmentAttributes | null = await this.departmentService.update(requestBody, departmentId)
      if (vItem) {
        this.setStatus(200); // set return status 200
        return { success: true, item: vItem }
      }
      this.setStatus(404); // set return status 404
      return { success: false, item: vItem, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }

  /**
   * @summary Eliminar una item por ID.
   * @param {string} key - ID de la item a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ status: boolean }>}
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ["admin"])
  public async softDeleteRecord(
    @Path() key: string,
  ): Promise<{ success: boolean, message?: string }> {
    try {
      this.setStatus(200); // set return success 201
      const vResponse = await this.departmentService.softDeleteRecord(key);
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