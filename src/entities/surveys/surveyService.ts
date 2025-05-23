import {
  modelSurvey,
  modelSurveyAnswerOption,
  modelSurveyQuestion,
  modelSurveyResponse,
} from '@db/index'
import { type FindOptions } from 'sequelize'
import type {
  ISurveyAttributes,
  ISurveyCreationAttributes,
  ISurveyFilter,
  ISurveyInstance,
  IResponseAllSurvey,
} from '@entities/surveys/surveyModel'
import { fxOrderNameId, fxPaginate, fxReponseServices, fxSearchILike } from '@utils/query'

class SurveyService {
  async validate(data: any) {
    const dataValidate = modelSurvey.build(data)
    await dataValidate.validate()
  }
  public async get(id: string): Promise<ISurveyAttributes | null> {
    try {
      const vResponse: ISurveyAttributes | null = await modelSurvey.findOne({
        where: {
          id,
        },
        include: [
          {
            model: modelSurveyQuestion,
            as: 'questions',
            include: [
              {
                model: modelSurveyAnswerOption,
                as: 'answers',
                order: [['order', 'ASC']],
              },
            ],
            order: [['order', 'ASC']],
          },
        ],
        order: [
          [{ model: modelSurveyQuestion, as: 'questions' }, 'order', 'ASC'],
          // [{ model: modelSurveyAnswerOption, as: 'answers' }, 'order', 'ASC'],
        ],
      })
      const realResponse = JSON.parse(JSON.stringify(vResponse))
      if (realResponse && realResponse.question) {
        realResponse.questions.sort((a: any, b: any) => a.order.localeCompare(b.order))
      }

      if (realResponse && realResponse.questions) {
        // Ordenar preguntas por el atributo `order`
        realResponse.questions.sort((a: any, b: any) => a.order - b.order)

        // Ordenar respuestas de cada pregunta por el atributo `order`
        realResponse.questions.forEach((question: any) => {
          if (question.answers) {
            question.answers.sort((a: any, b: any) => a.order - b.order)
          }
        })
      }
      return realResponse
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: ISurveyFilter): Promise<IResponseAllSurvey> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement.order = fxOrderNameId(pParam, whereStatement)
      whereStatement.where = fxSearchILike(pParam, whereStatement, 'title', modelSurvey.name)
      if (pParam.order === 'date') {
        whereStatement.order = [['date', 'DESC']]
      }
      whereStatement.logging = true
      const vResponse: ISurveyAttributes[] = await modelSurvey.findAll(whereStatement)
      if (Number(pParam?.pag)) {
        const vResponsePaginate: IResponseAllSurvey = await fxReponseServices(
          pParam,
          whereStatement,
          modelSurvey.name,
          vResponse
        )
        return vResponsePaginate
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async leftSurvey(pParam: { type: string; userId: string }): Promise<IResponseAllSurvey> {
    try {
      const unansweredSurveys = await modelSurvey.findAll({
        where: { type: pParam.type },
        include: [
          {
            model: modelSurveyResponse,
            where: { userId: pParam.userId },
            required: false, // LEFT JOIN en lugar de INNER JOIN
          },
        ],
        having: {
          '$SurveyResponses.id$': null, // Filtra donde no hay respuestas
        },
      })

      return { data: unansweredSurveys }
    } catch (error) {
      console.error('Error fetching unanswered surveys:', error)
      throw error
    }
  }

  public async create(surveyCreationParams: ISurveyCreationAttributes): Promise<ISurveyAttributes> {
    try {
      const vResponse: ISurveyAttributes = await modelSurvey.create(surveyCreationParams)
      return vResponse
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  public async update(
    surveyCreationParams: ISurveyAttributes,
    id: string
  ): Promise<ISurveyAttributes | null> {
    try {
      if (id) {
        const vResponse: ISurveyInstance | null = await modelSurvey.findOne({
          where: {
            id: id,
          },
        })
        if (vResponse === null) {
          return null
        }
        await vResponse.update(surveyCreationParams)
        return vResponse
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(pId: string): Promise<boolean> {
    try {
      const record = await modelSurvey.update(
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
export default new SurveyService()
