import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from './routes/routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import { errorHandler } from './middlewares/errorHandler'
import { expressAuthentication } from './middlewares/expressAuthentication'
import cors from 'cors'
import { formatRequest } from 'middlewares/formatRequest'
import multer from 'multer'
import type { IOrderAttributes } from '@entities/orders/orderModel'
import orderService from '@entities/orders/orderService'
import type { Item, OrderA2, OrderProductA2 } from './entities/integration/interfaces'
import { parse as json2csv } from 'json2csv'
import morgan from 'morgan'
import { contextMiddleware } from 'middlewares/context.middleware'
import device from 'express-device'
import { initCurrencyScheduler } from './scheduler/currencyScheduler'

export const app = express()
app.use(morgan('dev'))
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,DELETE,PATCH,PUT',
    credentials: true,
  })
)
// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
    limit: '300mb',
  })
)
app.use(json({ limit: '300mb' }))
app.use(formatRequest)
app.use(expressAuthentication)
app.use(device.capture())
app.use(contextMiddleware)
// const storage = multer.memoryStorage()
// const upload = multer({ storage, limits: { fileSize: 300 * 1024 * 1024 } }) // 10MB

RegisterRoutes(app, {
  multer: multer({
    limits: {
      fileSize: 300 * 1024 * 1024,
    },
  }),
})
// RegisterRoutes(app)

// app.post('/files/uploadFile', upload.single('file'), (_req, _res, next) => {
//   console.log('estoy pasando por app');
//   next();
// })
initCurrencyScheduler()
app.get('/file/:folder/:fileName', async (pReq, pRes) => {
  try {
    const vFileName = pReq.params.fileName
    const vFolder = pReq.params.folder
    // const vFolder = pReq.params.folder
    return pRes.download(`uploads/${vFolder}/${vFileName}`)
  } catch (error) {
    console.error('Error al descargar el archivo:', error)
    pRes.status(500).send('Internal server error')
  }
})

app.get('/detalle.php', async (pReq, pRes) => {
  try {
    console.log('hola')
    const requestBody = {
      wasSent: pReq.query.wasSent ? Number(pReq.query.wasSent) : undefined,
      product: pReq.query.product === 'true' ? true : undefined,
      fe: pReq.query?.fe || undefined,
      usu: pReq.query?.usu || undefined,
      cla: pReq.query?.cla || undefined,
      bd: pReq.query?.bd || undefined,
      time: pReq.query?.time || undefined,
    }
    requestBody.wasSent = 1
    requestBody.product = true
    const data: IOrderAttributes[] = await orderService.downloadOrder({
      wasSent: requestBody.wasSent,
      fe: requestBody.fe?.toString() || undefined,
      product: false,
    })
    if (data.length === 0) {
      return pRes.status(200).send('idm,id,codart,fecmov,canart,preart,monimp,pisv,subtotal')
    }
    const dataJSON: Item[] = JSON.parse(JSON.stringify(data))
    const resposeOrder: OrderProductA2[] = []
    for (const items of JSON.parse(JSON.stringify(dataJSON))) {
      let tax = items?.tax
      for (const item of items.products) {
        if (item?.tax) {
          tax = item.tax
        }
        const date = item.createdAt.toString().split('T')[0]
        if (item?.product) {
          resposeOrder.push({
            idm: items.code,
            id: item.product.idn,
            codart: item?.product?.code || '',
            fecmov: date,
            canart: item.quantity,
            preart: item.salePrice,
            monimp: item.valueTax,
            pisv: item.tax || tax || 0,
            subtotal: item.subtotal + ',',
          })
        }
      }
    }
    if (resposeOrder.length) {
      let csv = json2csv(resposeOrder, { delimiter: ',', eol: '\n' })
      csv = csv.replace(/['"]+/g, '')
      pRes.setHeader('Content-Type', 'text/plain')
      return pRes.send(csv)
    } else {
      pRes.setHeader('Content-Type', 'text/plain')
      return pRes.send('idm,id,codart,fecmov,canart,preart,monimp,pisv,subtotal')
    }
  } catch (error) {
    console.error('Error al procesar la orden:', error)
    return pRes.status(500).send('Internal server error')
  }
})

app.get('/archivophp.php', async (req, res) => {
  const requestBody = {
    fecha: req.query.fecha,
    wasSent: req.query.wasSent ? Number(req.query.wasSent) : undefined,
    product: req.query.product === 'true' ? true : undefined,
    fe: req.query?.fe || undefined,
    usu: req.query?.usu || undefined,
    cla: req.query?.cla || undefined,
    bd: req.query?.bd || undefined,
    time: req.query?.time || undefined,
  }

  try {
    requestBody.wasSent = 0
    requestBody.product = false
    const data: IOrderAttributes[] = await orderService.downloadOrder({
      wasSent: requestBody.wasSent,
      fe: requestBody.fe?.toString() || undefined,
      product: false,
    })
    if (data.length === 0) {
      return res
        .status(200)
        .send(
          'codfmv,id,codcli,fecmov,monmov,monnet,impmov,codved,nomcli,telcl1,email,dir1,nrocontrol,forpag'
        )
    }
    const resposeOrder: OrderA2[] = []
    const dataJSON = JSON.parse(JSON.stringify(data))
    for (const item of dataJSON) {
      const cleanString = (str = '') => {
        if (typeof str !== 'string') return ''
        return str
          .replaceAll(',', ' ')
          .replaceAll('`', '')
          .replaceAll("'", '')
          .replaceAll('~', '')
          .trim()
      }

      // Procesamiento de datos con valores por defecto y limpieza
      const nameClient = cleanString(item?.dataUser?.name || item?.nameClient)
      const phoneNumber = cleanString(item?.dataUser?.phoneNumber || item?.phoneNumber)
      const location = cleanString(item?.location)
      const observation = cleanString(item?.observation) || '1'
      const email = cleanString(item?.dataUser?.email)
      const date = item?.createdAt?.toString()?.split('T')[0] || ''
      resposeOrder.push({
        codfmv: '03',
        id: item.code,
        codcli: item.dni || item?.dataUser?.dni || '',
        fecmov: date,
        monmov: item.amountWithoutTax,
        monnet: item.amount,
        impmov: item.valueTax,
        codved: 1,
        nomcli: nameClient,
        telcl1: phoneNumber,
        email: email,
        dir1: location,
        nrocontrol: observation,
        forpag: 1 + ',',
      })
    }
    if (resposeOrder.length) {
      let csv = json2csv(resposeOrder, { delimiter: ',', eol: '\n' })
      csv = csv.replace(/['"]+/g, '')
      csv = csv.replace(/["]+/g, '')
      res.setHeader('Content-Type', 'text/plain')
      return res.send(csv)
    } else {
      res.setHeader('Content-Type', 'text/plain')
      return res
        .status(200)
        .send(
          'codfmv,id,codcli,fecmov,monmov,monnet,impmov,codved,nomcli,telcl1,email,dir1,nrocontrol,forpag'
        )
    }
  } catch (error) {
    console.error('Error al procesar la orden:', error)
    return res.status(500).send('Internal server error')
  }
})

app.use(errorHandler)
