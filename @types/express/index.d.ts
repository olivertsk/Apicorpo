declare namespace Express {
  export interface Request {
    auth: IUserDecoded | false
    device: any
    useragent?: {
      browser?: string
      os?: string
      platform?: string
      [key: string]: any
    }
    ip: string
    connection: {
      remoteAddress: string
      [key: string]: any
    }
    geo?: any | null
    context?: {
      device?: object
      network?: object
      location?: object | null
      session?: object
    }
    headers?: any
  }
}

declare module 'express-device' {
  interface Device {
    type: 'desktop' | 'mobile' | 'tablet' | 'bot' | 'tv'
    parser: {
      family: string
      major: string
      minor: string
      patch: string
    }
  }

  interface Request {
    device: Device
  }

  function capture(options?: {
    parseUserAgent?: boolean
    emptyUserAgentDeviceType?: string
    unknownUserAgentDeviceType?: string
  }): (req: any, res: any, next: any) => void
}
