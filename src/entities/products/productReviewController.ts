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
  Put,
  Request,
} from 'tsoa'
import type {
  IProductReviewAttributes,
  IProductReviewCreationAttributes,
  IResponseAllProductReview,
  IProductReviewFilter,
} from '@entities/products/productReviewModel'
import ProductReviewService from '@products/productReviewService'
import { fxI18n } from '@utils/i18n'
import type { IUserAttributes } from '@users/userModel'

@Route('product-reviews')
@Tags('Product Review')
export class ProductReviewController extends Controller {
  private reviewService: typeof ProductReviewService

  constructor() {
    super()
    this.reviewService = ProductReviewService
  }

  @Get('/all')
  public async all(@Queries() pQueryParams: IProductReviewFilter): Promise<{
    data: IProductReviewAttributes[] | IResponseAllProductReview
    message?: string
  }> {
    try {
      const vResponse = await this.reviewService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth')
  @SuccessResponse('201', 'Created')
  @Post('/create')
  public async create(
    @Body() requestBody: IProductReviewCreationAttributes,
    @Request() req: { auth: IUserAttributes }
  ): Promise<{ success: boolean; item: IProductReviewAttributes | null }> {
    try {
      if (req?.auth?.id) {
        requestBody.userId = req.auth.id
      }
      requestBody.isApproved = false // Por defecto, las reseñas no están aprobadas
      await this.reviewService.validate(requestBody)
      const vItem = await this.reviewService.create(requestBody)
      this.setStatus(201)
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @Put('/approve/{id}')
  public async approve(
    @Path() id: string,
    @Body() body: { isApproved: boolean }
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const vResponse = await this.reviewService.toggleApproval(id, body.isApproved)
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
