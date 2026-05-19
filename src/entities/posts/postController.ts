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
  Request,
} from 'tsoa'
import type {
  IPostAttributes,
  IPostCreationAttributes,
  IResponseAllPost,
  IPostFilter,
} from '@entities/posts/postModel'
import PostService from '@entities/posts/postService'
import { fxI18n } from '@utils/i18n'
import { fxMoveImages } from '@utils/helpers'
import type { IUserAttributes } from '@users/userModel'

@Route('posts')
@Tags('Post')
export class PostsController extends Controller {
  private postService: typeof PostService

  constructor() {
    super()
    this.postService = PostService
  }

  @Get('/show/{postId}')
  public async get(
    @Path() postId: string
  ): Promise<{ data: IPostAttributes | null; message?: string }> {
    try {
      const vResponse: IPostAttributes | null = await this.postService.get(postId)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      console.error('Error en el controlador:', error)
      this.setStatus(500)
      return { data: null, message: 'Ocurrió un error' }
    }
  }

  @Get('/slug/{slug}')
  public async slug(
    @Path() slug: string
  ): Promise<{ data: IPostAttributes | null; message?: string }> {
    try {
      const vResponse: IPostAttributes | null = await this.postService.getBySlug(slug)
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
   * @param {IPostFilter} pQueryParams - Datos de filtrado.
   * @returns {Promise<{ data: IPostAttributes[] | IResponseAllPost, message?: string }>} - Promesa que resuelve con los datos
   */
  @Get('/all')
  public async all(@Queries() pQueryParams: IPostFilter): Promise<{
    data: IPostAttributes[] | IResponseAllPost
    message?: string
  }> {
    try {
      const vResponse: IPostAttributes[] | IResponseAllPost =
        await this.postService.all(pQueryParams)
      this.setStatus(200)
      return { data: vResponse }
    } catch (error) {
      console.log('error :>> ', error)
      this.setStatus(500)
      return { data: [], message: 'Ocurrió un error' }
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('201', 'Created')
  @Post('/create')
  public async create(
    @Body() requestBody: IPostCreationAttributes & { productIds?: string[] }, // Agregamos productIds
    @Request() req: { auth: IUserAttributes }
  ): Promise<{ success: boolean; item: IPostAttributes | null; message?: string }> {
    try {
      if (req?.auth?.id) {
        requestBody.authorId = req.auth.id
      }

      // 1. Validar el contenido base
      await this.postService.validate(requestBody)

      // 2. Manejo de imagen (tu lógica existente)
      if ('coverImage' in requestBody && requestBody.coverImage) {
        requestBody.coverImage = await fxMoveImages(requestBody.coverImage)
      }

      // 3. Llamada al servicio pasando los productos
      const vItem = await this.postService.createWithProducts(
        requestBody,
        requestBody.productIds || []
      )

      this.setStatus(201)
      return { success: true, item: vItem }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }

  @Security('bearerAuth', ['admin'])
  @SuccessResponse('200', 'Update')
  @Put('/update/{postId}')
  public async update(
    @Path() postId: string,
    @Body() requestBody: IPostCreationAttributes & { productIds?: string[] }
  ): Promise<{ success: boolean; item: IPostAttributes | null; message?: string }> {
    try {
      await this.postService.validate(requestBody)

      if (requestBody.coverImage) {
        requestBody.coverImage = await fxMoveImages(requestBody.coverImage)
      }

      // Pasamos el postId y los productos al servicio
      const vItem = await this.postService.updateWithProducts(
        postId,
        requestBody,
        requestBody.productIds || []
      )

      if (vItem) {
        this.setStatus(200)
        return { success: true, item: vItem }
      }

      this.setStatus(404)
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
      const vResponse = await this.postService.softDeleteRecord(key)
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
