import { modelSurveyAnswerOption } from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import type {
  ISurveyAnswerOptionAttributes,
  ISurveyAnswerOptionCreationAttributes,
  ISurveyAnswerOptionFilter,
  ISurveyAnswerOptionInstance,
  IResponseAllSurveyAnswerOption,
} from '@entities/surveyAnswerOptions/surveyAnswerOptionModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'

class SurveyAnswerOptionService {
  async validate(data: any) {
    const dataValidate = modelSurveyAnswerOption.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<ISurveyAnswerOptionAttributes | null> {
    try {
      const vResponse: ISurveyAnswerOptionAttributes | null = await modelSurveyAnswerOption.findOne(
        {
          where: {
            id,
          },
        }
      )
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: ISurveyAnswerOptionFilter): Promise<IResponseAllSurveyAnswerOption> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        'text',
        modelSurveyAnswerOption.name
      )
      if (pParam.title) {
        whereStatement.where = {
          ...whereStatement.where,
          text: {
            [Op.like]: `%${pParam.title}%`,
          },
        }
      }
      if (pParam.order === 'date') {
        whereStatement.order = [['date', 'DESC']]
      }
      const vResponse: ISurveyAnswerOptionAttributes[] =
        await modelSurveyAnswerOption.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllSurveyAnswerOption = await fxReponseServices(
          pParam,
          whereStatement,
          modelSurveyAnswerOption.name,
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
    surveyAnswerCreationParams: ISurveyAnswerOptionCreationAttributes
  ): Promise<ISurveyAnswerOptionAttributes> {
    try {
      const vResponse: ISurveyAnswerOptionAttributes = await modelSurveyAnswerOption.create(
        surveyAnswerCreationParams
      )
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async update(
    surveyAnswerCreationParams: ISurveyAnswerOptionAttributes,
    id: string
  ): Promise<ISurveyAnswerOptionAttributes | null> {
    try {
      if (id) {
        const vResponse: ISurveyAnswerOptionInstance | null = await modelSurveyAnswerOption.findOne(
          {
            where: {
              id: id,
            },
          }
        )
        if (vResponse === null) {
          return null
        }
        await vResponse.update(surveyAnswerCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelSurveyAnswerOption.update(
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
export default new SurveyAnswerOptionService()
