import { MongoClient, Db } from 'mongodb'

interface DatabaseConnection {
  connect(connectionURL: string, dbName: string, options?: object): Promise<any>
}
export default class MongoConnection implements DatabaseConnection {

  private options = {
    useNewUrlParser: true
  }

  async connect(connectionURL: string, dbName: string): Promise<Db> {
    const connection = new MongoClient(connectionURL, this.options)
    await connection.connect()
    const db = connection.db(dbName)
    return db 
  }
}