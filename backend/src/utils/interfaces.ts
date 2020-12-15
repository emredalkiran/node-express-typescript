import express from 'express'
import Authenticator from '../auth/auth'
export interface User {
  name: string,
  lastName: string,
  email: string,
  hashedPassword: string
}

export interface UserAuthenticationRequest {
  email: string,
  password: string
}

export interface Hash {
  hash(password: string): Promise<string>
  validate(password: string, hashedPassword: string): Promise<boolean>
}

export interface Helper {
  hash: Hash,
  auth: Authenticator
}

export interface RequestData {
  body: object,
  queryParams: object
}

