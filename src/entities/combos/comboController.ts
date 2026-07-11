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
} from 'tsoa'
import type {
  IComboAttributes,
  IComboCreationAttributes,
  IResponseAllCombo,
  IComboFilter,
} from '@entities/combos/comboModel'
import CombosService from '@entities/combos/comboService'
import { fxI18n } from '@utils/i18n'
import { fxMoveImages } from '@utils/helpers'

@Route('combos')
@Tags('Combo')
export class CombosController extends Controller {
  private combosService: typeof CombosService

  constructor() {
    super()
    this.combosService = CombosService
  }

  /**
   * Obtener un combo por ID.
   */
  @Get('/show/{comboId}')
  public async get(
    @Path() comboId: string
  ): Promise<{ data: IComboAttributes | null; message?: string }> {
    try {
      const vResponse = await this.combosService.getByIdOrSlug(comboId, undefined)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * Obtener un combo por nombre (slug).
   */
  @Get('/show-by-name/{comboName}')
  public async getByName(
    @Path() comboName: string
  ): Promise<{ data: IComboAttributes | null; message?: string }> {
    try {
      // Reemplazar guiones por espacios para buscar por nombre
      let name = comboName
      // if (name.includes('-')) {
      //   name = name.replace(/-/g, ' ')
      // }
      const vResponse = await this.combosService.getByIdOrSlug(name, undefined)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  /**
   * Obtener todos los combos con paginación y filtros.
   * @param pQueryParams - Filtros (paginación, búsqueda, isClient, etc.)
   */
  @Security('bearerAuth', ['optional'])
  @Get('/all')
  public async all(
    @Queries() pQueryParams: IComboFilter
    // @Request() requestBody: { auth: IUserAttributes }
  ): Promise<{
    data: IComboAttributes[] | IResponseAllCombo
    message?: string
  }> {
    try {
      // const auth = requestBody?.auth
      // pQueryParams.userId = auth?.id || null
      // Si se requiere, podemos forzar isClient = true para usuarios no autenticados
      // pero lo dejamos como venga del query.
      const vResponse = await this.combosService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  /**
   * Crear un nuevo combo (solo administradores).
   */
  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created')
  @Post('/create')
  public async create(
    @Body() requestBody: IComboCreationAttributes
  ): Promise<{ success: boolean; item: IComboAttributes | null; message?: string }> {
    try {
      // Validar datos (si el servicio tiene validate)
      await this.combosService.validate(requestBody)
      // Si viene coverImage, mover la imagen a la carpeta correspondiente
      if (requestBody.coverImage) {
        requestBody.coverImage = await fxMoveImages(requestBody.coverImage)
      }
      const vItem = await this.combosService.create(requestBody)
      this.setStatus(201)
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  /**
   * Actualizar un combo existente (solo administradores).
   */
  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Updated')
  @Put('/update/{comboId}')
  public async update(
    @Path() comboId: string,
    @Body() requestBody: IComboCreationAttributes
  ): Promise<{ success: boolean; item: IComboAttributes | null; message?: string }> {
    try {
      await this.combosService.validate(requestBody)
      if (requestBody.coverImage) {
        requestBody.coverImage = await fxMoveImages(requestBody.coverImage)
      }
      const vItem = await this.combosService.update(comboId, requestBody)
      if (vItem) {
        this.setStatus(200)
        return { success: true, item: vItem }
      }
      this.setStatus(404)
      return { success: false, item: null, message: fxI18n.__('item_not_found') }
    } catch (error) {
      throw error
    }
  }

  /**
   * Eliminar (soft delete) un combo por ID (solo administradores).
   */
  @Security('bearerAuth', ['admin'])
  @Delete('/deleted/{key}')
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const vResponse = await this.combosService.softDelete(key)
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
