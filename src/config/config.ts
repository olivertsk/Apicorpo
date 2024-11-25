import AppConfig from './AppConfig'

const config = {
  local: {
    host: AppConfig.DB_HOST,
    logging: false,
    username: AppConfig.DB_USER,
    password: AppConfig.DB_PASSWORD,
    database: AppConfig.DB_NAME,
    port: AppConfig.DB_PORT,
    dialect: AppConfig.DIALECT,
    define: {
      freezeTableName: true,
    },
  },
  development: {
    host: AppConfig.DB_HOST,
    logging: false,
    username: AppConfig.DB_USER,
    password: AppConfig.DB_PASSWORD,
    database: AppConfig.DB_NAME,
    port: AppConfig.DB_PORT,
    dialect: AppConfig.DIALECT,
    define: {
      freezeTableName: true,
    },
  },
  test: {
    host: AppConfig.DB_HOST,
    logging: false,
    username: AppConfig.DB_USER,
    password: AppConfig.DB_PASSWORD,
    database: AppConfig.DB_NAME,
    port: AppConfig.DB_PORT,
    dialect: AppConfig.DIALECT,
    define: {
      freezeTableName: true,
    },
  },
  production: {
    host: AppConfig.DB_HOST,
    logging: false,
    username: AppConfig.DB_USER,
    password: AppConfig.DB_PASSWORD,
    database: AppConfig.DB_NAME,
    port: AppConfig.DB_PORT,
    dialect: AppConfig.DIALECT,
    define: {
      freezeTableName: true,
    },
  },
}

export = Object.freeze(config)
