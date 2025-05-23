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
  ISurveyAnswerOptionAttributes,
  ISurveyAnswerOptionCreationAttributes,
  IResponseAllSurveyAnswerOption,
  ISurveyAnswerOptionFilter,
} from '@entities/surveyAnswerOptions/surveyAnswerOptionModel'
import SurveyAnswerOptionService from '@entities/surveyAnswerOptions/surveyAnswerOptionService'
import { fxI18n } from '@utils/i18n'

@Route('surveyAnswerOptions')
@Tags('SurveyAnswerOption')
export class SurveyAnswerOptionsController extends Controller {
  private surveyAnswerOptionService: typeof SurveyAnswerOptionService

  constructor() {
    super()
    this.surveyAnswerOptionService = SurveyAnswerOptionService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{surveyAnswerOptionId}')
  public async get(
    @Path() surveyAnswerOptionId: string
  ): Promise<{ data: ISurveyAnswerOptionAttributes | null; message?: string }> {
    try {
      const vResponse: ISurveyAnswerOptionAttributes | null =
        await this.surveyAnswerOptionService.get(surveyAnswerOptionId)
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
   * @returns {Promise<{ data: ISurveyAnswerOptionAttributes[] | IResponseAllSurveyAnswerOption, message?: string } >}  - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: ISurveyAnswerOptionFilter): Promise<{
    data: ISurveyAnswerOptionAttributes[] | IResponseAllSurveyAnswerOption
    message?: string
  }> {
    try {
      const vResponse: ISurveyAnswerOptionAttributes[] | IResponseAllSurveyAnswerOption =
        await this.surveyAnswerOptionService.all(pQueryParams)
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
    @Body() requestBody: ISurveyAnswerOptionCreationAttributes
  ): Promise<{ success: boolean; item: ISurveyAnswerOptionAttributes | null; message?: string }> {
    try {
      console.log('requestBody :>> ', requestBody)
      await this.surveyAnswerOptionService.validate(requestBody)
      console.log('paso validacion')
      const vItem: ISurveyAnswerOptionAttributes | null =
        await this.surveyAnswerOptionService.create(requestBody)
      console.log('deberia crear')
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{surveyAnswerOptionId}')
  public async update(
    @Path() surveyAnswerOptionId: string,
    @Body() requestBody: ISurveyAnswerOptionAttributes
  ): Promise<{ success: boolean; item: ISurveyAnswerOptionAttributes | null; message?: string }> {
    try {
      await this.surveyAnswerOptionService.validate(requestBody)
      const vItem: ISurveyAnswerOptionAttributes | null =
        await this.surveyAnswerOptionService.update(requestBody, surveyAnswerOptionId)
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
      const vResponse = await this.surveyAnswerOptionService.softDeleteRecord(key)
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
