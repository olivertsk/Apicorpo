import {
  Controller,
  Get,
  Tags,
  Route,
  Path,
  Queries,
  Security,
  Request,
  SuccessResponse,
  Patch,
  Body,
} from 'tsoa'
import SendNotificationService from './SendNotificationService'
import type {
  INotificationAttributes,
  INotificationFilter,
  IResponseAllNotification,
} from './notificationModel'
import NotificationService from './NotificationService'
import type { IUserAttributes } from '@users/userModel'
import { fxI18n } from '@utils/i18n'

@Route('notifications')
@Tags('Notification')
export class notificationController extends Controller {
  private notificationService: typeof NotificationService

  constructor() {
    super()
    this.notificationService = NotificationService
  }

  @Get('/test/{tokenPush}')
  public async test(@Path() tokenPush: string): Promise<{ success: boolean; message?: string }> {
    try {
      const notificationData = {
        title: 'Tienes una nueva order',
        body: 'Alguien realizo una compra',
      }
      await SendNotificationService.sendNotification([tokenPush], notificationData, [])
      this.setStatus(200)
      return { success: true }
    } catch (error) {
      console.error('Error en el controlador:', error)
      this.setStatus(500)
      return { success: false, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {INotificationFilter} pQueryParams - Número de página.
   * @returns {Promise<{ data: IResponseAllNotification | null, message?: string }>} - Promesa que resuelve con los datos
   */
  @Security('bearerAuth', ['optional'])
  @Get('/all')
  public async all(
    @Queries() pQueryParams: INotificationFilter,
    @Request() request: { auth: IUserAttributes }
  ): Promise<{
    data: IResponseAllNotification | null
    message?: string
  }> {
    try {
      if (!request?.auth?.id) {
        this.setStatus(500)
        return { data: null, message: 'Token invalido' }
      } else {
        pQueryParams.userId = request.auth.id
      }
      const vResponse: IResponseAllNotification = await this.notificationService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * Marcar una notificacion como vista.
   * @param { notificationId: string } requestBody - notificationId id de la notificaion.
   * @returns {Promise<{ success: boolean, item: INotificationAttributes | null, message?: string }>} - Promesa que resuelve confirmando la visualizacion
   */
  @Security('bearerAuth', ['optional'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Patch('/isView')
  public async isView(
    @Request() pRequest: { auth: IUserAttributes },
    @Body() requestBody: { notificationId: string }
  ): Promise<{ success: boolean; item: INotificationAttributes | null; message?: string }> {
    try {
      const userId = pRequest.auth.id
      if (!userId) {
        console.log('noi tiene token')
        this.setStatus(404) // set return status 404
        return { success: false, item: null, message: fxI18n.__('item_not_found') }
      }
      const vItem: INotificationAttributes | null = await this.notificationService.updateView(
        requestBody.notificationId,
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
}
