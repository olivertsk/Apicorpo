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
import { IOrderAttributes, IOrderCreationAttributes, IResponseAllOrder, IOrderFilter } from '@entities/orders/orderModel';
import OrderService from '@entities/orders/orderService';
import { fxI18n } from '@utils/i18n';
import { IUserAttributes } from '@users/userModel';
import { IOrderProductCreationAttributes } from './orderProductModel';
 
@Route('orders')
@Tags('Order')
export class OrdersController extends Controller {
  private orderService: typeof OrderService

  constructor() {
    super()
    this.orderService = OrderService
  }

  @Get('/show/{orderId}')
  public async get(
    @Path() orderId: string
  ): Promise<{ data: IOrderAttributes | null; message?: string }> {
    try {
      const vResponse: IOrderAttributes | null = await this.orderService.get(orderId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      console.error('Error en el controlador:', error)
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {number} page - Número de página.
   * @param {number} count - Cantidad de datos por página.
   * @returns {Promise<{ data: { orders: IOrder[], message?: string }, status: boolean }>}
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IOrderFilter): Promise<{
    data: IOrderAttributes[] | IResponseAllOrder
    message?: string
  }> {
    try {
      const vResponse: IOrderAttributes[] | IResponseAllOrder =
        await this.orderService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['optional'])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: IOrderCreationAttributes,
    @Request() pQueryParams: { auth: IUserAttributes }
  ): Promise<{ success: boolean; item: IOrderAttributes | null; message?: string }> {
    try {
      if (pQueryParams?.auth?.id) {
        requestBody.userId = pQueryParams.auth.id
      } else {
        this.setStatus(500) // set return status 201
        return { success: true, item: null, message: fxI18n.__('required_login') }
      }
      let products: IOrderProductCreationAttributes[] = []
      if (requestBody?.products) {
        products = requestBody?.products
        delete requestBody.products
        if (typeof products === 'string') {
          products = JSON.parse(products)
        }
        console.log('products :>> ', products);
      } else {
        this.setStatus(500) // set return status 201
        return { success: true, item: null, message: fxI18n.__('not_include_product') }
      }

      await this.orderService.validate(requestBody)
      const vItem: IOrderAttributes | null = await this.orderService.create(requestBody)
      if (products.length) {
        products.forEach((product) => {
          product.orderId = vItem.id
        })
        await this.orderService.bulkProductImages(products)
      }

      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{orderId}')
  public async update(
    @Path() orderId: string,
    @Body() requestBody: IOrderCreationAttributes
  ): Promise<{ success: boolean; item: IOrderAttributes | null; message?: string }> {
    try {
      await this.orderService.validate(requestBody)
      const vItem: IOrderAttributes | null = await this.orderService.update(requestBody, orderId)
      if (vItem) {
        this.setStatus(200) // set return status 200
        return { success: true, item: vItem }
      }
      this.setStatus(404) // set return status 404
      return { success: false, item: vItem, message: fxI18n.__('item_not_found') }
    } catch (error) {
      console.log('error :>> ', error)
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
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.orderService.softDeleteRecord(key)
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