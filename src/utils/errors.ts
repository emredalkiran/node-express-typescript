export class ValidationError extends Error {
  errorMessage: string
  constructor (errorMessage: string) {
    super()
    this.errorMessage = errorMessage

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }
  }
}

export class DatabaseInsertError extends Error {
  errorMessage: string
  constructor (errorMessage: string) {
    super()
    this.errorMessage = errorMessage
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseInsertError)
    }
  }
}

export class UserNotFoundError extends Error {
  errorMessage: string
  constructor (errorMessage: string) {
    super()
    this.errorMessage = errorMessage
  }
}

export class InvalidCredentialsError extends Error {
  errorMessage: string
  constructor (errorMessage: string) {
    super()
    this.errorMessage = errorMessage
  }
}

