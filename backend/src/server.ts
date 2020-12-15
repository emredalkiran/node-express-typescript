import env from 'dotenv'
import http from 'http'
import MongoConnection from './utils/database'
import App from './app'
import { Container } from 'winston'
import ServiceContainer from './service-container'

async function init() {
  env.config()
  const connectionURL = `mongodb://${process.env.URL}`
  const port = process.env.PORT || 3000
  const databaseConnection = new MongoConnection()
  
  const app = new App()
  
  app.configureApp()

  try {
    const db = await databaseConnection.connect(connectionURL, process.env.DATABASE_NAME!)
    console.log(`Connected to ${process.env.DATABASE_NAME} database `)
    console.log('Starting server...')
    const serviceContainer = new ServiceContainer(db)
    const server = http.createServer(app.instance)
    server.listen({host: 'localhost', port: port},()=> console.log(`Server listening on port ${port} at localhost`))
  } catch (err) {
    console.log(err)
  }
  }

init()