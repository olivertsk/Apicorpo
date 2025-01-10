import * as admin from 'firebase-admin'
import path from 'path'
import NotificationService from './notificationService'

interface NotificationData {
  title: string
  body: string
  data?: {
    url?: string | null
  }
}

class SendNotificationService {
  private messaging: admin.messaging.Messaging
  private notificationService: typeof NotificationService

  constructor() {
    const vRutaJSON = path.resolve(
      __dirname,
      '../../duque-portafolio-firebase-adminsdk-v1arh-a9fb6dfa05.json'
    )
    admin.initializeApp({
      credential: admin.credential.cert(vRutaJSON),
    })

    this.messaging = admin.messaging()
    this.notificationService = NotificationService
  }

  public async sendNotification(tokens: string[], data: NotificationData, usersId: string[]): Promise<void> {
    try {
      for (const key in tokens) {
        if (Object.prototype.hasOwnProperty.call(tokens, key)) {
          const token = tokens[key];
          const userId = usersId[key];
          try {
            if (token) {
              const notification = {
                token: token,
                notification: {
                  title: data.title,
                  body: data.body,
                },
                data: {
                  url: data.data?.url || '',
                  click_action: 'FCM_PLUGIN_ACTIVITY',
                },
                android: {
                  notification: {
                    sound: 'default', // O especifica el nombre de un archivo de sonido personalizado
                  },
                },
              }
              await this.messaging.send(notification)
              if (userId) {
                await this.notificationService.create(
                  {
                    title: data.title,
                    body: data.body,
                    data: JSON.stringify(data.data),
                    isView: false,
                    url: data?.data?.url || '',
                    userId
                  }
                )
              }
            }
            console.log(`El token ${token} funciona`)
          } catch (error: any) {
            console.error(`El token ${token} no está registrado:`, error)
          }
        }
      }
    } catch (error) {
      console.error('Error al enviar la notificación:', error)
    }
  }
}

export default new SendNotificationService()
