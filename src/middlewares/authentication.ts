/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppConfig from '@config/AppConfig'
import type { IUserAttributes } from '@users/userModel'
import type { Request } from 'express'
import jwt from 'jsonwebtoken'
import userService from '@users/userService'

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: (string | null)[]
): Promise<{
  token?: string | null
  auth?: IUserAttributes | null
}> {
  if (securityName === 'bearerAuth') {
    const authHeader = request?.headers?.authorization
    if (authHeader) {
      const token = authHeader.includes(' ') ? authHeader.split(' ')[1] : authHeader
      try {
        const auth = jwt.verify(token, AppConfig.JWT_SECRET_KEY) as IUserAttributes
        let rolUser: any
        if (auth?.id) {
          rolUser = await userService.getRol(auth?.id)
          rolUser = JSON.parse(JSON.stringify(rolUser))
        }
        if (scopes && scopes?.includes('optional')) {
          request.auth = auth
          return { token, auth }
        }
        if (rolUser?.rol?.name === 'admin') {
          request.auth = auth
          return { token, auth }
        }
        if (scopes && scopes.length > 0 && !scopes.includes(null)) {
          const requestedPath = request.path // Ej: "/api/users"
          const hasPermission = rolUser?.rol?.permissions?.some((permission: any) => {
            // 1. Dividir la URL del permiso en segmentos (ej: "/prospects/users/groups" → ["prospects", "users", "groups"])
            const permissionSegments = permission.view.url.split('/').filter(Boolean) // Elimina strings vacíos

            // 2. Extraer el primer segmento de la ruta solicitada (ej: "/prospects/all" → "prospects")
            const requestedSegment = requestedPath.split('/')[1] // [ "", "prospects", "all" ] → "prospects"

            // 3. Verificar si el segmento de la ruta está en los permitidos
            const pathMatches = permissionSegments.includes(requestedSegment)
            let methodAllowed = false
            switch (request.method) {
              case 'GET':
                methodAllowed = true
                break
              case 'POST':
                methodAllowed = permission.post
                break
              case 'PUT':
                methodAllowed = permission.put
                break
              case 'DELETE':
                methodAllowed = permission.delete
                break
              default:
                methodAllowed = false
            }

            return pathMatches && methodAllowed
          })
          if (!hasPermission) {
            console.log('detecta hasPermission en false y lanza 419')
            throw {
              status: 419,
              message: 'Forbidden',
              token: null,
              user: null,
              auth: null,
              stack: '',
            }
          }
        }
        request.auth = auth
        return { token, auth }
      } catch (error: any) {
        if ('status' in error && error?.status === 419) {
          throw error
        }
        throw {
          status: 401,
          message: 'Invalid token',
          token: null,
          user: null,
          auth: null,
          stack: '',
        }
        // throw new Error('Token inválido o expirado');
      }
    } else {
      if (scopes && scopes?.includes('optional')) {
        console.log('paso por aca')
        request.auth = null
        return { token: '', auth: null }
      }
    }
    if (!scopes) {
      return { token: '', auth: null }
    }
    console.log('no deberia llegar aca')
    throw {
      status: 401,
      message: 'Invalid token',
      token: null,
      user: null,
      auth: null,
      stack: '',
    }
  } else {
    throw {
      status: 401,
      message: 'Invalid token',
      token: null,
      user: null,
      auth: null,
      stack: '',
    }
  }
  console.log('no deberia llegar aca')
}
