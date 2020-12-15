import express from 'express'
import BaseController from '../base-classes/base-controller'
//import getRequestData from '../utils/get-request-data'
//import { httpHeader, statusCode } from '../utils/http-header'
import UserService from './user-service'

export default class UserController extends BaseController {
  userService: UserService
  constructor(userService: UserService) {
    super()
    this.userService = userService
  }
  async login(req: express.Request, res:express.Response): Promi {
    const reqDate = this.getRequestData(req)
    try {
      const response = await this.service.
    }
  }
  async signup(req: express.Request, res:express.Response) {

  }

}
const userRouter = express.Router()

userRouter.post('/login', async (req, res)=> {
  console.log("POST /login")
  const request = getRequestData(req)
  try {
    const response = await userService.authenticate(request)
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
})

userRouter.post('/signup', async (req, res)=> {
  console.log("POST /signup")
  const request = getRequestData(req)
  try {
    const response = await userService.addUser(request)
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
})

module.exports = userRouter