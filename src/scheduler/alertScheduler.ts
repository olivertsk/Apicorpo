import cron from 'node-cron'
import AlertQueueService from '@entities/alertQueue/alertQueueService'

export const initAlertScheduler = () => {
  // cron.schedule('*/1 * * * *', async () => {
  cron.schedule('0 8,18 * * *', async () => {
    console.log('[CronJob] Iniciando procesamiento de alertas...')
    try {
      await AlertQueueService.processAlerts()
      console.log('[CronJob] Alertas procesadas exitosamente.')
    } catch (error) {
      console.error('[CronJob] Error procesando alertas:', error)
    }
  })
}
