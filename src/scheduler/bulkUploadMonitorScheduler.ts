import cron from 'node-cron'
import BulkUploadLogsService from '@entities/integration/BulkUploadLogService'
import SendNotificationService from '@entities/notification/SendNotificationService'
import userService from '@users/userService'
// import { modelUser } from '@db/index'

export const initBulkUploadMonitorScheduler = () => {
  // Ejecutar cada 30 minutos entre 7am y 7pm (7-19)
  // cron.schedule('*/5 * * * *', async () => {
  cron.schedule('*/30 7-19 * * *', async () => {
    console.log('[CronJob] Iniciando monitoreo de últimas cargas masivas...')

    try {
      // 1. Obtener el registro más reciente
      const latestLog = await BulkUploadLogsService.getLatestLog()

      if (!latestLog) {
        console.log('[CronJob] No hay registros de carga masiva aún.')
        return
      }
      if (!latestLog.createdAt) {
        console.log('[CronJob] El registro más reciente no tiene fecha de creación.')
        return
      }
      // 2. Calcular diferencia de horas
      const now = new Date()
      const lastUpdate = new Date(latestLog.createdAt as Date) // o updatedAt si prefieres
      const diffHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60)

      if (diffHours <= 1) {
        console.log(`[CronJob] Última carga hace ${diffHours.toFixed(2)} horas, dentro del margen.`)
        return
      }

      console.log(
        `[CronJob] Última carga fue hace ${diffHours.toFixed(2)} horas. Enviando notificación...`
      )

      // 3. Obtener administradores (asumiendo rol 'admin')
      const adminRole = await userService.showRolName('admin')

      if (!adminRole) {
        console.log('[CronJob] Rol de administrador no encontrado.')
        return
      }

      const users = adminRole.users || []
      const tokens = users.map((user: any) => user.tokenPush).filter(Boolean)
      const userIds = users.map((user: any) => user.id)

      if (tokens.length === 0) {
        console.log('[CronJob] No hay tokens push para administradores.')
        return
      }

      // 4. Enviar notificación
      const notificationData = {
        title: '⚠️ Alerta: Sin actualizaciones recientes',
        body: `La última carga masiva fue hace más de 1 hora (${diffHours.toFixed(1)} horas). Revisa el sistema.`,
        data: {
          url: '/admin/bulk-upload-logs', // ajusta según tu ruta
        },
      }

      await SendNotificationService.sendNotification(tokens, notificationData, userIds)
      console.log('[CronJob] Notificación enviada a administradores.')
    } catch (error) {
      console.error('[CronJob] Error en monitoreo de cargas masivas:', error)
    }
  })
}
