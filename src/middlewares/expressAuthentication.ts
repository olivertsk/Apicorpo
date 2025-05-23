import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import AppConfig from '../config/AppConfig'
import { fxI18n } from '@utils/i18n'

export const expressAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const langHeader = req.headers.lang
  if (langHeader) {
    const userLang = langHeader.toString() || 'es'
    console.log('userLang :>> ', userLang)
    fxI18n.setLocale(userLang)
  } else {
    fxI18n.setLocale('es')
  }
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.includes(' ') ? authHeader.split(' ')[1] : authHeader
    try {
      if (token && token !== 'undefined' && token !== 'null') {
        const verifyJWT = await fxVerifyJWT(token)
        req.auth = verifyJWT
      }
      next()
    } catch (error) {
      res.sendStatus(403)
    }
  } else {
    next() // No autorizado si no hay encabezado de autorización
  }
}
const fxVerifyJWT = async (token: string) => {
  new Promise((resolve, reject) => {
    jwt.verify(token, AppConfig.JWT_SECRET_KEY, (err: any, user: any) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}
