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
import { IPaymentMethodAttributes, IPaymentMethodCreationAttributes, IResponseAllPaymentMethod, IPaymentMethodFilter } from '@entities/paymentMethods/paymentMethodModel';
import PaymentMethodService from '@entities/paymentMethods/paymentMethodService';
import { fxI18n } from '@utils/i18n';
 
@Route('paymentMethods')
@Tags('PaymentMethod')
export class PaymentMethodsController extends Controller {
  private paymentMethodService: typeof PaymentMethodService

  constructor() {
    super()
    this.paymentMethodService = PaymentMethodService
  }

  @Get('/show/{paymentMethodId}')
  public async get(
    @Path() paymentMethodId: string,
  ): Promise<{ data: IPaymentMethodAttributes | null, message?: string }> {
    try {
      const vResponse: IPaymentMethodAttributes | null = await this.paymentMethodService.get(paymentMethodId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      console.error('Error en el controlador:', error);
      this.setStatus(500);
      return { data: null, message: 'Ocurrió un error' };
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {number} page - Número de página.
   * @param {number} count - Cantidad de datos por página.
   * @returns {Promise<{ data: { paymentMethods: IPaymentMethod[], message?: string }, status: boolean }>}
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IPaymentMethodFilter): Promise<{
    data: IPaymentMethodAttributes[] | IResponseAllPaymentMethod
    message?: string
  }> {
    try {
      const vResponse: IPaymentMethodAttributes[] | IResponseAllPaymentMethod = await this.paymentMethodService.all(pQueryParams)
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
    @Body() requestBody: IPaymentMethodCreationAttributes
  ): Promise<{ success: boolean, item: IPaymentMethodAttributes | null, message?: string }> {
    try {
      await this.paymentMethodService.validate(requestBody)
      const vItem: IPaymentMethodAttributes | null = await this.paymentMethodService.create(requestBody)
      this.setStatus(201); // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ["admin"])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{paymentMethodId}')
  public async update(
    @Path() paymentMethodId: string,
    @Body() requestBody: IPaymentMethodCreationAttributes
  ): Promise<{ success: boolean, item: IPaymentMethodAttributes | null, message?: string }> {
    try {
      await this.paymentMethodService.validate(requestBody)
      const vItem: IPaymentMethodAttributes | null = await this.paymentMethodService.update(requestBody, paymentMethodId)
      if (vItem) {
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
      const vResponse = await this.paymentMethodService.softDeleteRecord(key);
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