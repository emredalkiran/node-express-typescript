import { Hash } from './interfaces'
import bcrypt from 'bcrypt'

export default class HashHelper implements Hash {
  hash(password: string): Promise<string> {
    const saltRound = 10
    return bcrypt.hash(password, saltRound)
  }
  validate(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}