import {
  Controller,
  Route,
  Post,
  Res,
  Tags,
  UploadedFile,
  UploadedFiles,
  type TsoaResponse,
} from 'tsoa'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

@Route('files')
@Tags('File')
export class FileController extends Controller {

  constructor() {
    super()
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

}
