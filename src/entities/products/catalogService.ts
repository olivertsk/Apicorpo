// catalogService.ts
import PDFDocument from 'pdfkit'
import type { Readable } from 'stream'
import { modelProduct, modelDepartment } from '@db/index'
import { Op } from 'sequelize'
// import axios from 'axios'
import type { IProductAttributes } from './productModel'
import type { IDepartmentAttributes } from '@entities/departments/departmentModel'
import path from 'path'
import * as fs from 'fs'

// Extendemos IProductAttributes para incluir la relación department
interface CatalogProduct extends IProductAttributes {
  department?: IDepartmentAttributes
}

class CatalogService {
  /**
   * Genera un PDF con el catálogo de productos.
   * @param filters - Filtros opcionales (departmentId, categoryId, search)
   * @returns Readable stream listo para pipe a la respuesta HTTP
   */
  async generateCatalogPDF(filters: any): Promise<Readable> {
    // 1. Construir filtros para productos activos
    const where: any = { status: true, deletedAt: null }
    if (filters.departmentId) where.departmentId = filters.departmentId
    if (filters.categoryId) where.categoryId = filters.categoryId
    if (filters.search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${filters.search}%` } },
        { code: { [Op.iLike]: `%${filters.search}%` } },
      ]
    }

    // 2. Obtener productos con su departamento
    const products: CatalogProduct[] = await modelProduct.findAll({
      where,
      include: [{ model: modelDepartment, as: 'department', attributes: ['id', 'name'] }],
      order: [
        ['departmentId', 'ASC'],
        ['name', 'ASC'],
      ],
    })

    // 3. Agrupar por departamento
    const groups: { [deptId: string]: { deptName: string; products: CatalogProduct[] } } = {}
    for (const p of products) {
      const dept: any = p.department as IDepartmentAttributes
      if (!dept) continue
      if (!groups[dept.id]) groups[dept.id] = { deptName: dept.name, products: [] }
      groups[dept.id].products.push(p)
    }

    // 4. Precargar imágenes de productos (coverImage)
    const imageCache = new Map<string, Buffer>()
    const coverImageUrls = products.map((p) => p.coverImage).filter((url): url is string => !!url)
    const uniqueUrls = [...new Set(coverImageUrls)]
    await this.downloadImages(uniqueUrls, imageCache)

    // 5. Precargar imagen de portada y de fondo (desde variables de entorno)
    const coverUrl = process.env.CATALOG_COVER_IMAGE_URL
    const backgroundUrl = process.env.CATALOG_BACKGROUND_IMAGE_URL
    const [coverBuffer, backgroundBuffer] = await Promise.all([
      coverUrl ? this.downloadImage(coverUrl) : Promise.resolve(null),
      backgroundUrl ? this.downloadImage(backgroundUrl) : Promise.resolve(null),
    ])

    // 6. Crear documento PDF
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 0, left: 50, right: 50 },
      bufferPages: true,
    })
    const stream = doc as unknown as Readable

    // let isFirstPage = true
    doc.on('pageAdded', () => {
      // if (isFirstPage) {
      //   isFirstPage = false
      //   return
      // }
      // Dibujar fondo en cada página nueva (excepto portada)
      if (backgroundBuffer) {
        doc.image(backgroundBuffer, 0, 0, {
          width: doc.page.width,
          height: doc.page.height,
          fit: [doc.page.width, doc.page.height],
        })
      }
    })

    // 7. Dibujar portada
    this.drawCover(doc, coverBuffer)

    // 8. Contenido: agrupar y dibujar productos
    const MAX_PRODUCTS_PER_PAGE = 24
    let productCounter = 0
    let isFirstProductPage = true

    for (const deptId of Object.keys(groups)) {
      const group = groups[deptId]
      if (isFirstProductPage) {
        doc.addPage() // página 2
        isFirstProductPage = false
        productCounter = 0
      }
      // Si no es el primer departamento, añadir página nueva (opcional)
      // pero lo dejamos controlado por contador

      // Encabezado del departamento
      this.drawDepartmentHeader(doc, group.deptName)

      for (const product of group.products) {
        if (productCounter >= MAX_PRODUCTS_PER_PAGE) {
          doc.addPage()
          productCounter = 0
          // Repetir encabezado en la nueva página
          this.drawDepartmentHeader(doc, group.deptName)
        }

        const imageBuffer = product.coverImage ? imageCache.get(product.coverImage) || null : null
        this.drawProduct(doc, product, productCounter, imageBuffer)
        productCounter++
      }
    }

    // Finalizar PDF
    doc.end()
    return stream
  }

  // --------------------------------------------------------------
  // Métodos privados auxiliares
  // --------------------------------------------------------------

  private async downloadImages(urls: string[], cache: Map<string, Buffer>) {
    const promises = urls.map(async (url) => {
      if (cache.has(url)) return
      const buffer = await this.downloadImage(url)
      if (buffer) cache.set(url, buffer)
    })
    await Promise.all(promises)
  }

  private async downloadImage(url: string): Promise<Buffer | null> {
    try {
      const filePath = path.join('uploads', url)
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath)
      }
      // const response = await axios.get(`/uploads/${url}`, {
      //   responseType: 'arraybuffer',
      //   timeout: 10000,
      // })
      // return Buffer.from(response.data, 'binary')
      return null
    } catch (error) {
      console.error(`Error descargando imagen: ${url}`, error)
      return null
    }
  }

  private drawCover(doc: PDFKit.PDFDocument, coverBuffer: Buffer | null) {
    if (coverBuffer) {
      doc.image(coverBuffer, 0, 0, {
        width: doc.page.width,
        height: doc.page.height,
        fit: [doc.page.width, doc.page.height],
      })
    }
    // Texto de portada
    // doc.fontSize(30).fillColor('#333').text('Catálogo de Productos', 50, 200, { align: 'center' })
    // doc.fontSize(20).text('Corpoindustri', 50, 250, { align: 'center' })
    // doc
    //   .fontSize(12)
    //   .text(`Generado: ${new Date().toLocaleDateString()}`, 50, 300, { align: 'center' })
  }

  private drawDepartmentHeader(doc: PDFKit.PDFDocument, name: string) {
    const y = 20
    doc.fontSize(24).fillColor('#1958ac').text(name, 40, y, { align: 'center' })
    doc
      .moveTo(40, y + 20)
      .lineTo(doc.page.width - 50, y + 20)
      .lineWidth(2)
      .strokeColor('#1958ac')
      .stroke()
  }

  private drawProduct(
    doc: PDFKit.PDFDocument,
    product: CatalogProduct,
    index: number,
    imageBuffer: Buffer | null
  ) {
    // Grilla 4 columnas × 6 filas
    const col = index % 4
    const row = Math.floor(index / 4)
    const cellWidth = (doc.page.width - 100) / 4 // 50px margen izquierdo y derecho
    const cellHeight = (doc.page.height - 105) / 6 // 50 top + 70 bottom
    const x = 50 + col * cellWidth
    const y = 50 + row * cellHeight // 80 para dejar espacio para el encabezado

    // Imagen
    const imgHeight = cellHeight - 50
    if (imageBuffer) {
      doc.image(imageBuffer, x + 10, y, { width: cellWidth - 20, height: imgHeight })
    } else {
      doc.rect(x + 10, y, cellWidth - 20, imgHeight).stroke()
    }

    // Nombre del producto (con ellipsis si es largo)
    const nameY = y + cellHeight - 35
    doc
      .fontSize(8)
      .fillColor('#1958ac')
      .text(`${product.name} (${product.code})`, x + 10, nameY, {
        width: cellWidth - 20,
        align: 'center',
        ellipsis: true,
      })

    // Código entre paréntesis
    // const codeY = nameY + 12
    // doc
    //   .fontSize(7)
    //   .fillColor('#666')
    //   .text(`(${product.code})`, x + 10, codeY, {
    //     width: cellWidth - 20,
    //     align: 'center',
    //   })
  }
}

export default new CatalogService()
