import { userAuthenticationSchema, userSchema } from './user-schema'
import { ValidationError, InvalidCredentialsError, DatabaseInsertError } from '../utils/errors'
import { errorMessages } from '../utils/error-messages'
import { databaseErrors } from '../utils/database-error-codes'
import UserRepository from './user-repository'
import { Hash, RequestData, User } from '../utils/interfaces'
export default class UserService {
  userRepository: UserRepository
  validator: Hash
  constructor(userRepository: UserRepository, validator: Hash) {
    this.userRepository = userRepository
    this.validator = validator
  }

  async authenticate(request: RequestData): Promise<string> {
    const { error, value } = userAuthenticationSchema.validate(request.body)
    if (error) {
        throw new ValidationError(error)
      }
    try {
      const user = await this.userRepository.getUserByEmail(value.email)
      if (!user){
        throw new InvalidCredentialsError("Please check your email and password")
      } 
      const isValidated = await this.validator.validate(value.password, user.hashedPassword)
      if (!isValidated) {
        throw new InvalidCredentialsError("Please check your email and password")
      } 
      const response = this.setUserLoginDetails(user)
      return JSON.stringify(response)
    } catch (err) {
      throw new InvalidCredentialsError("Please check your email and password")
    }
  }

  async addUser(request: RequestData): Promise<string>{
    const { error, value } = userSchema.validate(request.body)
    if (error) {
      throw new ValidationError(error)
    }
    const hashedPassword = await this.validator.hash(value.password)
    const userData = this.setUserData(value, hashedPassword)
    try {
      const queryResult = await this.userRepository.addUser(userData)
      const result = { success: 'true', id: queryResult.insertedId, name: userData.name }
      return JSON.stringify(result)
    } catch (err) {
      if (err.code === databaseErrors.DUPLICATE_KEY) {
        return JSON.stringify({ success:false, error: "This email address is already in use" })
      }
      else{
        throw new DatabaseInsertError(errorMessages.UNKNOWN_ERROR)
      }
    }
  }


  setUserData(value: User, hashedPassword: string): User{
    return {
      name: value.name,
      lastName: value.lastName,
      email: value.email,
      hashedPassword: hashedPassword
    }
  }

  setUserLoginDetails(userData) {
    return {
      success:true,
      name: userData.name,
      id: userData._id
    }
  }

  
}
