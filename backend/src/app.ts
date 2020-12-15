import express from 'express'
import expressWinston from 'express-winston'
import helmet from 'helmet'
import winston from 'winston'
import userController from './user/user-controller'
import bodyParser from 'body-parser'
import cors from 'cors'
import ServiceContainer from './service-container'

export class App {
  instance: express.Application

  constructor() {
    this.instance = express()
  }
  private setRoutes(): void {
    //app.use('/api/v1/user', userController)
    //app.use(/^\/api\/v1\/[a-zA-Z0-9_.-]*$/, quizController)
    this.instance.get('/', (req, res) => {
      console.log("Request received")
      res.send('Homepage')
    })
    this.instance.post('/', (req, res) => {
      console.log(req.body)
      res.send('Hello')
    })
  }
  configureApp(): void {
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
    this.setRoutes()
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
