import { modelSurveyUser } from '@db/index'
import { type FindOptions } from 'sequelize'
import type {
  ISurveyUserAttributes,
  ISurveyUserCreationAttributes,
  ISurveyUserFilter,
  IResponseAllSurveyUser,
  ISurveyUserUpdateAttributes,
  ISurveyUserInstance,
} from '@entities/surveyUsers/surveyUserModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'

class SurveyUserService {
  async validate(data: any) {
    const dataValidate = modelSurveyUser.build(data)
    await dataValidate.validate()
  }

  public async get(id: string): Promise<ISurveyUserAttributes | null> {
    try {
      const vResponse: ISurveyUserAttributes | null = await modelSurveyUser.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: ISurveyUserFilter): Promise<IResponseAllSurveyUser> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(pParam, whereStatement, 'name', modelSurveyUser.name)

      const vResponse: ISurveyUserAttributes[] = await modelSurveyUser.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllSurveyUser = await fxReponseServices(
          pParam,
          whereStatement,
          modelSurveyUser.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async create(
    surveyUserCreationParams: ISurveyUserCreationAttributes
  ): Promise<ISurveyUserAttributes> {
    try {
      // Crear la pregunta de la encuesta
      const vResponse: ISurveyUserAttributes =
        await modelSurveyUser.create(surveyUserCreationParams)

      return vResponse
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async update(
    id: string,
    surveyUserUpdateParams: ISurveyUserUpdateAttributes
  ): Promise<ISurveyUserInstance | null> {
    try {
      const vResponse: ISurveyUserInstance | null = await modelSurveyUser.findOne({
        where: {
          id: id,
        },
      })
      if (vResponse) {
        await vResponse.update(surveyUserUpdateParams)
      }
      return vResponse
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelSurveyUser.destroy({
        where: { id: pId },
      })
      if (!record) {
        return false
      }
      return true
    } catch (error) {
      throw error
    }
  }
}
export default new SurveyUserService()
