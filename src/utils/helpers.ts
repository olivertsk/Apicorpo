import jwt, { type Secret } from 'jsonwebtoken'
import * as fs from 'fs'
import path from 'path'
// import imageThumbnail from 'image-thumbnail'
import AppConfig from '../config/AppConfig'
import type { IUserAttributes } from '@entities/users/userModel'

export const fxSuccessResponse = (
  code: number | null = null,
  data: any,
  message: string | null = null,
  status: boolean | null = true
) => {
  return {
    status: status,
    code: code || 200,
    data: data,
    message: message,
  }
}

export const fxErrorResponse = (code: number, data: any, message: string) => {
  return {
    status: false,
    code: code || 500,
    data: data,
    message: message,
  }
}

export const fxGenerateAccessToken = (user: IUserAttributes): string => {
  const payload = {
    id: user.id,
    email: user.email,
    rol: user.rolId,
    name: user.name,
  }
  const accessToken = jwt.sign(payload, AppConfig.JWT_SECRET_KEY as Secret)
  return accessToken
}

export const fxGenerateCode = () => {
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}

export const fxMoveImages = async (pName: string): Promise<string> => {
  if (pName && pName.includes('storage')) {
    return pName
  }
  if (pName && fs.existsSync(`uploads/${pName}`)) {
    const vNameImages: string = pName.replace('temp', 'storage')
    fs.renameSync(`uploads/${pName}`, `uploads/${vNameImages}`)
    // const options: any = { width: 200, responseType: 'buffer' }
    // try {
    //   const thumbnail = await imageThumbnail(`uploads/${vNameImages}`, options)
    //   const vThumbnailNameImages: string = pName.replace('temp', 'thumb')
    //   fs.writeFileSync(`uploads/${vThumbnailNameImages}`, thumbnail)
    // } catch (error) {
    //   return vNameImages
    // }
    return vNameImages
  } else {
    const vNameImages: string = pName.replace('temp', 'storage')
    if (fs.existsSync(`uploads/${vNameImages}`)) {
      return vNameImages
    }
    return pName
  }
}
export const fxDeleteImages = async (pName: string): Promise<boolean> => {
  const filePath = path.join('uploads', pName)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    return true
  } else {
    return false
  }
}
