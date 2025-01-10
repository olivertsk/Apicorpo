import { Controller, Get, Tags, Route, Path } from 'tsoa'
import NotificationService from './SendNotificationService';
 
@Route('notifications')
@Tags('Notification')
export class NotificationController extends Controller {
  constructor() {
    super()
  }

  @Get('/test/{tokenPush}')
  public async test(@Path() tokenPush: string): Promise<{ success: boolean; message?: string }> {
    try {
      const notificationData = {
        title: 'Tienes una nueva order',
        body: 'Alguien realizo una compra',
      }
      await NotificationService.sendNotification([tokenPush], notificationData)
      this.setStatus(200)
      return { success: true }
    } catch (error) {
      console.error('Error en el controlador:', error)
      this.setStatus(500)
      return { success: false, message: 'Ocurrió un error' }
    }
  }
}