import dotenv from 'dotenv'

dotenv.config()

const AppConfig = {
  API_PREFIX: process.env.API_PREFIX,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MY_PORT: process.env.MY_PORT || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'MyS3cr3t_JWT$ecret!2024.',
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  STORAGE_HOST: process.env.STORAGE_HOST || 'gs://marketing-audiologico.appspot.com/storage',
  CREDENTIAL_HOST_TEST:
    process.env.CREDENTIAL_HOST_TEST ||
    '../marketing-audiologico-firebase-adminsdk-5sfi7-ee5620eaa5.json',
  DIALECT: process.env.SQL_DIALECT,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME || '',
}

export default Object.freeze(AppConfig)
