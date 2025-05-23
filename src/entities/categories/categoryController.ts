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
import {
  ICategoryAttributes,
  ICategoryCreationAttributes,
  IResponseAllCategory,
  ICategoryFilter,
} from '@entities/categories/categoryModel'
import CategoryService from '@entities/categories/categoryService'
import { fxI18n } from '@utils/i18n'
import { fxMoveImages } from '@utils/helpers'

@Route('categories')
@Tags('Category')
export class CategoriesController extends Controller {
  private categoryService: typeof CategoryService

  constructor() {
    super()
    this.categoryService = CategoryService
  }

  @Get('/show/{categoryId}')
  public async get(
    @Path() categoryId: string
  ): Promise<{ data: ICategoryAttributes | null; message?: string }> {
    try {
      const vResponse: ICategoryAttributes | null = await this.categoryService.get(categoryId)
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
   * @param {ICategoryFilter} pQueryParams - Filtros.
   * @returns {Promise<{ data: ICategoryAttributes[] | IResponseAllCategory, message?: string }>} - Promesa que resuleve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: ICategoryFilter): Promise<{
    data: ICategoryAttributes[] | IResponseAllCategory
    message?: string
  }> {
    try {
      const vResponse: ICategoryAttributes[] | IResponseAllCategory =
        await this.categoryService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/create')
  public async create(
    @Body() requestBody: ICategoryCreationAttributes
  ): Promise<{ success: boolean; item: ICategoryAttributes | null; message?: string }> {
    try {
      await this.categoryService.validate(requestBody)
      if (requestBody.icon) {
        requestBody.icon = await fxMoveImages(requestBody.icon)
      }
      const vItem: ICategoryAttributes | null = await this.categoryService.create(requestBody)
      this.setStatus(201) // set return status 201
      return { success: true, item: vItem }
    } catch (error) {
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update') // Custom success response
  @Put('/update/{categoryId}')
  public async update(
    @Path() categoryId: string,
    @Body() requestBody: ICategoryCreationAttributes
  ): Promise<{ success: boolean; item: ICategoryAttributes | null; message?: string }> {
    try {
      await this.categoryService.validate(requestBody)
      if (requestBody.icon) {
        requestBody.icon = await fxMoveImages(requestBody.icon)
      }
      const vItem: ICategoryAttributes | null = await this.categoryService.update(
        requestBody,
        categoryId
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
   * @summary Eliminar una item por ID.
   * @param {string} key - ID de la item a eliminar.
   * @param pRequestBody - Solicitud HTTP con información de autenticación.
   * @returns {Promise<{ status: boolean, message?: string }>} - Promesa que resuelve con la eliminacion
   */
  @Delete('/deleted/{key}')
  @Security('bearerAuth', ['admin'])
  public async softDeleteRecord(
    @Path() key: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.setStatus(200) // set return success 201
      const vResponse = await this.categoryService.softDeleteRecord(key)
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
