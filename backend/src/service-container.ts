import { Db } from 'mongodb'
import UserRepository from './user/user-repository'
import UserService from './user/user-service'
import { ErrorMesages, errorMessages } from './utils/error-messages'
import Authenticator from './auth/auth'
import HashHelper, { Hash } from './utils/hash'

interface Helper {
  hash: Hash,
  auth: Authenticator
}

export default class ServiceContainer {
  userRepository: UserRepository
  userService: UserService
  helpers: Helper
  errorMessages: ErrorMesages
  constructor(db: Db) {
    this.userRepository = new UserRepository(db)
    this.helpers = { 
      hash: new HashHelper(),
      auth: new Authenticator(this.userRepository)
    }
    this.userService = new UserService(this.userRepository, this.helpers.hash)
    this.errorMessages = errorMessages
  }
}