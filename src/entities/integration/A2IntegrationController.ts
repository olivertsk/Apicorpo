import { Body, Controller, Get, Tags, Route, Queries, Post, UploadedFile, Request } from 'tsoa'
import * as unzipper from 'unzipper'
import * as fs from 'fs'
import * as path from 'path'
import { parse as json2csv } from 'json2csv'
import OrderService from '@entities/orders/orderService'
import DepartmentService from '@entities/departments/departmentService'
import ProductService from '@products/productService'
// import CategoryService from '@entities/categories/categoryService'
import BulkUploadLogService from './BulkUploadLogService'
import { Item, OrderA2, OrderProductA2 } from './interfaces'
import { IOrderAttributes } from '@entities/orders/orderModel'

interface IUploadZipReponseError {
  status: boolean,
  file: string,
  msg: string
}
interface IUploadZipReponse {
  result: {
    status: boolean,
    file: number,
    msg: string
  },
  errors: IUploadZipReponseError[]
}
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
  // https://api.corpoindustri.com/A2/ + 'archivophp.php?fe=' + fecha + '&usu=' + usuario + '&cla='
  //       + clave + '&bd=' + md + '&time=01';
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
  @Get('/archivophp2.php')
  // @Hidden()
  public async downloadOrder(
    @Queries()
    requestBody: {
      fecha?: string
      wasSent?: number
      product?: boolean
      fe?: string
      usu?: string
      cla?: string
      bd?: string
      time?: string
    }
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
          forpag: 1 + ',',
        })
      }
      // const { parse } = require('json2csv')
      let csv = json2csv(resposeOrder, { delimiter: ',', eol: '\n' })
      csv = csv.replace(/['"]+/g, '')
      csv = csv.replace(/["]+/g, '')
      // csv = csv.replace(/\n/g, '\r\n')
      this.setHeader('Content-Type', 'text/plain')
      return csv
    } catch (error) {
      throw error
    }
  }
  //  https://api.corpoindustri.com/A2/ + 'detalle.php?fe=' + fecha + '&usu=' + usuario + '&cla='
  // + clave + '&bd=' + md + '&time=01';
  @Get('/detalle2.php')
  public async downloadProductOrder(
    @Queries()
    requestBody: {
      wasSent?: number
      product?: boolean
      fe?: string
      usu?: string
      cla?: string
      bd?: string
      time?: string
    }
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
          console.log('item.product :>> ', item.product)
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
              subtotal: item.subtotal + ',',
            })
          } else {
            console.log('item :>> ', item)
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
            stock: existence < 0 ? 0 : existence,
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
  public async outputProduct(
    @Body()
    requestBody: {
      data: string
      wasSent?: number
      product?: boolean
      fe?: string
      usu?: string
      cla?: string
      bd?: string
      time?: string
    }
  ) {
    try {
      const pData = requestBody.data
      const vData = pData.replace(/\\r\\n/g, '')
      const jsonData = await this.convertToJSON(vData)
      let products: any[] = []
      // let categoryIds: { categoryId: string; productCode: null }[] = []
      console.log('jsonData :>> ', jsonData);
      console.log('jsonData. :>> ', jsonData.catalogue);
      if (jsonData?.catalogue) {
        for (const item of jsonData.catalogue) {
          const catalogue = {
            code: item.code,
            name: item.name,
          }
          await this.departmentService.firstOrCreate(catalogue)
        }
      }
      if (jsonData?.product) {
        for (const item of jsonData.product) {
          // const catalogueCode = item.catalogueCode
          // const catalogue = jsonData.find((catalogue: any) => catalogue.code === catalogueCode)
          const catalogueId = (await this.departmentService.firstOrCreateCode(item.catalogueCode))
            ?.id

          const product: any = {
            code: item.code,
            name: item.name,
            departmentId: catalogueId,
            price: item?.preve1 || item?.preve || item.price,
            stock: item.stock,
            taxRate: item.tax || 0,
          }
          if (product.price && product.taxRate) {
            const price = Number(product.price)
            const taxRate = Number(product.taxRate)
            const priceWithTax = price + (price * taxRate) / 100
            product.priceWithTax = priceWithTax
          }
          products.push(product)
        }
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

  @Post('/upload')
  public async uploadZip(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any
  ): Promise<{ data: IUploadZipReponse }> {
    try {
      const tempDir = path.join('./uploads', 'masive')
      const uploadsDir = path.join('./uploads')

      // Crear directorio temporal si no existe
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir)
      }
      // Descomprimir el archivo en el directorio temporal
      fs.writeFileSync(`${uploadsDir}/p.zip`, file.buffer)

      // Filtrar y mover imágenes
      const files = await this.zipRead(`${uploadsDir}/p.zip`)
      const data = await this.verifiFiles(files)
      fs.rmdirSync(tempDir, { recursive: true })
      fs.unlinkSync(`${uploadsDir}/p.zip`)
      fs.mkdirSync(tempDir)
      this.setStatus(200)
      return { data: data }
    } catch (error) {
      console.log('error :>> ', error)
      console.log('req :>> ', req)
      throw error
    }
  }
  private async zipRead(filename: string) {
    const result: any = []
    return new Promise(async function (resolve) {
      const readable = fs.createReadStream(filename).pipe(unzipper.Parse())
      readable.on('entry', async function (entry) {
        const fileNameEntry = entry.path
        const sizeEntry = entry.vars.uncompressedSize
        const extension = entry.path.split('.')[1]
        if (entry.type === 'File' && !fileNameEntry.includes('/')) {
          await entry.pipe(fs.createWriteStream(`./uploads/masive/${fileNameEntry}`))
          result.push({
            fileNameEntry,
            sizeEntry,
            extension,
          })
        } else {
          result.push({
            fileNameEntry,
            sizeEntry: 0,
            extension: 'directory',
          })
          entry.autodrain()
        }
      })
      readable.on('readable', () => {
        let chunk
        while (null !== (chunk = readable.read())) {
          console.log(`read: ${chunk}`)
        }
      })
      readable.on('end', (end: any) => {
        console.log(end)
        resolve(result)
      })
      readable.on('error', (err) => {
        console.log(err)
        resolve(result)
      })
    })
  }
  private async verifiFiles(data: any) {
    const result: any = {
      result: {
        status: true,
        file: 0,
        msg: `Archivos cargados con exito`,
      },
      errors: [],
    }
    const imagesData: any = []
    for (const item of data) {
      const dateRam = `${new Date().getTime()}`
      const sizeEntry = item.sizeEntry
      const fileNameEntry = item.fileNameEntry
      const extension = item.extension
      if (sizeEntry > 3000000 || sizeEntry === 0) {
        result.errors.push({
          status: false,
          file: fileNameEntry,
          msg: `El archivo ${fileNameEntry} es muy pesado o no existe`,
        })
      }
      if (
        extension !== 'jpg' &&
        extension !== 'jpeg' &&
        extension !== 'png' &&
        extension !== 'gif' &&
        extension !== 'bmp' &&
        extension !== 'webp'
      ) {
        result.errors.push({
          status: false,
          file: fileNameEntry,
          msg: `El archivo ${fileNameEntry} no es permitido`,
        })
      }
      let fileNameCount = fileNameEntry.lastIndexOf('.')
      let fileName = fileNameEntry.slice(0, fileNameCount)

      let position = 0
      if (fileName.includes('-')) {
        let codeArr = fileName.split('-')
        position = codeArr[codeArr.length - 1]
      }
      // fileName = fileName.includes('-') ? fileName.split('-')[0] : fileName
      let code = fileName
      if (fileName.includes('-')) {
        const indexOrden = code.lastIndexOf('-')
        if (!isNaN(position) && Number(position) >= 0 && Number(position) <= 9) {
          code = code.slice(0, indexOrden)
        } else {
          code = fileName
        }
      }
      position = isNaN(position) ? 0 : Number(position)
      const valid = await this.productService.findByCode(code)
      if (valid) {
        const oldPath = `./uploads/masive/${fileNameEntry}`
        const newPath = `./uploads/storage/${valid.id}-${fileNameEntry}`
        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, newPath)
        }
        if (fs.existsSync(newPath)) {
          // !isNaN(result.result?.file) ? (result.result.file = result.result?.file + 1) : 0
          result.result.file = result.result?.file + 1
          imagesData.push({
            file: `storage/${valid.id}-${fileNameEntry}?a=${dateRam}`,
            productId: valid.id,
            position,
          })
        }
      } else {
        const exist = await fs.existsSync(`./uploads/masive/files/${fileNameEntry}`)
        if (exist) {
          fs.unlinkSync(`./uploads/masive/files/${fileNameEntry}`)
        }
        result.errors.push({
          status: false,
          file: fileNameEntry,
          msg: `El archivo ${fileNameEntry} no coincide con ningun producto`,
        })
      }
    }
    await this.productService.bulkProductImages(imagesData)
    return result
  }
}
