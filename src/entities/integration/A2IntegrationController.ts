import { Body, Controller, Get, Tags, Route, Queries, Post } from 'tsoa'
import { parse as json2csv } from 'json2csv'
import OrderService from '@entities/orders/orderService'
import DepartmentService from '@entities/departments/departmentService'
import ProductService from '@products/productService'
// import CategoryService from '@entities/categories/categoryService'
import BulkUploadLogService from './BulkUploadLogService'
import { Item, OrderA2, OrderProductA2 } from './interfaces'
import { IOrderAttributes } from '@entities/orders/orderModel'

@Tags('A2')
@Route('A2')
export class A2IntegrationController extends Controller {
  private orderService: typeof OrderService
  private departmentService: typeof DepartmentService
  // private categoryService: typeof CategoryService
  private productService: typeof ProductService

  constructor() {
    super()
    this.orderService = OrderService
    this.departmentService = DepartmentService
    // this.categoryService = CategoryService
    this.productService = ProductService
  }

  /**
   * Descarga la orden en formato CSV.
   * @route GET /archivophp.php
   * @param {Object} requestBody - El cuerpo de la solicitud.
   * @param {number | undefined} requestBody.wasSent - Indicador de si fue enviado.
   * @param {boolean | undefined} requestBody.product - Indicador de producto.
   * @param {string | undefined} requestBody.fecha - Fecha de la orden.
   * @returns {Promise<string>} - Retorna un string CSV.
   * @throws Will throw an error if there is an issue in the process.
   */
  @Get('/archivophp.php')
  // @Hidden()
  public async downloadOrder(
    @Queries() requestBody: { fecha?: string; wasSent?: number; product?: false }
  ) {
    try {
      requestBody.wasSent = 0
      requestBody.product = false
      const data: IOrderAttributes[] = await this.orderService.downloadOrder(requestBody)
      if (data.length === 0) {
        this.setStatus(200)
        return ''
      }
      const resposeOrder: OrderA2[] = []
      const dataJSON = JSON.parse(JSON.stringify(data))
      for (const item of dataJSON) {
        const date = item.createdAt.toString().split('T')[0]
        resposeOrder.push({
          codfmv: '03',
          id: item.code,
          codcli: item?.dataUser?.dni || '',
          fecmov: date,
          monmov: item.amountWithoutTax,
          monnet: item.amount,
          impmov: item.valueTax,
          codved: 1,
          nomcli: item?.dataUser?.name || item?.nameClient || '',
          telcl1: item.dataUser?.phoneNumber || item.phoneNumber,
          email: item?.dataUser?.email || '',
          dir1: item?.location || '',
          nrocontrol: item?.observation || '1',
          forpag: 1,
          nit: `${item.dataUser.dni},`,
        })
      }
      console.log('resposeOrder :>> ', resposeOrder);
      let csv = json2csv(resposeOrder, { delimiter: ',', eol: '\n' })
      csv = csv.replace(/['"]+/g, '')
      this.setHeader('Content-Type', 'text/plain')
      return csv
    } catch (error) {
      throw error
    }
  }

  @Get('/detalle.php')
  public async downloadProductOrder(
    @Queries() requestBody: { wasSent?: number; product?: boolean; fecha?: string }
  ) {
    try {
      requestBody.wasSent = 1
      requestBody.product = true
      const data: IOrderAttributes[] = await this.orderService.downloadOrder(requestBody)
      if (data.length === 0) {
        // return res.send('')
        this.setStatus(200)
        return ''
      }
      const dataJSON: Item[] = JSON.parse(JSON.stringify(data))
      const resposeOrder: OrderProductA2[] = []
      for (const items of JSON.parse(JSON.stringify(dataJSON))) {
        let tax = items?.tax
        for (const item of items.products) {
          if (item?.tax) {
            tax = item.tax
          }
          console.log('item.product :>> ', item.product);
          const date = item.createdAt.toString().split('T')[0]
          if (item?.product) {
            resposeOrder.push({
              idm: item.idn,
              id: item.product.idn,
              codart: item?.product?.code || '',
              fecmov: date,
              canart: item.quantity,
              preart: item.sale_price,
              monimp: item.valueTax,
              pisv: tax,
              subtotal: item.subtotal,
            })
          } else {
            console.log('item :>> ', item);
          }
        }
      }
      let csv = json2csv(resposeOrder, { delimiter: ',', eol: '\n' })
      csv = csv.replace(/['"]+/g, '')
      // res.header('Content-Type', 'text/plain')
      // return res.send(csv)
      this.setHeader('Content-Type', 'text/plain')
      return csv
    } catch (error) {
      throw error
    }
  }

  public async convertToJSON(text: string) {
    const lines = text.split('~')
    let currentTable: string = ''
    let headers: string[] = []
    const result: any = {}
    for (const line of lines) {
      const parts = line.split('|')
      if (parts[0].trim() === 'M') {
        currentTable = parts[1]
        if (currentTable === 'TablaMarcas') {
          currentTable = 'branchContact'
        }
        if (currentTable === 'TablaGrupos' || currentTable === 'samgrup') {
          currentTable = 'catalogue'
        }
        if (currentTable === 'Tablainventario' || currentTable === 'saminve') {
          currentTable = 'product'
        }
        headers = parts.slice(3)
        result[currentTable] = []
      } else if (parts[0].trim() === 'D') {
        const item: any = {}
        for (let i = 0; i < headers.length; i++) {
          let header = headers[i]
          if (header === 'desart') {
            header = 'name'
          }
          if (header === 'codart') {
            header = 'code'
          }
          if (header === 'codgru') {
            header = 'catalogueCode'
          }
          if (header === 'codmar') {
            header = 'branchContact'
          }
          if (header === 'exisac') {
            header = 'existence'
          }
          if (header === 'codimp') {
            header = 'tax'
          }
          let record = parts[i + 1]
          item[header] = record
        }
        let finalItem = item
        if (currentTable === 'product') {
          const existence = Number(item.existence.replace(',', '.'))
          finalItem = {
            code: item.code,
            name: item.name,
            catalogueCode: item.catalogueCode,
            price: item?.preve1 || item?.preve,
            existence: existence < 0 ? 0 : existence,
            tax: item.tax,
          }
          delete item.code
          delete item.name
          delete item.catalogueCode
          item?.preve && delete item.preve
          item?.preve1 && delete item.preve1
          delete item.existence
          delete item.tax
        } else if (currentTable === 'catalogue') {
          finalItem = {
            code: item.catalogueCode,
            name: item.desgru,
          }
        }
        result[currentTable].push(finalItem)
      }
    }
    return result
  }

  @Post('importardata.php')
  public async outputProduct(@Body() requestBody: { data: string }) {
    try {
      const pData = requestBody.data
      const vData = pData.replace(/\\r\\n/g, '')
      const jsonData = await this.convertToJSON(vData)
      let products: any[] = []
      // let categoryIds: { categoryId: string; productCode: null }[] = []
      for (const item of jsonData.product) {
        // const catalogueCode = item.catalogueCode
        // const catalogue = jsonData.find((catalogue: any) => catalogue.code === catalogueCode)
        const catalogueId = (await this.departmentService.firstOrCreateCode(item.catalogueCode))?.id

        const product = {
          code: item.code,
          name: item.name,
          catalogueId: catalogueId,
          price: item?.preve1 || item?.preve || item.price,
          existence: item.existence,
          tax: item.tax,
        }
        products.push(product)
      }

      const productsCreated = await this.productService.saveMasive(products)
      if (productsCreated) {
        let date: any = new Date()
        date = date.toLocaleString('en-GB', {
          timeZone: 'America/Caracas',
        })
        const bulk = {
          type: 'data/products',
          quantity: `products: ${productsCreated?.length}`,
          date: date,
        }
        await BulkUploadLogService.create(bulk)
      }
      this.setStatus(200)
      return jsonData
    } catch (error) {
      throw error
    }
  }
}
