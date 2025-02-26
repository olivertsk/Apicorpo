import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from './routes/routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import { errorHandler } from './middlewares/errorHandler'
import { expressAuthentication } from './middlewares/expressAuthentication'
import cors from 'cors'
import { formatRequest } from 'middlewares/formatRequest'
import multer from 'multer';
import { IOrderAttributes } from '@entities/orders/orderModel'
import orderService from '@entities/orders/orderService'
import { Item, OrderA2, OrderProductA2 } from './entities/integration/interfaces'
import { parse as json2csv } from 'json2csv'

export const app = express()
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
    limit: '300mb'
  })
)
app.use(json({ limit: '300mb' }))
app.use(formatRequest)
app.use(expressAuthentication)

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
    console.log('hola');
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
        console.log('item.product :>> ', item.product)
        const date = item.createdAt.toString().split('T')[0]
        if (item?.product) {
          resposeOrder.push({
            idm: items.code,
            id: item.product.idn,
            codart: item?.product?.code || '',
            fecmov: date,
            canart: item.quantity,
            preart: item.sale_price,
            monimp: item.valueTax,
            pisv: tax,
            subtotal: item.subtotal,
          })
        } else {
          console.log('item :>> ', item)
        }
      }
    }
    console.log('resposeOrder :>> ', resposeOrder);
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
          'codfmv,id,codcli,fecmov,monmov,monnet,impmov,codved,nomcli,telcl1,email,dir1,nrocontrol,forpag,nit'
        )
    }
    const resposeOrder: OrderA2[] = []
    const dataJSON = JSON.parse(JSON.stringify(data))
    for (const item of dataJSON) {
      const date = item.createdAt.toString().split('T')[0]
      resposeOrder.push({
        codfmv: '03',
        id: item.code,
        codcli: item?.dataUser?.dni || '',
        fecmov: date,
        monmov: item.amountWithoutTax,
        monnet: item.amount,
        impmov: item.valueTax,
        codved: 1,
        nomcli: item?.dataUser?.name || item?.nameClient || '',
        telcl1: item.dataUser?.phoneNumber || item.phoneNumber,
        email: item?.dataUser?.email || '',
        dir1: item?.location || '',
        nrocontrol: item?.observation || '1',
        forpag: 1,
        nit: `${item.dataUser.dni},`,
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
          'codfmv,id,codcli,fecmov,monmov,monnet,impmov,codved,nomcli,telcl1,email,dir1,nrocontrol,forpag,nit'
        )
    }
  } catch (error) {
    console.error('Error al procesar la orden:', error)
    return res.status(500).send('Internal server error')
  }
})
app.use(errorHandler)
