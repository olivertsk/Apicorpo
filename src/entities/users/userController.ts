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
  Request,
} from 'tsoa'
import * as argon2 from 'argon2'
import type {
  IUserAttributes,
  IUserCreationAttributes,
  IResponseAllUser,
  IUserFilter,
  IUserUpdatenAttributes,
} from '@users/userModel'
import UsersService from '@users/userService'
import { fxI18n } from '@utils/i18n'

@Route('users')
@Tags('User')
export class UsersController extends Controller {
  private userService: typeof UsersService

  constructor() {
    super()
    this.userService = UsersService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{userId}')
  public async get(
    @Path() userId: string
  ): Promise<{ data: IUserAttributes | null; message?: string }> {
    try {
      const vResponse: IUserAttributes | null = await this.userService.get(userId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IUserFilter} pQueryParams - Filtros y parámetros de paginación.
   * @returns {Promise<{ data: IUserAttributes[] | IResponseAllUser, message?: string }>} - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: IUserFilter): Promise<{
    data: IUserAttributes[] | IResponseAllUser
    message?: string
  }> {
    try {
      console.log('pQueryParams :>> ', pQueryParams)
      const vResponse: IUserAttributes[] | IResponseAllUser =
        await this.userService.all(pQueryParams)
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
  public async create(
    @Body() requestBody: IUserCreationAttributes
  ): Promise<IUserAttributes | null> {
    try {
      this.setStatus(201) // set return status 201
      await this.userService.validate(requestBody)
      if (requestBody.password) {
        const vHashedPassword = await argon2.hash(requestBody.password)
        requestBody.password = vHashedPassword
      }
      const item = await this.userService.create(requestBody)
      return item
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{userId}')
  public async update(
    @Path() userId: string,
    @Body() requestBody: IUserUpdatenAttributes
  ): Promise<{ success: boolean; item: IUserAttributes | null; message?: string }> {
    try {
      await this.userService.validate(requestBody, userId)
      if ('password' in requestBody) {
        delete requestBody.password
      }
      const vItem: IUserAttributes | null = await this.userService.update(requestBody, userId)
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

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/updateRol/{userId}')
  public async updateRol(
    @Path() userId: string,
    @Body() requestBody: { rolId: string }
  ): Promise<{ success: boolean; message?: string }> {
    try {
      await this.userService.validate(requestBody, userId)
      if ('password' in requestBody) {
        delete requestBody.password
      }
      const vItem: boolean = await this.userService.updateRol(requestBody.rolId, userId)
      if (vItem) {
        this.setStatus(200) // set return status 200
        return { success: true }
      }
      this.setStatus(404) // set return status 404
      return { success: false, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }

  /**
   * @summary Actualizar el token push de un usuario.
   * @param { tokenPush: string } pRequestBody - TokenPush es un string.
   * @returns {Promise<{ success: boolean, item: IUserAttributes | null, message?: string }>} - Promesa que resuelve con el estado de éxito, el elemento actualizado y un mensaje opcional.
   */
  @Security('bearerAuth', ['optional'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/updateTokenPush')
  public async updateTokenPush(
    @Request() pQueryParams: { auth: IUserAttributes },
    @Body() requestBody: { tokenPush: string }
  ): Promise<{ success: boolean; item: IUserAttributes | null; message?: string }> {
    try {
      const userId = pQueryParams?.auth?.id
      if (userId) {
        const tokenPush = requestBody.tokenPush
        const vItem: IUserAttributes | null = await this.userService.updateToken(tokenPush, userId)
        if (vItem) {
          this.setStatus(200) // set return status 200
          return { success: true, item: vItem }
        }
      }
      this.setStatus(404) // set return status 404
      return { success: false, item: null, message: fxI18n.__('item_not_found') }
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
      const vResponse = await this.userService.softDeleteRecord(key)
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
