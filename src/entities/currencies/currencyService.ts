import { modelCurrency } from '@db/index'
import { Op, type FindOptions } from 'sequelize'
import type {
  ICurrencyAttributes,
  ICurrencyCreationAttributes,
} from '@entities/currencies/currencyModel'
import {
  fxMuiFilters,
  fxMuiSort,
  fxPaginate,
  fxReponseServices,
  fxSearchILike,
} from '../../utils/query'

class CurrenciesService {
  async validate(data: any) {
    const dataValidate = modelCurrency.build(data)
    await dataValidate.validate()
  }

  public async get(id: string): Promise<ICurrencyAttributes | null> {
    try {
      return await modelCurrency.findOne({ where: { id } })
    } catch (error) {
      throw error
    }
  }

  public async getCode(code: string): Promise<ICurrencyAttributes | null> {
    try {
      return await modelCurrency.findOne({
        where: {
          code: {
            [Op.like]: `%${code}%`,
          },
        },
      })
    } catch (error) {
      throw error
    }
  }

  public async all(pParam: any): Promise<any> {
    try {
      let whereStatement: FindOptions = {}
      whereStatement = fxPaginate(pParam, whereStatement)
      whereStatement = fxMuiFilters(pParam, whereStatement)
      whereStatement = fxMuiSort(pParam, whereStatement)
      whereStatement.where = fxSearchILike(
        pParam,
        whereStatement,
        pParam?.typeSearch || 'name',
        modelCurrency.name
      )

      // Filtro específico para saber cuáles son auto-gestionadas
      if (pParam?.autoUpdate !== undefined) {
        whereStatement.where = {
          ...whereStatement.where,
          autoUpdate: pParam.autoUpdate === 'true' || pParam.autoUpdate === true,
        }
      }

      const vResponse: ICurrencyAttributes[] = await modelCurrency.findAll(whereStatement)

      if (Number(pParam?.pag)) {
        return await fxReponseServices(pParam, whereStatement, modelCurrency.name, vResponse)
      }
      return { data: vResponse }
    } catch (error) {
      throw error
    }
  }

  public async create(data: ICurrencyCreationAttributes): Promise<ICurrencyAttributes> {
    try {
      return await modelCurrency.create(data)
    } catch (error) {
      throw error
    }
  }

  public async update(
    data: ICurrencyCreationAttributes,
    id: string
  ): Promise<ICurrencyAttributes | null> {
    try {
      const vItem = await modelCurrency.findOne({ where: { id } })
      if (!vItem) return null

      await vItem.update(data)
      return vItem
    } catch (error) {
      throw error
    }
  }

  async softDeleteRecord(id: string): Promise<boolean> {
    try {
      const result = await modelCurrency.destroy({ where: { id } }) // Si tienes paranoid: true, Sequelize hace el soft delete solo
      return !!result
    } catch (error) {
      throw error
    }
  }

  /**
   * Método especial para el Cron Job
   */
  async updateRateByCode(code: string, newRate: number): Promise<void> {
    try {
      await modelCurrency.update(
        { exchangeRate: newRate },
        {
          where: {
            code: code,
            autoUpdate: true, // Importante: solo si el cliente lo permite
          },
        }
      )
    } catch (error) {
      throw error
    }
  }
}

export default new CurrenciesService()
