import {
  Body,
  Controller
} from 'tsoa'
import { parse as json2csv } from 'json2csv'
import OrderService from '@entities/orders/orderService'
import DepartmentService from '@entities/departments/departmentService'
import ProductService from '@products/productService'
import CategoryService from '@entities/categories/categoryService'
import BulkUploadLogService from './BulkUploadLogService'
import { Item, OrderA2, OrderProductA2 } from './interfaces'
import { IOrderAttributes } from '@entities/orders/orderModel'

export default class A2IntegrationController extends Controller {
  private orderService: typeof OrderService
  private departmentService: typeof DepartmentService
  private categoryService: typeof CategoryService
  private productService: typeof ProductService

  constructor() {
    super()
    this.orderService = OrderService
    this.departmentService = DepartmentService
    this.categoryService = CategoryService
    this.productService = ProductService
  }
  public async downloadOrder(
    @Body() requestBody: { wasSent: number; product: false; fecha: string }
  ) {
    try {
      requestBody.wasSent = 0
      requestBody.product = false
      const data: IOrderAttributes[] = await this.orderService.downloadOrder(requestBody)
      if (data.length === 0) {
        // return res.send('')
        this.setStatus(200)
        return ''
      }
      const resposeOrder: OrderA2[] = []
      const dataJSON = JSON.parse(JSON.stringify(data))
      for (const item of dataJSON) {
        const date = item.createdAt.toString().split('T')[0]
        resposeOrder.push({
          codfmv: '03',
          id: item.id,
          codcli: item.dataUser.dni,
          fecmov: date,
          monmov: item.amountWithoutTax,
          monnet: item.amount,
          impmov: item.valueTax,
          codved: 1,
          nomcli: item.dataUser?.name,
          telcl1: item.dataUser?.phoneNumber || item.numberClient,
          email: item.dataUser.email,
          dir1: item.direction,
          nrocontrol: item?.observation || '1',
          forpag: 1,
          nit: `${item.dataUser.nit},`,
        })
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

  public async downloadProductOrder(
    @Body() requestBody: { wasSent: number; product: boolean; fecha: string }
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
          const date = item.createdAt.toString().split('T')[0]
          resposeOrder.push({
            idm: item.id,
            id: item.productId,
            codart: item?.product?.code || '',
            fecmov: date,
            canart: item.quantity,
            preart: item.sale_price,
            monimp: item.valueTax,
            pisv: tax,
            subtotal: item.subtotal,
          })
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

  public async outputProduct(@Body() requestBody: { data: string }) {
    try {
      const pData = requestBody.data
      const vData = pData.replace(/\\r\\n/g, '')
      const jsonData = await this.convertToJSON(vData)
      let products: any[] = []
      // let categoryIds: { categoryId: string; productCode: null }[] = []
      for (const item of jsonData.product) {
        const catalogueCode = item.catalogueCode
        const catalogue = jsonData.catalogue.find(
          (catalogue: any) => catalogue.code === catalogueCode
        )
        let catalogueId = null
        let categoryId = null
        if (catalogue && catalogue?.name) {
          if (catalogue.name.includes('D-')) {
            const catalogueData = {
              name: catalogue.name.replace('D-', ''),
              code: catalogue.code,
            }
            catalogueId = (await this.departmentService.firstOrCreateCode(catalogueData))?.id
          } else if (catalogue.name.includes('S-')) {
            const categoryData = {
              name: catalogue.name.replace('S-', ''),
              code: catalogue.code,
            }
            const category = await this.categoryService.firstOrCreateCode(categoryData)
            if (category) {
              if (category?.departmentId && category.departmentId !== null) {
                catalogueId = category.departmentId
              }
              categoryId = category.id
            } else {
              console.log('categoria no se creo S-', catalogue.name)
            }
          } else if (catalogue.name.includes('CH-')) {
            const categoryData = {
              name: catalogue.name.replace('CH-', ''),
              code: catalogue.code,
            }
            const category = await this.categoryService.firstOrCreateCode(categoryData)
            if (category) {
              if (category?.departmentId && category.departmentId !== null) {
                catalogueId = category.departmentId
              }
              if (category?.id) {
                categoryId = category.id
              }
            } else {
              console.log('categoria no se creo CH-', catalogue.name)
            }
          } else {
            console.log('no concuerda ninguno', catalogue.name)
          }
        } else {
          console.log('catalogue :>> ', catalogue)
        }
        const product = {
          code: item.code,
          name: item.name,
          catalogueId: catalogueId,
          categoryId: categoryId,
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
        // if (categoryIds.length) {
        //   for (const product of productsCreated) {
        //     const arrCategory = categoryIds.filter((x) => x.productCode === product.code)
        //     const arrCategoryId = arrCategory.map((x) => x.categoryId)
        //     const arrCategoryText = arrCategoryId.join(',')
        //     arrCategoryText && (await this.productService.storeCategories(arrCategoryText, product.id))
        //   }
        // }
      }
      this.setStatus(200)
      return jsonData
    } catch (error) {
      throw error
    }
  }
}
