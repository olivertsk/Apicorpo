import * as admin from 'firebase-admin'
import path from 'path'

interface NotificationData {
  title: string
  body: string
  data?: string
}

class NotificationService {
  private messaging: admin.messaging.Messaging

  constructor() {
    const vRutaJSON = path.resolve(
      __dirname,
      '../../duque-portafolio-firebase-adminsdk-v1arh-a9fb6dfa05.json'
    )
    console.log('vRutaJSON :>> ', vRutaJSON);
    admin.initializeApp({
      credential: admin.credential.cert(vRutaJSON),
    })

    this.messaging = admin.messaging()
  }

  public async sendNotification(tokens: string[], data: NotificationData): Promise<void> {
    console.log('sendNotification', tokens, data)
    try {
      for (const token of tokens) {
        try {
          if (token) {
            const notification = {
              token: token,
              notification: {
                title: data.title,
                body: data.body,
              },
              data: {
                // data: data?.data || '',
                click_action: 'FCM_PLUGIN_ACTIVITY',
              },
              android: {
                notification: {
                  sound: 'default', // O especifica el nombre de un archivo de sonido personalizado
                },
              },
            }
            await this.messaging.send(notification)
          }
          console.log(`El token ${token} funciona`)
        } catch (error: any) {
          console.error(`El token ${token} no está registrado:`, error)
        }
      }
    } catch (error) {
      console.error('Error al enviar la notificación:', error)
    }
  }
}

export default new NotificationService()
