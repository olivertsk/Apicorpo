import { modelSurveyQuestion } from '@db/index'
import { type FindOptions } from 'sequelize'
import type {
  ISurveyQuestionAttributes,
  ISurveyQuestionCreationAttributes,
  ISurveyQuestionFilter,
  IResponseAllSurveyQuestion,
  ISurveyQuestionUpdateAttributes,
  ISurveyQuestionInstance,
} from '@entities/surveyQuestions/surveyQuestionModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'

class SurveyQuestionService {
  async validate(data: any) {
    const dataValidate = modelSurveyQuestion.build(data)
    await dataValidate.validate()
  }

  public async get(id: string): Promise<ISurveyQuestionAttributes | null> {
    try {
      const vResponse: ISurveyQuestionAttributes | null = await modelSurveyQuestion.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: ISurveyQuestionFilter): Promise<IResponseAllSurveyQuestion> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(pParam, whereStatement, 'text', modelSurveyQuestion.name)
      if (pParam.type) {
        whereStatement.where = {
          ...whereStatement.where,
          type: pParam.type,
        }
      }
      const vResponse: ISurveyQuestionAttributes[] =
        await modelSurveyQuestion.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllSurveyQuestion = await fxReponseServices(
          pParam,
          whereStatement,
          modelSurveyQuestion.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(
    surveyQuestionCreationParams: ISurveyQuestionCreationAttributes
  ): Promise<ISurveyQuestionAttributes> {
    try {
      // Crear la pregunta de la encuesta
      const vResponse: ISurveyQuestionAttributes = await modelSurveyQuestion.create(
        surveyQuestionCreationParams
      )

      return vResponse
    } catch (error) {
      throw error
    }
  }

  // public async update(
  //   surveyQuestionCreationParams: ISurveyQuestionAttributes,
  //   id: string
  // ): Promise<ISurveyQuestionAttributes | null> {
  //   try {
  //     if (id) {
  //       const vResponse: ISurveyQuestionInstance | null = await modelSurveyQuestion.findOne({
  //         where: {
  //           id: id,
  //         },
  //       })
  //       if (vResponse === null) {
  //         return null
  //       }
  //       await vResponse.update(surveyQuestionCreationParams)
  //       return vResponse
  //     }
  //     return null
  //   } catch (error) {
  //     throw error
  //   }
  // }

  public async update(
    id: string,
    surveyQuestionUpdateParams: ISurveyQuestionUpdateAttributes
  ): Promise<ISurveyQuestionInstance | null> {
    try {
      // Actualizar la pregunta de la encuesta
      const vResponse: ISurveyQuestionInstance | null = await modelSurveyQuestion.findOne({
        where: {
          id: id,
        },
      })
      if (vResponse) {
        await vResponse.update(surveyQuestionUpdateParams)
      }
      return vResponse
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelSurveyQuestion.update(
        { deletedAt: new Date() },
        {
          where: { id: pId },
        }
      )
      if (!record) {
        return false
      }
      return true
    } catch (error) {
      throw error
    }
  }
}
export default new SurveyQuestionService()
