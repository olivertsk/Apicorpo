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
} from 'tsoa'
import type {
  IChatQuestionAttributes,
  IChatQuestionCreationAttributes,
  IResponseAllChatQuestion,
  IChatQuestionFilter,
  IChatShowClientFilter,
} from '@entities/chat/chatQuestionModel'
import ChatQuestionService from '@entities/chat/chatQuestionService'
import { fxI18n } from '@utils/i18n'

@Route('chatQuestions')
@Tags('ChatQuestion')
export class ChatQuestionsController extends Controller {
  private chatQuestionService: typeof ChatQuestionService

  constructor() {
    super()
    this.chatQuestionService = ChatQuestionService
  }

  @Get('/show')
  public async get(): Promise<{ data: IChatQuestionAttributes | null; message?: string }> {
    try {
      const vResponse: IChatQuestionAttributes | null = await this.chatQuestionService.get()
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      console.error('Error en el controlador:', error)
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  @Get('/client')
  public async client(
    @Queries() pQueryParams: IChatShowClientFilter
  ): Promise<{ data: IChatQuestionAttributes | null; message?: string }> {
    try {
      const vResponse: IChatQuestionAttributes | null =
        await this.chatQuestionService.client(pQueryParams)
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
   * @param {IChatQuestionFilter} pQueryParams - Datos de filtrado.
   * @returns {Promise<{ data: IChatQuestionAttributes[] | IResponseAllChatQuestion, message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IChatQuestionFilter): Promise<{
    data: IChatQuestionAttributes[] | IResponseAllChatQuestion
    message?: string
  }> {
    try {
      const vResponse: IChatQuestionAttributes[] | IResponseAllChatQuestion =
        await this.chatQuestionService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  // @Security('bearerAuth', ['admin'])
  // @SuccessResponse('201', 'Created') // Custom success response
  // @Post('/create')
  // public async create(
  //   @Body() requestBody: IChatQuestionCreationAttributes
  // ): Promise<{ success: boolean; item: IChatQuestionAttributes | null; message?: string }> {
  //   try {
  //     await this.chatQuestionService.validate(requestBody)
  //     const vItem: IChatQuestionAttributes | null =
  //       await this.chatQuestionService.create(requestBody)
  //     this.setStatus(201) // set return status 201
  //     return { success: true, item: vItem }
  //   } catch (error) {
  //     throw error
  //   }
  // }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created')
  @Post('/create')
  public async create(
    @Body() requestBody: { chatQuestions: IChatQuestionCreationAttributes[] }
  ): Promise<{ success: boolean; items: IChatQuestionAttributes[]; message?: string }> {
    try {
      const createdItems = []
      for (const question of requestBody.chatQuestions) {
        if (question?.name) {
          await this.chatQuestionService.validate(question)
          const createdItem = await this.chatQuestionService.create(question)
          createdItems.push(createdItem)
        }
      }
      this.setStatus(201)
      return { success: true, items: createdItems }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{chatQuestionId}')
  public async update(
    @Body() requestBody: { chatQuestions: IChatQuestionCreationAttributes[] }
  ): Promise<{ success: boolean; items: IChatQuestionAttributes[]; message?: string }> {
    try {
      await this.chatQuestionService.softAllDeleteRecord()
      const createdItems = []
      for (const question of requestBody.chatQuestions) {
        if (question?.name) {
          await this.chatQuestionService.validate(question)
          const createdItem = await this.chatQuestionService.create(question)
          createdItems.push(createdItem)
        }
      }
      this.setStatus(201)
      return { success: true, items: createdItems }
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
      const vResponse = await this.chatQuestionService.softDeleteRecord(key)
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
