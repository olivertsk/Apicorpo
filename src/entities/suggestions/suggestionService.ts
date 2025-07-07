import { modelSuggestion } from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import type {
  ISuggestionAttributes,
  ISuggestionCreationAttributes,
  ISuggestionFilter,
  ISuggestionInstance,
  IResponseAllSuggestion,
} from '@entities/suggestions/suggestionModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'

class SuggestionService {
  async validate(data: any) {
    const dataValidate = modelSuggestion.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<ISuggestionAttributes | null> {
    try {
      const vResponse: ISuggestionAttributes | null = await modelSuggestion.findOne({
        where: {
          id,
        },
      })
      return vResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: ISuggestionFilter): Promise<IResponseAllSuggestion> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(pParam, whereStatement, 'title', modelSuggestion.name)
      if (pParam.title) {
        whereStatement.where = {
          ...whereStatement.where,
          title: {
            [Op.like]: `%${pParam.title}%`,
          },
        }
      }
      const vResponse: ISuggestionAttributes[] = await modelSuggestion.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllSuggestion = await fxReponseServices(
          pParam,
          whereStatement,
          modelSuggestion.name,
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
    surveyAnswerCreationParams: ISuggestionCreationAttributes
  ): Promise<ISuggestionAttributes> {
    try {
      const vResponse: ISuggestionAttributes = await modelSuggestion.create(
        surveyAnswerCreationParams
      )
      return vResponse
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async update(
    surveyAnswerCreationParams: ISuggestionAttributes,
    id: string
  ): Promise<ISuggestionAttributes | null> {
    try {
      if (id) {
        const vResponse: ISuggestionInstance | null = await modelSuggestion.findOne({
          where: {
            id: id,
          },
        })
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
      const record = await modelSuggestion.update(
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
export default new SuggestionService()
