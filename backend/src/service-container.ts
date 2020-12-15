import { hash } from 'bcrypt'
import { Db } from 'mongodb'
import UserRepository from './user/user-repository'
import UserService from './user/user-service'
import { Helper } from './utils/interfaces'
import { ErrorMesages, errorMessages } from './utils/error-messages'
import AuthService from './auth/auth'

export default class ServiceContainer {
  db: Db
  userRepository: UserRepository
  userService: UserService
  helpers: Helper
  errorMessages: ErrorMesages
  constructor(db: Db) {
    this.db = db
    this.userRepository = new UserRepository(db)
    this.helpers = { 
      hash: new Hash(),
      auth: new AuthService(this.userRepository)
    }
    this.userService = new UserService(this.userRepository, this.helpers.hash)

    this.authService = new AuthService(this.helpers.hash)
    this.errorMessages = errorMessages
  }
}