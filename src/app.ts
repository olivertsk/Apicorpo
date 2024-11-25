import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from './routes/routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import { errorHandler } from './middlewares/errorHandler'
import { expressAuthentication } from './middlewares/expressAuthentication'
import cors from 'cors'
// import multer from 'multer';

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
  })
)
app.use(json())
app.use(expressAuthentication)
RegisterRoutes(app)

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
app.use(errorHandler)
