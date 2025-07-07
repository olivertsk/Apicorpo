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
  ISuggestionAttributes,
  ISuggestionCreationAttributes,
  IResponseAllSuggestion,
  ISuggestionFilter,
} from '@entities/suggestions/suggestionModel'
import SuggestionService from '@entities/suggestions/suggestionService'
import { fxI18n } from '@utils/i18n'
import type { IUserAttributes } from '@users/userModel'

@Route('suggestions')
@Tags('Suggestion')
export class SuggestionsController extends Controller {
  private suggestionService: typeof SuggestionService

  constructor() {
    super()
    this.suggestionService = SuggestionService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{suggestionId}')
  public async get(
    @Path() suggestionId: string
  ): Promise<{ data: ISuggestionAttributes | null; message?: string }> {
    try {
      const vResponse: ISuggestionAttributes | null = await this.suggestionService.get(suggestionId)
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
   * @returns {Promise<{ data: ISuggestionAttributes[] | IResponseAllSuggestion, message?: string } >}  - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: ISuggestionFilter): Promise<{
    data: ISuggestionAttributes[] | IResponseAllSuggestion
    message?: string
  }> {
    try {
      const vResponse: ISuggestionAttributes[] | IResponseAllSuggestion =
        await this.suggestionService.all(pQueryParams)
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
    @Body() requestBody: ISuggestionCreationAttributes,
    @Request() request: { auth: IUserAttributes }
  ): Promise<{ success: boolean; item: ISuggestionAttributes | null; message?: string }> {
    try {
      await this.suggestionService.validate(requestBody)
      if (request.auth?.id) {
        requestBody.userId = request.auth.id // Set userId from auth token
      }
      const vItem: ISuggestionAttributes | null = await this.suggestionService.create(requestBody)
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{suggestionId}')
  public async update(
    @Path() suggestionId: string,
    @Body() requestBody: ISuggestionAttributes
  ): Promise<{ success: boolean; item: ISuggestionAttributes | null; message?: string }> {
    try {
      await this.suggestionService.validate(requestBody)
      const vItem: ISuggestionAttributes | null = await this.suggestionService.update(
        requestBody,
        suggestionId
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
   * @summary Eliminar una historia por ID.
   * @param {string} key - ID de la historia a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ success: boolean, message?: string }>} - Resultado de la operacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.suggestionService.softDeleteRecord(key)
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
