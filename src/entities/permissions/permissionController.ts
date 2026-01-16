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
import type {
  IPermissionAttributes,
  IPermissionCreationAttributes,
  IResponseAllPermission,
  IPermissionFilter,
} from '@entities/permissions/permissionModel'
import PermissionService from '@entities/permissions/permissionService'
import { fxI18n } from '@utils/i18n'

@Route('permissions')
@Tags('Permission')
export class PermissionsController extends Controller {
  private permissionService: typeof PermissionService

  constructor() {
    super()
    this.permissionService = PermissionService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{permissionId}')
  public async get(
    @Path() permissionId: string
  ): Promise<{ data: IPermissionAttributes | null; message?: string }> {
    try {
      const vResponse: IPermissionAttributes | null = await this.permissionService.get(permissionId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      console.error('Error en el controlador:', error)
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: IPermissionFilter): Promise<{
    data: IPermissionAttributes[] | IResponseAllPermission
    message?: string
  }> {
    try {
      const vResponse: IPermissionAttributes[] | IResponseAllPermission =
        await this.permissionService.all(pQueryParams)
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
    @Body() requestBody: IPermissionCreationAttributes
  ): Promise<{ success: boolean; item: IPermissionAttributes | null; message?: string }> {
    try {
      await this.permissionService.validate(requestBody)
      console.log('paso validacion')
      const vItem: IPermissionAttributes | null = await this.permissionService.create(requestBody)
      console.log('deberia crear')
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{permissionId}')
  public async update(
    @Path() permissionId: string,
    @Body() requestBody: IPermissionCreationAttributes
  ): Promise<{ success: boolean; item: IPermissionAttributes | null; message?: string }> {
    try {
      await this.permissionService.validate(requestBody)
      const vItem: IPermissionAttributes | null = await this.permissionService.update(
        requestBody,
        permissionId
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

  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.permissionService.softDeleteRecord(key)
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
