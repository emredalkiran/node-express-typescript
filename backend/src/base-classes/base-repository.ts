import { Db } from 'mongodb'

export default abstract class BaseRepository {
  db: Db
  constructor(db: Db) {
    this.db = db
  }
}