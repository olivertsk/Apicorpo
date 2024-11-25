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
  Put
} from 'tsoa';
import { IProductAttributes, IProductCreationAttributes, IResponseAllProduct, IProductFilter } from '@entities/products/productModel';
import ProductService from '@entities/products/productService';
import { fxI18n } from '@utils/i18n';
import { IProductImageCreationAttributes } from './productImagesModel';
import { fxDeleteImages, fxMoveImages } from '@utils/helpers';

@Route('products')
@Tags('Product')
export class ProductsController extends Controller {
  private productService: typeof ProductService

  constructor() {
    super()
    this.productService = ProductService
  }

  @Get('/show/{productId}')
  public async get(
    @Path() productId: string,
  ): Promise<{ data: IProductAttributes | null, message?: string }> {
    try {
      const vResponse: IProductAttributes | null = await this.productService.get(productId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {number} page - Número de página.
   * @param {number} count - Cantidad de datos por página.
   * @returns {Promise<{ data: { products: IProduct[], message?: string }, status: boolean }>}
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IProductFilter): Promise<{
    data: IProductAttributes[] | IResponseAllProduct
    message?: string
  }> {
    try {
      const vResponse: IProductAttributes[] | IResponseAllProduct = await this.productService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500);
      return { data: [], message: 'Ocurrió un error' };
    }
  }
  
  @Security('bearerAuth', ["admin"])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: IProductCreationAttributes
  ): Promise<{ success: boolean, item: IProductAttributes | null, message?: string }> {
    try {
      await this.productService.validate(requestBody)
      let imagesData: IProductImageCreationAttributes[] = []
      if (requestBody?.images) {
        imagesData = requestBody?.images
        delete requestBody.images
      }
      const vItem: IProductAttributes | null = await this.productService.create(requestBody);
      if (imagesData?.length) {
        for (const key in imagesData) {
          if (Object.prototype.hasOwnProperty.call(imagesData, key)) {
            const image = imagesData[key];
            if (image.file) {
              const newNameImages = await fxMoveImages(image?.file)
              imagesData[key].file = newNameImages
              imagesData[key].productId = vItem.id
            }
          }
        }
        await this.productService.bulkProductImages(imagesData)
      }
      this.setStatus(201); // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ["admin"])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{productId}')
  public async update(
    @Path() productId: string,
    @Body() requestBody: IProductCreationAttributes
  ): Promise<{ success: boolean, item: IProductAttributes | null, message?: string }> {
    try {
      await this.productService.validate(requestBody)
      let imagesData: IProductImageCreationAttributes[] = []
      if (requestBody?.images) {
        imagesData = requestBody?.images
        delete requestBody.images
      }
      const vItem: IProductAttributes | null = await this.productService.update(requestBody, productId)
      if (vItem) {
        if (imagesData?.length) {
          for (const key in imagesData) {
            if (Object.prototype.hasOwnProperty.call(imagesData, key)) {
              const image = imagesData[key];
              if (image.file) {
                const newNameImages = await fxMoveImages(image?.file)
                imagesData[key].file = newNameImages
                imagesData[key].productId = vItem.id
              }
            }
          }
          await this.productService.bulkProductImages(imagesData)
        }
        this.setStatus(200); // set return status 200
        return { success: true, item: vItem }
      }
      this.setStatus(404); // set return status 404
      return { success: false, item: vItem, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }

  /**
   * @summary Eliminar una item por ID.
   * @param {string} key - ID de la item a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ status: boolean }>}
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ["admin"])
  public async softDeleteRecord(
    @Path() key: string,
  ): Promise<{ success: boolean, message?: string }> {
    try {
      this.setStatus(200); // set return success 201
      const vResponse = await this.productService.softDeleteRecord(key);
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
   * @returns {Promise<{ status: boolean }>}
   */
  @Delete('/imagesDelete/{key}')
  @Security('bearerAuth', ["admin"])
  public async imagesDelete(
    @Path() key: string,
  ): Promise<{ success: boolean, message?: string }> {
    try {
      this.setStatus(200); // set return success 201
      const vResponse = await this.productService.deleteImages(key);
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