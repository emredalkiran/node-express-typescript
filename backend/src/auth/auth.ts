import UserRepository from '../user/user-repository'

export default class Authenticator {
userRepository: UserRepository

constructor(userRepository: UserRepository) {
  this.userRepository = userRepository
}
}