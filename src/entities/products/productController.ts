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
  Put,
  Request
} from 'tsoa';
import { IProductAttributes, IProductCreationAttributes, IResponseAllProduct, IProductFilter } from '@entities/products/productModel';
import ProductService from '@entities/products/productService';
import { fxI18n } from '@utils/i18n';
import { IProductImageCreationAttributes } from './productImagesModel';
import { fxDeleteImages, fxMoveImages } from '@utils/helpers';
import { IUserAttributes } from '@users/userModel';

@Route('products')
@Tags('Product')
export class ProductsController extends Controller {
  private productService: typeof ProductService

  constructor() {
    super()
    this.productService = ProductService
  }

  @Security('bearerAuth', ['optional'])
  @Get('/show/{productId}')
  public async get(
    @Path() productId: string,
    @Request() requestBody: { auth: IUserAttributes }
  ): Promise<{ data: IProductAttributes | null; message?: string }> {
    try {
      const auth = requestBody?.auth || false
      const params = {
        auth: auth ? true : false,
        id: productId,
        userId: auth.id || null,
      }
      const vResponse: IProductAttributes | null = await this.productService.get(params)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IProductFilter} pQueryParams - Filtros y Número de página.
   * @returns {Promise<{ data: IProductAttributes[] | IResponseAllProduct, message?: string }>} - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', ['optional'])
  @Get('/all')
  public async all(
    @Queries() pQueryParams: IProductFilter,
    @Request() req: { auth: IUserAttributes }
  ): Promise<{
    data: IProductAttributes[] | IResponseAllProduct
    message?: string
  }> {
    try {
      if (req?.auth?.id) {
        pQueryParams.userId = req.auth.id
      }
      const vResponse: IProductAttributes[] | IResponseAllProduct =
        await this.productService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IProductFilter} pQueryParams - Filtros y datos de paginacion.
   * @returns {Promise<{ data: products: IProductAttributes[] | IResponseAllProduct, message?: string }>}
   */
  @Security('bearerAuth', ['optional'])
  @Get('/search')
  public async search(
    @Queries() pQueryParams: IProductFilter,
    @Request() req: { auth: IUserAttributes }
  ): Promise<{
    data: IProductAttributes[] | IResponseAllProduct
    message?: string
  }> {
    try {
      if (req?.auth?.id) {
        pQueryParams.userId = req.auth.id
      }
      const vResponse: IProductAttributes[] | IResponseAllProduct =
        await this.productService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: IProductCreationAttributes
  ): Promise<{ success: boolean; item: IProductAttributes | null; message?: string }> {
    try {
      await this.productService.validate(requestBody)
      let imagesData: IProductImageCreationAttributes[] = []
      if (requestBody?.images) {
        imagesData = requestBody?.images
        delete requestBody.images
      }
      if (requestBody?.coverImage) {
        requestBody.coverImage = await fxMoveImages(requestBody.coverImage)
      }
      if (!requestBody.taxRate) {
        requestBody.taxRate = 0
      } else {
        if (!requestBody.priceWithTax) {
          const priceWithTax = requestBody?.promotionalPrice || requestBody.price || 0
          requestBody.priceWithTax =
            priceWithTax + (requestBody.taxRate * priceWithTax) / 100
        }
      }
      if (!requestBody.priceWithTax) {
        requestBody.priceWithTax = requestBody?.promotionalPrice || requestBody.price
      }
      const vItem: IProductAttributes | null = await this.productService.create(requestBody)
      if (imagesData?.length) {
        for (const key in imagesData) {
          if (Object.prototype.hasOwnProperty.call(imagesData, key)) {
            const image = imagesData[key]
            if (image.file) {
              const newNameImages = await fxMoveImages(image?.file)
              imagesData[key].file = newNameImages
              imagesData[key].productId = vItem.id
            }
          }
        }
        await this.productService.bulkProductImages(imagesData)
      }
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{productId}')
  public async update(
    @Path() productId: string,
    @Body() requestBody: IProductCreationAttributes
  ): Promise<{ success: boolean; item: IProductAttributes | null; message?: string }> {
    try {
      await this.productService.validate(requestBody)
      let imagesData: IProductImageCreationAttributes[] = []
      if (requestBody?.images) {
        imagesData = requestBody?.images
        delete requestBody.images
      }
      if (requestBody?.coverImage) {
        requestBody.coverImage = await fxMoveImages(requestBody.coverImage)
      }
      if (!requestBody.taxRate) {
        requestBody.taxRate = 0
      } else {
        if (!requestBody.priceWithTax) {
          const priceWithTax = requestBody?.promotionalPrice || requestBody.price || 0
          requestBody.priceWithTax = priceWithTax + (requestBody.taxRate * priceWithTax) / 100
        }
      }
      if (!requestBody.priceWithTax) {
        requestBody.priceWithTax = requestBody?.promotionalPrice || requestBody.price
      }
      const vItem: IProductAttributes | null = await this.productService.update(
        requestBody,
        productId
      )
      if (vItem) {
        if (imagesData?.length) {
          for (const key in imagesData) {
            if (Object.prototype.hasOwnProperty.call(imagesData, key)) {
              const image = imagesData[key]
              if (image.file) {
                const newNameImages = await fxMoveImages(image?.file)
                imagesData[key].file = newNameImages
                imagesData[key].productId = productId
              }
            }
          }
          await this.productService.bulkProductImages(imagesData, productId)
        }
        this.setStatus(200) // set return status 200
        return { success: true, item: vItem }
      }
      this.setStatus(404) // set return status 404
      return { success: false, item: vItem, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }

  /**
   * @summary Eliminar una item por ID.
   * @param {string} key - ID de la item a eliminar.
   * @returns {Promise<{ status: boolean, message?: string }>}  - Resultado de la operacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.productService.softDeleteRecord(key)
      if (vResponse) {
        this.setStatus(200)
        return { success: true }
      }
      this.setStatus(400)
      return { success: false, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }

  /**
   * @summary Eliminar una images de productos por ID.
   * @param {string} key - ID de la item a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ status: boolean, message?: string }>} - Promesa que resuelve con la confirmacion del borrado.
   */
  @Delete('/imagesDelete/{key}')
  @Security('bearerAuth', ['admin'])
  public async imagesDelete(@Path() key: string): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.productService.deleteImages(key)
      if (vResponse) {
        await fxDeleteImages(vResponse)
        this.setStatus(200)
        return { success: true }
      }
      this.setStatus(400)
      return { success: false, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }
}