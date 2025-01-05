/* eslint-disable @typescript-eslint/no-unused-vars */
import AppConfig from '@config/AppConfig'
import { IUserAttributes } from '@users/userModel'
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
    console.log('authHeader :>> ', authHeader);
    console.log('scopes :>> ', scopes);
    if (authHeader) {
      console.log('viene por auth')
      const token = authHeader.includes(' ') ? authHeader.split(' ')[1] : authHeader
      try {
        const auth = jwt.verify(token, AppConfig.JWT_SECRET_KEY) as IUserAttributes
        let rolUser: any
        if (auth?.id) {
          rolUser = await userService.getRol(auth?.id)
          rolUser = JSON.parse(JSON.stringify(rolUser))
        }
        if (scopes && scopes?.includes('optional')) {
          console.log('paso por aca');
          request.auth = auth
          return { token, auth }
        }
        if (scopes && scopes.length > 0 && !scopes.includes(null)) {
          const userRoles = rolUser.rol.name || ''
          console.log('userRoles :>> ', userRoles);
          const hasRole = scopes.some((scope) => {
            if (scope === "admin") {
              return userRoles === 'admin'
            } else if (scope === "user" || scope === null) {
              return true
            } else if (scope === 'optional' || scope === null) {
              return true
            }
            return false
          })
          if (!hasRole) {
            throw {
              status: 403,
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
      } catch (err) {
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
        console.log('paso por aca');
        request.auth = null
        return { token: '', auth: null }
      }
    }
    if (!scopes) {
      return { token: '', auth: null }
    }
    console.log('no deberia llegar aca');
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
  console.log('no deberia llegar aca');
}
