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
import {
  type IOrderAttributes,
  type IOrderCreationAttributes,
  type IResponseAllOrder,
  type IOrderFilter,
  EStatusOrder,
  type IGetUserParams,
} from '@entities/orders/orderModel'
import OrderService from '@entities/orders/orderService'
import { fxI18n } from '@utils/i18n'
import type { IUserAttributes } from '@users/userModel'
import type { IOrderProductCreationAttributes } from './orderProductModel'
import SendNotificationService from '@entities/notification/SendNotificationService'
import UserService from '@users/userService'
import { fxMoveImages } from '@utils/helpers'

@Route('orders')
@Tags('Order')
export class OrdersController extends Controller {
  private orderService: typeof OrderService
  private userService: typeof UserService

  constructor() {
    super()
    this.orderService = OrderService
    this.userService = UserService
  }

  @Security('bearerAuth', ['optional'])
  @Get('/show/{orderId}')
  public async get(
    @Path() orderId: string,
    @Request() request: { auth: IUserAttributes }
  ): Promise<{ data: IOrderAttributes | null; message?: string }> {
    try {
      if (!request?.auth?.id) {
        this.setStatus(500)
        return { data: null, message: 'Token invalido' }
      }
      const params: IGetUserParams = {
        orderId,
        isClient: true,
        userId: '',
      }
      const user = await this.userService.getRol(request.auth.id)
      const userJSON = JSON.parse(JSON.stringify(user))
      if (userJSON?.rol.name !== 'client') {
        params.isClient = false
        params.adminId = request.auth.id
      }
      params.userId = userJSON?.id
      const vResponse: IOrderAttributes | null = await this.orderService.get(params)
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
   * @param {IOrderFilter} pQueryParams - Número de página.
   * @returns {Promise<{ data: IOrderAttributes[] | IResponseAllOrder, message?: string }>} - Promesa que resuelve con los datos
   */
  @Security('bearerAuth', ['optional'])
  @Get('/all')
  public async all(
    @Queries() pQueryParams: IOrderFilter,
    @Request() request: { auth: IUserAttributes }
  ): Promise<{
    data: IOrderAttributes[] | IResponseAllOrder
    message?: string
  }> {
    try {
      if (!request?.auth?.id) {
        this.setStatus(500)
        return { data: [], message: 'Token invalido' }
      }
      if (pQueryParams?.isClient) {
        pQueryParams.userId = request?.auth?.id
      } else {
        const user = await this.userService.getRol(request.auth.id)
        const userJSON = JSON.parse(JSON.stringify(user))
        if (userJSON?.rol.name !== 'client') {
          pQueryParams.rolType = 'admin'
        } else {
          pQueryParams.userId = userJSON?.id
        }
      }
      const vResponse: IOrderAttributes[] | IResponseAllOrder =
        await this.orderService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      throw error
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
      } else {
        this.setStatus(500) // set return status 201
        return { success: true, item: null, message: fxI18n.__('not_include_product') }
      }
      if (!requestBody?.status) {
        requestBody.status = EStatusOrder.Pending
      }
      await this.orderService.validate(requestBody)
      if (requestBody.paymentVoucher) {
        requestBody.paymentVoucher = await fxMoveImages(requestBody.paymentVoucher)
      }
      const vItem: IOrderAttributes | null = await this.orderService.create(requestBody)
      const rol = await this.userService.showRolName('admin')
      if (rol) {
        const rolJSON = JSON.parse(JSON.stringify(rol))
        const users = rolJSON.users
        const notificationData = {
          title: 'Tienes una nueva order',
          body: 'Alguien realizo una compra',
          data: {
            url: `/admin/orders?orderId=${vItem.id}`,
          },
        }
        const tokens: string[] = users.map((user: any) => user.tokenPush)
        const usersId: string[] = users.map((user: any) => user.id)
        await SendNotificationService.sendNotification(tokens, notificationData, usersId)
      }
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
      throw error
    }
  }

  /**
   * @summary Actualizar el estado de una Orden
   * @param {string} orderId - ID de la orden.
   * @param { status: EStatusOrder; reason?: string | null; adminId?: string | null } body - Nuevo estatus de la orden.
   * @returns {Promise<{ status: boolean, item: IOrderAttributes | null, message?: string }>} - Promesa que resuelve con la actualizacion
   */
  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/updateStatus/{orderId}')
  public async updateStatus(
    @Path() orderId: string,
    @Body() body: { status: EStatusOrder; reason?: string | null; adminId?: string | null },
    @Request() request: { auth: IUserAttributes }
  ): Promise<{ success: boolean; item: IOrderAttributes | null; message?: string }> {
    try {
      body.adminId = request?.auth?.id || null
      const vItem: IOrderAttributes | null = await this.orderService.updateStatus(body, orderId)
      if (vItem) {
        const user = await this.userService.get(vItem.userId)
        if (user && user?.tokenPush) {
          const titleNotification =
            body.status === EStatusOrder.Approve
              ? 'Tu orden ha sido Aprobada'
              : 'Tu orden ha sido Rechazada'
          const notificationData = {
            title: titleNotification,
            body: body?.reason || '',
            data: {
              url: `/profile/orders?orderId=${vItem.id}`,
            },
          }
          // const tokens = users.map((user: any) => user.tokenPush)
          if (user.id) {
            await SendNotificationService.sendNotification([user.tokenPush], notificationData, [
              user.id,
            ])
          }
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
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ success: boolean, message?: string }>} - Promesa que resuelve con la eliminacion
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
