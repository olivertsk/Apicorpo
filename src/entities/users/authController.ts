import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Patch,
  Put,
  Delete,
  // Queries
} from 'tsoa'
import { IUserAttributes, IUserCreationAttributes, IUserUpdatenAttributes } from '@users/userModel'
import UsersService from '@users/userService'
import AppConfig from '@config/AppConfig'
import * as argon2 from 'argon2'
import jwt, { type Secret } from 'jsonwebtoken'
import { fxI18n } from '@utils/i18n'
import { fxSendMail } from '@utils/sendMail'
import randomstring from 'randomstring'

interface IPasswordVerified {
  field: string
  message: string
}
@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  private userService: typeof UsersService

  constructor() {
    super()
    this.userService = UsersService
  }
  /**
   * Registra un nuevo usuario.
   * @param pRequestBody - Parámetros de creación del usuario.
   * @returns Usuario creado y token de autenticación.
   */
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/register')
  public async register(
    @Body() requestBody: IUserCreationAttributes
  ): Promise<{ success: boolean; user: IUserAttributes | null; token?: string; message?: any }> {
    try {
      if (!requestBody.password || requestBody.password !== requestBody.passwordConfirmation) {
        this.setStatus(401)
        return {
          success: false,
          user: null,
          message: [
            {
              field: fxI18n.__('password'),
              message: fxI18n.__('incorrect_password'),
            },
          ],
        }
      }
      const validatePassword = this.validatePassword(requestBody.password)
      if (validatePassword) {
        this.setStatus(401)
        return { success: false, user: null, message: validatePassword }
      }
      delete requestBody.passwordConfirmation
      await this.userService.validate(requestBody)
      const vHashedPassword = await argon2.hash(requestBody.password)
      requestBody.password = vHashedPassword
      // if (requestBody?.avatar) {
      //   await this.FileController.moveFile(requestBody?.avatar)
      // }
      const vUser: IUserAttributes | null = await this.userService.create(requestBody)
      if (vUser) {
        const vUserJson = JSON.parse(JSON.stringify(vUser))
        delete vUserJson.deleted_at
        delete vUserJson.created_at
        delete vUserJson.updated_at
        delete vUserJson.password
        const vToken = jwt.sign(vUserJson, AppConfig.JWT_SECRET_KEY, {})
        this.setStatus(201)
        return { success: true, user: vUser, token: vToken }
      }
      return { success: true, user: null, message: 'Ocurrio un error' }
    } catch (error) {
      throw error
    }
  }

  /**
   * Inicia sesión con credenciales de usuario.
   * @param pRequestBody - Credenciales de inicio de sesión (email y contraseña).
   * @returns Usuario autenticado y token de autenticación o mensaje de error.
   */
  @Post('/login')
  public async login(
    @Body() pRequestBody: { email: string; password: string }
  ): Promise<
    { success: boolean; user: IUserAttributes; token: string } | { message: string; status: false }
  > {
    try {
      const vUser = await this.userService.login(pRequestBody.email)
      if (vUser) {
        const vPasswordIsValid = await argon2.verify(vUser?.password, pRequestBody.password)
        if (vPasswordIsValid) {
          // No devolver la contraseña, incluso si está hasheada
          const vUserResponse: IUserAttributes = vUser
          const vUserJSON = JSON.parse(JSON.stringify(vUser))
          const vToken = jwt.sign(vUserJSON, AppConfig.JWT_SECRET_KEY as Secret)
          this.setStatus(200) // HTTP 200 OK
          return { success: true, user: vUserResponse, token: vToken }
        }
      }
      this.setStatus(500) // HTTP 500
      return { success: false, message: 'Usuario incorrecto', status: false }
    } catch (error) {
      this.setStatus(401) // HTTP 401 Unauthorized
      return Promise.reject(error)
    }
  }

  /**
   * Obtiene los detalles del usuario autenticado.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns Detalles del usuario autenticado.
   */
  @Get('/me')
  @Security('bearerAuth')
  @SuccessResponse('201', 'User Found')
  public async me(
    @Request() pRequestBody: { auth: IUserAttributes }
  ): Promise<{ success: boolean; user: IUserAttributes | null }> {
    try {
      if (!pRequestBody?.auth?.id) {
        this.setStatus(401)
        return { success: false, user: null }
      }
      const vUser: IUserAttributes | null = await this.userService.get(pRequestBody.auth.id)
      if (vUser) {
        this.setStatus(200) // HTTP 200
        return { success: true, user: vUser }
      } else {
        this.setStatus(401)
        return { success: false, user: null }
      }
    } catch (error) {
      throw error
    }
  }
  /**
   * Obtiene los detalles del usuario autenticado.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns Detalles del usuario autenticado.
   */
  @Security('bearerAuth', ['optional'])
  @Patch('/password')
  @SuccessResponse('201', 'User Found')
  public async passwordUpdate(
    @Request() pRequest: { auth: IUserAttributes },
    @Body() pRequestBody: { passwordConfirmation: string; password: string; oldPasword: string }
  ): Promise<{ success: boolean; user: IUserAttributes | null; token?: string; message?: any }> {
    try {
      if (!pRequest?.auth?.id) {
        this.setStatus(401)
        return { success: false, user: null }
      }
      if (!pRequestBody.password || pRequestBody.password !== pRequestBody.passwordConfirmation) {
        this.setStatus(401)
        return {
          success: false,
          user: null,
          message: [
            {
              field: fxI18n.__('password'),
              message: fxI18n.__('incorrect_password'),
            },
          ],
        }
      }
      const vUser: IUserAttributes | null = await this.userService.getUserWithPassword(
        pRequest.auth.id
      )
      const validatePassword = this.validatePassword(pRequestBody.password)
      if (validatePassword) {
        this.setStatus(401)
        return { success: false, user: null, message: validatePassword }
      }
      if (vUser) {
        const vPasswordIsValid = await argon2.verify(vUser?.password, pRequestBody.oldPasword)
        if (vPasswordIsValid) {
          // No devolver la contraseña, incluso si está hasheada
          const vHashedPassword = await argon2.hash(pRequestBody.password)
          const vItem: IUserAttributes | null = await this.userService.updatePassword(
            { password: vHashedPassword },
            pRequest?.auth?.id
          )
          if (vItem) {
            this.setStatus(200) // HTTP 200 OK
            return { success: true, user: null }
          }
        }
      }
      this.setStatus(401)
      return { success: false, user: null, message: fxI18n.__('invalid_password') }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['optional'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{userId}')
  public async update(
    @Request() pRequest: { auth: IUserAttributes },
    @Body() requestBody: IUserUpdatenAttributes
  ): Promise<{ success: boolean; item: IUserAttributes | null; message?: string }> {
    try {
      const userId = pRequest.auth.id
      if (!userId) {
        this.setStatus(404) // set return status 404
        return { success: false, item: null, message: fxI18n.__('item_not_found') }
      }
      await this.userService.validate(requestBody, userId)
      if ('password' in requestBody) {
        delete requestBody.password
      }
      const vItem: IUserAttributes | null = await this.userService.update(requestBody, userId)
      console.log('vItem :>> ', JSON.stringify(vItem))
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
   * Actualizar el token push.
   * @param requestBody - tokenPush en formato texto a actualizar.
   * @returns boolean.
   */
  @Security('bearerAuth', ['optional'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Patch('/updateTokenPush')
  public async updateTokenPush(
    @Request() pRequest: { auth: IUserAttributes },
    @Body() requestBody: { tokenPush: string }
  ): Promise<{ success: boolean; item: IUserAttributes | null; message?: string }> {
    try {
      const userId = pRequest.auth.id
      if (!userId) {
        this.setStatus(404) // set return status 404
        return { success: false, item: null, message: fxI18n.__('item_not_found') }
      }
      const vItem: IUserAttributes | null = await this.userService.updateTokenPush(
        requestBody.tokenPush,
        userId
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
   * Obtiene los detalles del usuario autenticado.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns Detalles del usuario autenticado.
   */
  @Post('/passwordReset')
  @SuccessResponse('201', 'User Found')
  public async passwordReset(
    @Body() pRequestBody: { email: string }
  ): Promise<{ success: boolean; message?: any }> {
    try {
      const vUser: IUserAttributes | null = await this.userService.login(pRequestBody.email)
      if (vUser) {
        const code = randomstring.generate(40)
        await this.userService.createPasswordReset({
          code,
          email: vUser.email,
        })
        const emailData = {
          userName: vUser.name,
          email: vUser.email,
          code,
        }
        fxSendMail(emailData, 'password_recovery', 'Recuperar contraseña')
        this.setStatus(200)
        return { success: true, message: fxI18n.__('email_send') }
      }
      this.setStatus(401)
      return { success: false, message: fxI18n.__('invalid_user') }
    } catch (error) {
      throw error
    }
  }

  /**
   * Cambiar la contraseña, por codigo (al recuperar) o por contraseña anterior.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns Detalles del usuario autenticado.
   */
  @Post('/passwordRecovery')
  @SuccessResponse('201', 'User Found')
  public async passwordRecovery(
    @Body()
    pRequestBody: {
      passwordConfirmation: string
      password: string
      code: string
    }
  ): Promise<{ success: boolean; user: IUserAttributes | null; token?: string; message?: any }> {
    try {
      if (!pRequestBody.password || pRequestBody.password !== pRequestBody.passwordConfirmation) {
        this.setStatus(401)
        return {
          success: false,
          user: null,
          message: [
            {
              field: fxI18n.__('password'),
              message: fxI18n.__('incorrect_password'),
            },
          ],
        }
      }
      const validatePassword = this.validatePassword(pRequestBody.password)
      if (validatePassword) {
        this.setStatus(401)
        return { success: false, user: null, message: validatePassword }
      }
      const vPasswordReset = await this.userService.getPasswordReset(pRequestBody.code)
      if (!vPasswordReset) {
        this.setStatus(404)
        return { success: false, user: null }
      }
      let vUser: IUserAttributes | null = await this.userService.login(vPasswordReset)
      if (vUser?.id) {
        // No devolver la contraseña, incluso si está hasheada
        const vHashedPassword = await argon2.hash(pRequestBody.password)
        const vItem: IUserAttributes | null = await this.userService.updatePassword(
          { password: vHashedPassword },
          vUser.id
        )
        if (vItem) {
          console.log('deberia responder 200')
          this.setStatus(200) // HTTP 200 OK
          return { success: true, user: null }
        }
      }
      console.log('no consiguio usuario')
      this.setStatus(401)
      return { success: false, user: null, message: fxI18n.__('invalid_password') }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  /**
   * @summary Eliminar mi usuario.
   * @param {string} key - ID de usuario a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ success: boolean, message?: string }>}
   */
  @Delete('/deleted')
  @Security('bearerAuth')
  @SuccessResponse('201', 'User Found')
  public async softDeleteRecord(
    @Request() pRequestBody: { auth: IUserAttributes }
  ): Promise<{ success: boolean; message?: string }> {
    try {
      if (!pRequestBody?.auth?.id) {
        this.setStatus(401)
        return { success: false }
      }
       const vResponse = await this.userService.softDeleteRecord(pRequestBody?.auth?.id)
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

  private validatePassword(password: string): IPasswordVerified[] | false {
    const errors: IPasswordVerified[] = []
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push({
        // field: fxI18n.__('password'),
        field: 'password',
        message: fxI18n.__('lowercase letter is required'.replace(/ /g, '_')),
      })
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push({
        // field: fxI18n.__('password'),
        field: 'password',
        message: fxI18n.__('capital letter required'.replace(/ /g, '_')),
      })
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push({
        // field: fxI18n.__('password'),
        field: 'password',
        message: fxI18n.__('a number is required'.replace(/ /g, '_')),
      })
    }
    if (!/(?=.*[@$!%*?&./#^()])/.test(password)) {
      errors.push({
        // field: fxI18n.__('password'),
        field: 'password',
        message: fxI18n.__('a special symbol is required'.replace(/ /g, '_')),
      })
    }
    if (password.length < 3) {
      errors.push({
        // field: fxI18n.__('password'),
        field: 'password',
        message: fxI18n.__('at least 3 characters is required'.replace(/ /g, '_')),
      })
    }
    if (errors.length) {
      return errors
    }
    return false
  }
}
