import BaseRepository from '../base-classes/base-repository'
import { User } from '../utils/interfaces'
import { Db } from 'mongodb'
export default class UserRepository {
  db: Db
  constructor(db: Db) {
    this.db = db
  }
  addUser(user: User) {
    return this.db.collection('users').insertOne(quiz)
  }

  getUserByEmail(email: string) {
    return this.db.collection('users').findOne({ email: email })
  }
  
  findUserByID(id: string) {
    return this.db.collection('users').findOne({ _id: id })
  }

  findUserByEmail(email: string) {
    return this.db.collection('users').findOne({ email: email })
  }

}