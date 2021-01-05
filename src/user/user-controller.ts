import express from 'express'
import BaseController from '../base-classes/base-controller'
import { httpHeader, statusCode } from '../utils/http-header'
import UserService from './user-service'

export default class UserController extends BaseController {
  userService: UserService
  constructor(userService: UserService) {
    super()
    this.userService = userService
  }
  async login(req: express.Request, res:express.Response): Promise<void>{
    const reqData = this.getRequestData(req)
    try {
      const response = await this.userService.login(reqData)
      res
      .set(httpHeader.json)
      .status(statusCode.success)
      .send(response)
  } catch(err) {
    res
    .set(httpHeader.json)
    .status(statusCode.unauthorized)
    .send({
      response: {
        success: false,
        error: err.errorMessage
     }
    })
   }
  }

  async signup(req: express.Request, res:express.Response): Promise<void> {
    const reqData = this.getRequestData(req)
    try {
      const response = await this.userService.addUser(reqData)
      res
        .set(httpHeader.json)
        .status(statusCode.success)
        .send(response)
    } catch(err) {
        res
          .set(httpHeader.json)
          .status(statusCode.badRequest)
          .send({
            response: {
            success: false,
            error: err.errorMessage
          }
      })
    }
  }
}