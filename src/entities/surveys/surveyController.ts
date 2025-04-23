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
  Request
} from 'tsoa';
import { ISurveyAttributes, ISurveyCreationAttributes, IResponseAllSurvey, ISurveyFilter } from '@entities/surveys/surveyModel';
import SurveyService from '@entities/surveys/surveyService';
import { fxI18n } from '@utils/i18n';
import { IUserAttributes } from '@users/userModel';
 
@Route('surveys')
@Tags('Survey')
export class SurveysController extends Controller {
  private surveyService: typeof SurveyService

  constructor() {
    super()
    this.surveyService = SurveyService
  }

  @Get('/show/{surveyId}')
  public async get(
    @Path() surveyId: string
  ): Promise<{ data: ISurveyAttributes | null; message?: string }> {
    try {
      const vResponse: ISurveyAttributes | null = await this.surveyService.get(surveyId)
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
   * @returns {Promise<{ data: ISurveyAttributes[] | IResponseAllSurvey, message?: string }>} - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async all(@Queries() pQueryParams: ISurveyFilter): Promise<{
    data: ISurveyAttributes[] | IResponseAllSurvey
    message?: string
  }> {
    try {
      const vResponse: ISurveyAttributes[] | IResponseAllSurvey =
        await this.surveyService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  /**
   * @summary Obtener todos los datos con paginación.
   * @param {number} page - Número de página.
   * @param {number} count - Cantidad de datos por página.
   * @returns {Promise<{ data: ISurveyAttributes[] | IResponseAllSurvey, message?: string }>} - Promesa que resuelve con los datos paginados y un mensaje opcional.
   */
  @Security('bearerAuth', [])
  @Get('/leftSurvey')
  public async leftSurvey(
    @Queries() pQueryParams: {
      type: string
      userId?: string
    },
    @Request() request: { auth: IUserAttributes }
  ): Promise<{
    data: ISurveyAttributes[] | IResponseAllSurvey
    message?: string
  }> {
    console.log('request?.auth :>> ', request?.auth)
    try {
      if (request.auth.id) {
        const parameter = {
          userId: request.auth.id,
          type: pQueryParams.type
        }
        const vResponse: ISurveyAttributes[] | IResponseAllSurvey =
          await this.surveyService.leftSurvey(parameter)
        this.setStatus(200)
        return { data: vResponse }
      } else {
        this.setStatus(500)
        return { data: [] }
      }

    } catch (error) {
      console.log('error :>> ', error);
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: ISurveyCreationAttributes
  ): Promise<{ success: boolean; item: ISurveyAttributes | null; message?: string }> {
    try {
      await this.surveyService.validate(requestBody)
      const vItem: ISurveyAttributes | null = await this.surveyService.create(requestBody)
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{surveyId}')
  public async update(
    @Path() surveyId: string,
    @Body() requestBody: ISurveyAttributes
  ): Promise<{ success: boolean; item: ISurveyAttributes | null; message?: string }> {
    try {
      console.log('requestBody :>> ', requestBody)

      await this.surveyService.validate(requestBody)
      const vItem: ISurveyAttributes | null = await this.surveyService.update(requestBody, surveyId)
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
   * @returns {Promise<{ status: boolean, message?: string }>}  - Resultado de la operacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.surveyService.softDeleteRecord(key)
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