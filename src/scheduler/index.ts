import { initCurrencyScheduler } from './currencyScheduler'
import { initBulkUploadMonitorScheduler } from './bulkUploadMonitorScheduler'
import { initAlertScheduler } from './alertScheduler'

export const initSchedulers = () => {
  initCurrencyScheduler()
  initBulkUploadMonitorScheduler()
  initAlertScheduler()
}
