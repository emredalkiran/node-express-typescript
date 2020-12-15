import { MongoClient, Db } from 'mongodb'
import { DatabaseConnection } from '../base-classes/interfaces'

export default class MongoConnection implements DatabaseConnection {

  private options: object = {
    useNewUrlParser: true
  }

  async connect(connectionURL: string, dbName: string ): Promise<Db> {
    const connection = new MongoClient(connectionURL, this.options)
    await connection.connect()
    const db = connection.db(dbName)
    return db 
  }
}