import type { Request, Response, NextFunction } from 'express'
import geoip from 'geoip-lite'

interface GeoLookup {
  range?: [number, number]
  country?: string
  region?: string
  city?: string
  ll?: [number, number]
  metro?: number
  area?: number
  timezone?: string
}

export function contextMiddleware(req: Request, _res: Response, next: NextFunction): void {
  // Manejo seguro de IP
  const ip = (() => {
    if (typeof req.ip === 'string') return req.ip
    if (Array.isArray(req.headers['x-forwarded-for'])) {
      return req.headers['x-forwarded-for'][0]
    }
    if (typeof req.headers['x-forwarded-for'] === 'string') {
      return req.headers['x-forwarded-for']
    }
    return req.connection?.remoteAddress || ''
  })()

  // GeoIP con validación de tipo
  const geo: GeoLookup | null = (() => {
    try {
      return ip && typeof ip === 'string' ? geoip.lookup(ip) : null
    } catch {
      return null
    }
  })()
  let location = null
  if (geo) {
    location = {
      country: geo.country,
      region: geo.region,
      city: geo.city,
      timezone: geo.timezone,
    }
  }
  // Contexto tipado
  req.context = {
    device: {
      type: req.device?.type || 'desktop',
      browser: req.useragent?.browser,
      os: req.useragent?.os,
      ...(req.device || {}),
    },
    network: {
      ip,
      ...(req.headers['x-network-isp'] && { isp: req.headers['x-network-isp'] }),
    },
    location: location,
    session: {
      startedAt: new Date().toISOString(),
      referrer: req.headers.referer,
      ...(req.query.utm_source && {
        utm: {
          source: String(req.query.utm_source),
          medium: req.query.utm_medium ? String(req.query.utm_medium) : undefined,
          campaign: req.query.utm_campaign ? String(req.query.utm_campaign) : undefined,
        },
      }),
    },
  }

  next()
}
