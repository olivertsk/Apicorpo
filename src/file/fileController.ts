import {
  Controller,
  Route,
  Post,
  Res,
  Tags,
  UploadedFile,
  UploadedFiles,
  type TsoaResponse,
  Delete,
  Body,
  Security,
} from 'tsoa'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import sharp from 'sharp'
import ProductService from '@entities/products/productService'
import DepartmentService from '@entities/departments/departmentService'
import CategoryService from '@entities/categories/categoryService'
import BannerService from '@entities/banners/bannerService'
import MapService from '@entities/maps/mapService'
import { fxI18n } from '@utils/i18n'

type FileType = 'products' | 'departments' | 'categories' | 'banners' | 'maps' | null
@Route('files')
@Tags('File')
export class FileController extends Controller {
  private productService: typeof ProductService
  private departmentService: typeof DepartmentService
  private categoryService: typeof CategoryService
  private bannerService: typeof BannerService
  private mapService: typeof MapService

  constructor() {
    super()
    this.productService = ProductService
    this.departmentService = DepartmentService
    this.categoryService = CategoryService
    this.bannerService = BannerService
    this.mapService = MapService
  }

  private async processFile(file: Express.Multer.File): Promise<string> {
    const isImage = file.mimetype.startsWith('image/')
    const originalExt = path.extname(file.originalname)
    let fileName: string
    let buffer: Buffer

    if (isImage) {
      // Generar nombre con extensión .webp
      const baseName = uuidv4()
      fileName = `${baseName}.webp`
      // Procesar con sharp: convertir a WebP con calidad 80%
      buffer = await sharp(file.buffer)
        .webp({ quality: 80 }) // calidad 80% (0-100)
        .toBuffer()
    } else {
      // Guardar con extensión original
      const format = originalExt || '.bin'
      const baseName = uuidv4()
      fileName = `${baseName}${format}`
      buffer = file.buffer
    }

    // Guardar en carpeta 'uploads/temp/'
    const uploadDir = 'uploads/temp'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    const filePath = path.join(uploadDir, fileName)
    fs.writeFileSync(filePath, buffer)
    return `temp/${fileName}` // ruta relativa para devolver
  }

  @Post('uploadFile')
  public async uploadFile(
    @Res() notFound: TsoaResponse<404, { reason: string; error?: any }>,
    @UploadedFile() file: Express.Multer.File,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<{ fileName: string[] }> {
    try {
      if (!file && !files) {
        return notFound(404, { reason: 'No file provided' })
      } else if (file) {
        // const format = path.extname(file.originalname)
        // const vNormalizedName = uuidv4() + format
        // const vFileName = `temp/${Date.now()}-${vNormalizedName}`
        // fs.writeFileSync(`uploads/${vFileName}`, file.buffer)
        const filePath = await this.processFile(file)
        return { fileName: [filePath] }
      } else if (files) {
        // const filesName: string[] = []
        // for (const item of files) {
        //   const format = path.extname(item.originalname)
        //   const vNormalizedName = uuidv4() + format
        //   const vFileName = `temp/${Date.now()}-${vNormalizedName}`
        //   fs.writeFileSync(`uploads/${vFileName}`, item.buffer)
        //   filesName.push(vFileName)
        // }
        const filePaths = await Promise.all(files.map((f) => this.processFile(f)))
        return { fileName: filePaths }
      }
      return notFound(404, { reason: 'No file provided' })
    } catch (error) {
      return notFound(404, { reason: 'No file provided', error: error })
    }
  }

  @Security('bearerAuth', ['admin'])
  @Delete('delete')
  public async delete(
    @Body() requestBody: { fileName: string; type?: FileType | null }
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const fileName = requestBody.fileName
      const type = requestBody?.type
      const filePath = path.join('uploads', fileName)
      if (fs.existsSync(filePath)) {
        if (type && fileName.includes('storage')) {
          switch (type) {
            case 'products':
              await this.productService.deleteImagesName(fileName)
              fs.unlinkSync(filePath)
              break
            case 'departments':
              await this.departmentService.deleteImagesName(fileName)
              fs.unlinkSync(filePath)
              break
            case 'categories':
              await this.categoryService.deleteImagesName(fileName)
              fs.unlinkSync(filePath)
              break
            case 'banners':
              await this.bannerService.deleteImagesName(fileName)
              fs.unlinkSync(filePath)
              break
            case 'maps':
              await this.mapService.deleteImagesName(fileName)
              fs.unlinkSync(filePath)
              break

            default:
              break
          }
        }
        this.setStatus(200) // set return success 201
        return { success: true }
      } else {
        this.setStatus(400)
        return { success: false, message: fxI18n.__('file_not_found') }
      }
    } catch (error) {
      throw error
    }
  }
}
