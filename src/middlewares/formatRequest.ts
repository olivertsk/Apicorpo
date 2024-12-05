import { Request, Response, NextFunction } from 'express';

export const formatRequest = async (req: Request, _res: Response, next: NextFunction) => {
  const query: any = req.query
  const body = req.body
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const element = query[key]
      if (element === 'null' || element === 'true' || element === 'false') {
        query[key] = JSON.parse(element)
      }
      if (element === 'undefined') {
        query[key] = undefined
      }
      if (element === '') {
        query[key] = undefined
      }
    }
  }
  req.query = query
  for (const key in body) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      const element = body[key]
      if (element === 'null' || element === 'true' || element === 'false') {
        body[key] = JSON.parse(element)
      }
      if (element === 'undefined') {
        body[key] = undefined
      }
      if (element === '') {
        body[key] = null
      }
    }
    body?.deletedAt && delete body.deletedAt
    body?.createdAt && delete body.createdAt
    body?.updatedAt && delete body.updatedAt
  }
  req.body = body
  next()
};