import { Session } from 'express-session'

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

export interface RequestData {
  body: object,
  queryParams: object,
  sessionId?: string,
  session: Session
}