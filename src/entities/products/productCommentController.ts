import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Queries,
  Security,
  Delete,
  Request,
} from 'tsoa'
import type {
  IProductCommentAttributes,
  IProductCommentCreationAttributes,
  IResponseAllProductComment,
  IProductCommentFilter,
} from '@entities/products/productCommentModel'
import ProductCommentService from '@entities/products/productCommentService'
import { fxI18n } from '@utils/i18n'
import type { IUserAttributes } from '@users/userModel'

@Route('product-comments')
@Tags('Product Comment')
export class ProductCommentController extends Controller {
  private commentService: typeof ProductCommentService

  constructor() {
    super()
    this.commentService = ProductCommentService
  }

  @Get('/all')
  public async all(@Queries() pQueryParams: IProductCommentFilter): Promise<{
    data: IProductCommentAttributes[] | IResponseAllProductComment
  }> {
    try {
      const vResponse = await this.commentService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [] as any }
    }
  }

  @Security('bearerAuth')
  @SuccessResponse('201', 'Created')
  @Post('/create')
  public async create(
    @Body() requestBody: IProductCommentCreationAttributes,
    @Request() req: { auth: IUserAttributes }
  ): Promise<{ success: boolean; item: IProductCommentAttributes | null }> {
    try {
      if (req?.auth?.id) {
        requestBody.userId = req.auth.id
      }
      requestBody.isApproved = true // Por defecto, los comentarios están aprobados
      console.log('requestBody :>> ', requestBody)
      await this.commentService.validate(requestBody)
      console.log('antes de crear')
      const vItem = await this.commentService.create(requestBody)
      this.setStatus(201)
      return { success: true, item: vItem }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @Delete('/delete/{id}')
  public async delete(@Path() id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const vResponse = await this.commentService.delete(id)
      if (vResponse) {
        this.setStatus(200)
        return { success: true }
      }
      this.setStatus(404)
      return { success: false, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }
}
