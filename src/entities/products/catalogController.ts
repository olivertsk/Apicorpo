// catalogController.ts
import { Controller, Get, Route, Tags, Security, Request } from 'tsoa'
import CatalogService from './catalogService'
import type { Request as ExpressRequest } from 'express'

@Route('catalog')
@Tags('Catalog')
export class CatalogController extends Controller {
  private catalogService: typeof CatalogService

  constructor() {
    super()
    this.catalogService = CatalogService
  }

  /**
   * Descarga el catálogo en PDF.
   */
  @Get('/download')
  @Security('bearerAuth', ['optional'])
  public async download(@Request() req: ExpressRequest) {
    try {
      const filters = req.query
      const stream = await this.catalogService.generateCatalogPDF(filters)

      // Configurar headers
      this.setStatus(200)
      this.setHeader('Content-Type', 'application/pdf')
      this.setHeader('Content-Disposition', 'attachment; filename=catalogo.pdf')
      if (stream) {
        return stream
      } else {
        return new Error('Response object not available')
      }
    } catch (error) {
      console.error('Error generando catálogo:', error)
      this.setStatus(500)
      return null
    }
  }
}
