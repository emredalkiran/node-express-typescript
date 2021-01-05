import express from 'express'
import expressWinston from 'express-winston'
import helmet from 'helmet'
import winston from 'winston'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import ServiceContainer from './service-container'
import { v4 as uuidv4 } from 'uuid'
import redis from 'redis'
import connectRedis from 'connect-redis'
import { UserRouter } from './user/user-router'
import { SessionOptions } from 'express-session'

export class App {
  instance: express.Application

  constructor() {
    this.instance = express()
  }

  private setRoutes(serviceContainer: ServiceContainer): void {
   const userRouter = new UserRouter(this.instance, serviceContainer)
  }
  
  configureApp(serviceContainer: ServiceContainer): void {
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()
  
    const sessionOptions: SessionOptions = {
      genid: () => uuidv4(),
      store: new RedisStore({ client:redisClient }),
      secret: 'hard to guess super secret', //Do not hardcode this secret. Can be read from env variables
      resave: false,
      cookie: {
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: true,
        httpOnly: true,
        maxAge: 3600000,
      },
      saveUninitialized: false,
    }

    this.instance.use(helmet())
    this.instance.use(bodyParser.urlencoded({ extended: true }))
    this.instance.use(bodyParser.json())
    this.instance.use(cors<express.Request>())
    this.instance.use(session(sessionOptions))
    this.instance.use(expressWinston.logger({
      transports: [
          new winston.transports.Console()
      ],
      format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
      )
    }))
    this.setRoutes(serviceContainer)
    this.instance.use(expressWinston.errorLogger({
      transports: [
          new winston.transports.Console()
      ],
      format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
      )
    }))
  }
}

export default App
