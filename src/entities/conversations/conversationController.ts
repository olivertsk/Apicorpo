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
  // Request,
} from 'tsoa'
import { Request } from '@tsoa/runtime'
import {
  type IConversationAttributes,
  type IConversationCreationAttributes,
  type IResponseAllConversation,
  type IConversationFilter,
  EConversationStatus,
} from '@entities/conversations/conversationModel'
import ConversationService from '@entities/conversations/conversationService'
import { fxI18n } from '@utils/i18n'
import { type IUserAttributes } from '@users/userModel'

@Route('conversations')
@Tags('Conversation')
export class ConversationsController extends Controller {
  private conversationService: typeof ConversationService

  constructor() {
    super()
    this.conversationService = ConversationService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{conversationId}')
  public async get(
    @Path() conversationId: string,
    @Request() request: { auth: IUserAttributes }
  ): Promise<{ data: IConversationAttributes | null; message?: string }> {
    try {
      const vResponse: IConversationAttributes | null = await this.conversationService.get(
        conversationId,
        request.auth.id
      )
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
   * @param {IConversationFilter} pQueryParams - Filtros.
   * @returns {Promise<{ data: IConversationAttributes[] | IResponseAllConversation, message?: string }>} - Promesa que resuleve con los datos
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: IConversationFilter): Promise<{
    data: IConversationAttributes[] | IResponseAllConversation
    message?: string
  }> {
    try {
      const vResponse: IConversationAttributes[] | IResponseAllConversation =
        await this.conversationService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['optional'])
  @SuccessResponse('201', 'Created')
  @Post('/create')
  public async create(
    @Request() request: Express.Request,
    @Body() requestBody: IConversationCreationAttributes
  ) {
    try {
      if (!requestBody.messages?.length) {
        this.setStatus(400)
        return { success: false, message: 'At least one message is required' }
      }

      const context = this.buildContext(request)
      const authUserId = request?.auth?.id

      const result = await this.conversationService.createWithMessages({
        conversation: {
          userId: authUserId || requestBody.userId || null,
          status: EConversationStatus.PENDING_REVIEW,
          context: {
            system: context,
            ...(typeof requestBody.context === 'object' ? requestBody.context : {}),
          },
        },
        messages: requestBody.messages,
      })

      this.setStatus(201)
      return {
        success: true,
        item: result,
        message: 'Conversation created successfully',
      }
    } catch (error) {
      this.setStatus(500)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private buildContext(request: Express.Request) {
    return {
      device: this.getDeviceInfo(request),
      location: this.getLocationInfo(request),
      ip: this.getClientIP(request),
      userAgent: request.headers['user-agent'],
      referrer: request.headers['referer'],
      timestamp: new Date().toISOString(),
    }
  }
  // Helpers dentro del controlador:
  private getDeviceInfo(req: Express.Request): object {
    return {
      type: req.device?.type || 'desktop', // Si usas express-device
      browser: req.useragent?.browser,
      os: req.useragent?.os,
      platform: req.useragent?.platform,
    }
  }

  private getClientIP(req: Express.Request): string {
    return req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress
  }

  private getLocationInfo(req: Express.Request): object | null {
    // Requiere middleware previo como geoip-lite
    try {
      return (
        req.geo || {
          country: req.headers['cf-ipcountry'], // Cloudflare
        }
      )
    } catch {
      return null
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{conversationId}')
  public async update(
    @Path() conversationId: string,
    @Body() requestBody: IConversationCreationAttributes
  ): Promise<{ success: boolean; item: IConversationAttributes | null; message?: string }> {
    try {
      await this.conversationService.validate(requestBody)
      const vItem: IConversationAttributes | null = await this.conversationService.update(
        requestBody,
        conversationId
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
   * @returns {Promise<{ status: boolean, message?: string }>} - Promesa que resuelve con la eliminacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.conversationService.softDeleteRecord(key)
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
