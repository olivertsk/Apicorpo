import { bcvDolar } from 'bcv-divisas'
import { Controller, Get, Route, Tags } from 'tsoa'

@Route('exchange')
@Tags('Exchange')
export class ExchangeController extends Controller {
  @Get('bcv')
  public async getBcvRate(): Promise<any> {
    const data = await bcvDolar()
    console.log('data :>> ', data)
    // Retorna un objeto como { _dolar: 42.15, _euro: 45.20, ... }
    return data
  }
}
