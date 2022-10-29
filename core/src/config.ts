import dotenv from 'dotenv'
dotenv.config()

/**
 * @todo dev or prod
 */
class OrderConfig {
  getDBConfig() {
    return {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }
  }

  getTokenConfig() {
    return {
      jwtSecret: process.env.JWT_SECRET,
    }
  }
}

export const orderConfig = new OrderConfig()
