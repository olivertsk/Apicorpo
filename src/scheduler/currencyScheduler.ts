import cron from 'node-cron'
import { bcvDolar } from 'bcv-divisas'
import CurrencyService from '@entities/currencies/currencyService'

export const initCurrencyScheduler = () => {
  // Configurado para ejecutarse cada hora al minuto 0 (0 * * * *)
  // Puedes usar '*/30 * * * *' para cada 30 min
  cron.schedule('*/60 * * * *', async () => {
    console.log('[CronJob] Iniciando sincronización con BCV...')

    try {
      const data: any = await bcvDolar()

      /**
       * Mapeamos los campos de la librería a tus códigos de moneda
       * La librería devuelve: { _dolar: "45.10", _euro: "48.20", ... }
       */
      const mappings = [
        { code: 'USD', value: data._dolar },
        { code: 'EUR', value: data._euro },
        { code: 'CNY', value: data._yuan },
        { code: 'TRY', value: data._lira },
        { code: 'RUB', value: data._rublo },
      ]

      for (const map of mappings) {
        if (map.value) {
          // Convertimos el string a número (removiendo comas si las hubiera)
          const numericValue = parseFloat(map.value.replace(',', '.'))

          if (!isNaN(numericValue)) {
            await CurrencyService.updateRateByCode(map.code, numericValue)
            console.log(`[CronJob] ${map.code} actualizado a ${numericValue}`)
          }
        }
      }

      console.log('[CronJob] Sincronización completada con éxito.')
    } catch (error) {
      console.error('[CronJob] Error al actualizar tasas desde BCV:', error)
    }
  })
}
