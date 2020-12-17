import express from 'express'
import expressWinston from 'express-winston'
import helmet from 'helmet'
import winston from 'winston'
import userController from './user/user-controller'
import bodyParser from 'body-parser'
import cors from 'cors'
import ServiceContainer from './service-container'
import { UserRouter } from './user/user-router'

export class App {
  instance: express.Application

  constructor() {
    this.instance = express()
  }

  private setRoutes(serviceContainer: ServiceContainer): void {
   const userRouter = new UserRouter(this.instance, serviceContainer)
  }
  
  configureApp(serviceContainer: ServiceContainer): void {
    this.instance.use(helmet())
    this.instance.use(bodyParser.urlencoded({ extended: true }))
    this.instance.use(bodyParser.json())
    this.instance.use(cors<express.Request>())
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
