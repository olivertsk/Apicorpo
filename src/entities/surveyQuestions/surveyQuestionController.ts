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
import {
  ISurveyQuestionAttributes,
  ISurveyQuestionCreationAttributes,
  IResponseAllSurveyQuestion,
  ISurveyQuestionFilter,
  ISurveyQuestionUpdateAttributes,
} from '@entities/surveyQuestions/surveyQuestionModel'
import SurveyQuestionService from '@entities/surveyQuestions/surveyQuestionService'
import { fxI18n } from '@utils/i18n'

@Route('surveyQuestions')
@Tags('SurveyQuestion')
export class SurveyQuestionsController extends Controller {
  private surveyQuestionService: typeof SurveyQuestionService

  constructor() {
    super()
    this.surveyQuestionService = SurveyQuestionService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{surveyQuestionId}')
  public async get(
    @Path() surveyQuestionId: string
  ): Promise<{ data: ISurveyQuestionAttributes | null; message?: string }> {
    try {
      const vResponse: ISurveyQuestionAttributes | null =
        await this.surveyQuestionService.get(surveyQuestionId)
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
   * @returns {Promise<{ data: ISurveyQuestionAttributes[] | IResponseAllSurveyQuestion, message?: string } >}  - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: ISurveyQuestionFilter): Promise<{
    data: ISurveyQuestionAttributes[] | IResponseAllSurveyQuestion
    message?: string
  }> {
    try {
      const vResponse: ISurveyQuestionAttributes[] | IResponseAllSurveyQuestion =
        await this.surveyQuestionService.all(pQueryParams)
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
    @Body() requestBody: ISurveyQuestionCreationAttributes
  ): Promise<{ success: boolean; item: ISurveyQuestionAttributes | null; message?: string }> {
    try {
      console.log('requestBody :>> ', requestBody)
      await this.surveyQuestionService.validate(requestBody)
      console.log('paso validacion')
      const vItem: ISurveyQuestionAttributes | null =
        await this.surveyQuestionService.create(requestBody)
      console.log('deberia crear')
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{surveyQuestionId}')
  public async update(
    @Path() surveyQuestionId: string,
    @Body() requestBody: ISurveyQuestionUpdateAttributes
  ): Promise<{ success: boolean; item: ISurveyQuestionAttributes | null; message?: string }> {
    try {
      await this.surveyQuestionService.validate(requestBody)
      const vItem: ISurveyQuestionAttributes | null = await this.surveyQuestionService.update(
        surveyQuestionId,
        requestBody
      )
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
   * @summary Eliminar una historia por ID.
   * @param {string} key - ID de la historia a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ success: boolean; message?: string }>} - Resultado de la operacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.surveyQuestionService.softDeleteRecord(key)
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
