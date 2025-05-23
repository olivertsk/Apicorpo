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
  ISurveyResponseAttributes,
  ISurveyResponseCreationAttributes,
  ISurveyResponseFilter,
  ISurveyResponseCreation,
} from '@entities/surveyResponses/surveyResponseModel'
import SurveyResponseService from '@entities/surveyResponses/surveyResponseService'
import { fxI18n } from '@utils/i18n'
// import { IResponseAllSurvey } from '@entities/surveys/surveyModel';
import SurveyUserService from '@entities/surveyUsers/surveyUserService'
import {
  IResponseAllSurveyUser,
  ISurveyUserAttributes,
  ISurveyUserUpdateAttributes,
} from '@entities/surveyUsers/surveyUserModel'
import { IUserAttributes } from '@users/userModel'
// import { ITaskAttributes, ITaskCreationAttributes } from '@entities/tasks/taskModel';
// import TaskService from '@entities/tasks/taskService'

@Route('surveyResponses')
@Tags('SurveyResponse')
export class SurveyResponsesController extends Controller {
  private surveyResponseService: typeof SurveyResponseService
  private surveyUserService: typeof SurveyUserService
  // private taskService: typeof TaskService

  constructor() {
    super()
    this.surveyResponseService = SurveyResponseService
    this.surveyUserService = SurveyUserService
    // this.taskService = TaskService
  }

  @Security('bearerAuth', ['admin'])
  @Get('/show/{surveyResponseId}')
  public async get(
    @Path() surveyResponseId: string
  ): Promise<{ data: ISurveyUserAttributes | null; message?: string }> {
    try {
      const vResponse: ISurveyUserAttributes | null =
        await this.surveyResponseService.get(surveyResponseId)
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
   * @returns {Promise<{ data: ISurveyUserAttributes[] | IResponseAllSurveyUser, message?: string }>} - Promesa que resuelve con los datos paginados y un mensaje opcional.
   *
   */
  @Security('bearerAuth', ['admin'])
  @Get('/all')
  public async allUser(@Queries() pQueryParams: ISurveyResponseFilter): Promise<{
    data: ISurveyUserAttributes[] | IResponseAllSurveyUser
    message?: string
  }> {
    try {
      const vResponse: ISurveyUserAttributes[] | IResponseAllSurveyUser =
        await this.surveyResponseService.allSurveyUsers(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: ISurveyResponseCreationAttributes,
    @Request() request: { auth: IUserAttributes }
  ): Promise<{ success: boolean; message?: string; data?: ISurveyUserAttributes }> {
    try {
      const userId = request.auth.id

      const surveyUser: ISurveyUserAttributes = await this.surveyUserService.create({
        userId: userId,
        surveyId: requestBody.surveyId,
        surveyUrl: requestBody.surveyUrl,
        calendlyUri: requestBody.calendlyUri,
        date: requestBody.date,
      })
      const data: ISurveyResponseCreation[] = requestBody.responses.map((response) => ({
        userId,
        surveyId: response.surveyId,
        questionId: response.questionId,
        answerOptionId: response.answerOptionId,
        text: response.text,
        surveyUserId: surveyUser.id,
      }))
      const vItem: ISurveyResponseAttributes[] = await this.surveyResponseService.createMany(data)

      if (vItem) {
        this.setStatus(201) // set return status 201
        return { success: true, data: surveyUser }
      } else {
        this.setStatus(404) // set return status 404
        return { success: false, message: fxI18n.__('item_not_found') }
      }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/{surveyResponseId}')
  public async update(
    @Path() surveyResponseId: string,
    @Body() requestBody: ISurveyResponseAttributes
  ): Promise<{ success: boolean; item: ISurveyResponseAttributes | null; message?: string }> {
    try {
      await this.surveyResponseService.validate(requestBody)
      const vItem: ISurveyResponseAttributes | null = await this.surveyResponseService.update(
        requestBody,
        surveyResponseId
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

  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/updateUser/{surveyUserId}')
  public async updateUser(
    @Path() surveyUserId: string,
    @Body() requestBody: ISurveyUserUpdateAttributes
  ): Promise<{ success: boolean; item: ISurveyUserAttributes | null; message?: string }> {
    try {
      const vItem: ISurveyUserAttributes | null = await this.surveyUserService.update(
        surveyUserId,
        requestBody
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
   * @returns {Promise<{ success: boolean, message?: string }>}  - Resultado de la operacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.surveyResponseService.softDeleteRecord(key)
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
