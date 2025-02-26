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
        const format = path.extname(file.originalname)
        const vNormalizedName = uuidv4() + format
        const vFileName = `temp/${Date.now()}-${vNormalizedName}`
        fs.writeFileSync(`uploads/${vFileName}`, file.buffer)
        return { fileName: [vFileName] }
      } else if (files) {
        const filesName: string[] = []
        for (const item of files) {
          const format = path.extname(item.originalname)
          const vNormalizedName = uuidv4() + format
          const vFileName = `temp/${Date.now()}-${vNormalizedName}`
          fs.writeFileSync(`uploads/${vFileName}`, item.buffer)
          filesName.push(vFileName)
        }
        return { fileName: filesName }
      }
      return notFound(404, { reason: 'No file provided' })
    } catch (error) {
      return notFound(404, { reason: 'No file provided', error: error })
    }
  }
  
  @Security('bearerAuth', ["admin"])
  @Delete('delete')
  public async delete(
    @Body() requestBody: { fileName: string, type?: FileType | null }
  ): Promise<{ success: boolean, message?: string }> {
    try {
      const fileName = requestBody.fileName
      const type = requestBody?.type
      console.log('fileName :>> ', fileName);
      const filePath = path.join('uploads', fileName);
      console.log('filePath :>> ', filePath);
      console.log('type :>> ', type);
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
      console.log('error :>> ', error);
      throw error
    }
  }

}
