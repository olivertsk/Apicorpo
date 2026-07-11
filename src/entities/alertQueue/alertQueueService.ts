import { Op } from 'sequelize'
import { modelProduct, modelProductAlertQueue, modelFavoriteProduct, modelUser } from '@db/index'
import type { IProductAlertQueueAttributes } from './alertQueueModel'
import { fxSendMail } from '@utils/sendMail'

class AlertQueueService {
  /**
   * Crea múltiples alertas en lote.
   */
  async bulkCreate(
    alerts: Partial<IProductAlertQueueAttributes>[]
  ): Promise<IProductAlertQueueAttributes[]> {
    // bulkCreate expects creation attributes where some fields (like productId) are required.
    // Cast to any to satisfy Sequelize typings while keeping flexibility on input.
    return await modelProductAlertQueue.bulkCreate(alerts as any)
  }

  /**
   * Obtiene todas las alertas no procesadas con información del producto.
   */
  async getUnprocessedAlerts(): Promise<IProductAlertQueueAttributes[]> {
    return await modelProductAlertQueue.findAll({
      where: { processed: false },
      include: [
        {
          model: modelProduct,
          as: 'product',
          attributes: ['id', 'name', 'code', 'price', 'stock'],
        },
      ],
    })
  }

  /**
   * Marca alertas como procesadas.
   */
  async markAsProcessed(alertIds: string[]): Promise<void> {
    await modelProductAlertQueue.update(
      { processed: true, processedAt: new Date() },
      { where: { id: { [Op.in]: alertIds } } }
    )
  }

  /**
   * Procesa todas las alertas no procesadas:
   * - Agrupa por usuario (solo favoritos)
   * - Genera un correo resumen por usuario
   * - Marca como procesadas
   */
  async processAlerts(): Promise<void> {
    const alerts = await this.getUnprocessedAlerts()
    if (alerts.length === 0) {
      console.log('[AlertQueue] No hay alertas pendientes')
      return
    }

    // Obtener IDs de productos únicos
    const productIds = [...new Set(alerts.map((a) => a.productId))]

    // Buscar favoritos de esos productos con datos de usuario
    const favorites: any[] = await modelFavoriteProduct.findAll({
      where: { productId: { [Op.in]: productIds } },
      include: [
        {
          model: modelUser,
          as: 'user',
          attributes: ['id', 'email', 'name'],
        },
      ],
    })

    if (favorites.length === 0) {
      console.log('[AlertQueue] Ningún producto en favoritos')
      await this.markAsProcessed(alerts.map((a) => a.id!))
      return
    }

    // Agrupar alertas por usuario
    const userAlertsMap = new Map<string, { user: any; alerts: IProductAlertQueueAttributes[] }>()

    for (const fav of favorites) {
      const user = fav.user
      if (!user) continue
      const userId = user.id
      // Filtrar alertas que correspondan al producto favorito
      const userAlerts = alerts.filter((a) => a.productId === fav.productId)
      if (userAlerts.length === 0) continue

      if (!userAlertsMap.has(userId)) {
        userAlertsMap.set(userId, { user, alerts: [] })
      }
      userAlertsMap.get(userId)!.alerts.push(...userAlerts)
    }

    // Enviar correo por cada usuario
    const alertIdsToMark: string[] = []

    for (const [userId, { user, alerts: userAlerts }] of userAlertsMap) {
      // Construir resumen de productos para este usuario
      const productsSummary = userAlerts.map((alert) => ({
        name: alert.product?.name || 'Producto',
        code: alert.product?.code || '',
        previousPrice: alert.previousPrice,
        currentPrice: alert.currentPrice,
        previousStock: alert.previousStock,
        currentStock: alert.currentStock,
        alertType: alert.alertType,
      }))

      const emailData = {
        email: user.email,
        userName: user.name || 'Usuario',
        products: productsSummary,
      }

      try {
        await fxSendMail(emailData, 'product_alert', '📦 Actualización de tus productos favoritos')
        console.log(`[AlertQueue] Correo enviado a ${user.email}`)
        alertIdsToMark.push(...userAlerts.map((a) => a.id!))
      } catch (error) {
        console.error(`[AlertQueue] Error al enviar correo a ${user.email}:`, error)
      }
    }

    // Marcar como procesadas todas las alertas (incluidas las que no generaron correo)
    if (alertIdsToMark.length > 0) {
      await this.markAsProcessed(alertIdsToMark)
    } else {
      // Si no se envió ningún correo, marcar todas igual para no repetir
      await this.markAsProcessed(alerts.map((a) => a.id!))
    }
  }
}

export default new AlertQueueService()
