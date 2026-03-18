import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  Tags,
  Queries,
  Security,
  Delete,
  Put,
} from 'tsoa'
import type {
  ICurrencyAttributes,
  ICurrencyCreationAttributes,
  ICurrencyFilter,
} from '@entities/currencies/currencyModel'
import CurrencyService from '@entities/currencies/currencyService'
import { fxI18n } from '@utils/i18n'

@Route('currencies')
@Tags('Currency')
export class CurrenciesController extends Controller {
  private currencyService: typeof CurrencyService

  constructor() {
    super()
    this.currencyService = CurrencyService
  }

  @Get('/show/{id}')
  public async get(@Path() id: string): Promise<{ data: ICurrencyAttributes | null }> {
    const vResponse = await this.currencyService.get(id)
    return { data: vResponse }
  }

  @Get('/show-code/{code}')
  public async getOfCode(@Path() code: string): Promise<{ data: ICurrencyAttributes | null }> {
    const vResponse = await this.currencyService.getCode(code)
    return { data: vResponse }
  }

  @Get('/all')
  public async all(@Queries() pQueryParams: ICurrencyFilter): Promise<{ data: any }> {
    const vResponse = await this.currencyService.all(pQueryParams)
    return { data: vResponse }
  }

  @Security('bearerAuth', ['admin'])
  @Post('/create')
  public async create(
    @Body() requestBody: ICurrencyCreationAttributes
  ): Promise<{ success: boolean; item: ICurrencyAttributes | null }> {
    try {
      console.log('requestBody :>> ', requestBody)
      await this.currencyService.validate(requestBody)
      const vItem = await this.currencyService.create(requestBody)
      this.setStatus(201)
      return { success: true, item: vItem }
    } catch (error) {
      console.log('error :>> ', error)
      return { success: false, item: null }
    }
  }

  @Security('bearerAuth', ['admin'])
  @Put('/update/{id}')
  public async update(
    @Path() id: string,
    @Body() requestBody: ICurrencyCreationAttributes
  ): Promise<{ success: boolean; item: ICurrencyAttributes | null; message?: string }> {
    const vItem = await this.currencyService.update(requestBody, id)
    if (vItem) {
      return { success: true, item: vItem }
    }
    this.setStatus(404)
    return { success: false, item: null, message: fxI18n.__('item_not_found') }
  }

  @Delete('/deleted/{id}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(@Path() id: string): Promise<{ success: boolean }> {
    const vResponse = await this.currencyService.softDeleteRecord(id)
    return { success: vResponse }
  }
}
