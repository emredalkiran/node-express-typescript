import { User } from '../utils/interfaces'
import { Db } from 'mongodb'
export default class UserRepository {
  db: Db
  constructor(db: Db) {
    this.db = db
  }
  addUser(user: User): Promise<any>{
    return this.db.collection('users').insertOne(user)
  }
  
  findUserByID(id: string): Promise<any> {
    return this.db.collection('users').findOne({ _id: id })
  }

  findUserByEmail(email: string): Promise<any> {
    return this.db.collection('users').findOne({ email: email })
  }
}