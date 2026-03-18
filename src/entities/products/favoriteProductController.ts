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
  Request,
} from 'tsoa'
import type {
  IFavoriteProductAttributes,
  IFavoriteProductCreationAttributes,
  IResponseAllFavoriteProduct,
  IFavoriteProductFilter,
} from '@entities/products/favoriteProductModel'
import FavoriteProductService from '@entities/products/favoriteProductService'
import { fxI18n } from '@utils/i18n'
import type { IUserAttributes } from '@users/userModel'

@Route('favoriteProducts')
@Tags('FavoriteProduct')
export class FavoriteProductsController extends Controller {
  private favoriteProductService: typeof FavoriteProductService

  constructor() {
    super()
    this.favoriteProductService = FavoriteProductService
  }

  @Security('bearerAuth', ['optional'])
  @Get('/show/{favoriteProductId}')
  public async get(
    @Path() favoriteProductId: string
  ): Promise<{ data: IFavoriteProductAttributes | null; message?: string }> {
    try {
      const vResponse: IFavoriteProductAttributes | null =
        await this.favoriteProductService.get(favoriteProductId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {IFavoriteProductFilter} pQueryParams - filtros y Número de página.
   * @returns {Promise<{ data: IFavoriteProductAttributes[] | IResponseAllFavoriteProduct, message?: string }>} - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', ['optional'])
  @Get('/all')
  public async all(
    @Queries() pQueryParams: IFavoriteProductFilter,
    @Request() req: { auth: IUserAttributes }
  ): Promise<{
    data: IFavoriteProductAttributes[] | IResponseAllFavoriteProduct
    message?: string
  }> {
    try {
      if (req?.auth?.id) {
        pQueryParams.userId = req.auth.id
        const vResponse: IFavoriteProductAttributes[] | IResponseAllFavoriteProduct =
          await this.favoriteProductService.all(pQueryParams)
        this.setStatus(200)
        return { data: vResponse }
      }
      this.setStatus(200)
      return {
        data: {
          total: 0,
          totalPage: 0,
          data: [],
          actualPage: 0,
        },
      }
    } catch (error) {
      console.log('error favorite all :>> ', error)
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['optional'])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: IFavoriteProductCreationAttributes,
    @Request() req: { auth: IUserAttributes }
  ): Promise<{ success: boolean; item: IFavoriteProductAttributes | null; message?: string }> {
    try {
      if (req?.auth?.id) {
        requestBody.userId = req.auth.id
        await this.favoriteProductService.validate(requestBody)
        const vItem: IFavoriteProductAttributes | null =
          await this.favoriteProductService.create(requestBody)
        this.setStatus(201) // set return status 201
        return { success: true, item: vItem }
      }
      this.setStatus(500) // set return status 201
      return { success: true, message: 'Debe estar registrado', item: null }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{favoriteProductId}')
  public async update(
    @Path() favoriteProductId: string,
    @Body() requestBody: IFavoriteProductCreationAttributes
  ): Promise<{ success: boolean; item: IFavoriteProductAttributes | null; message?: string }> {
    try {
      await this.favoriteProductService.validate(requestBody)
      const vItem: IFavoriteProductAttributes | null = await this.favoriteProductService.update(
        requestBody,
        favoriteProductId
      )
      if (vItem) {
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
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ status: boolean }>} - Promesa que resuelve con la verificacion de la eliminacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.favoriteProductService.softDeleteRecord(key)
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
}
