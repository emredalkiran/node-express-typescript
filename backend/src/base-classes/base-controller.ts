import express from 'express'
import { RequestData } from '../utils/interfaces'

export default abstract class BaseController {
  getRequestData(req: express.Request): RequestData {
    return {
      body:req.body,
      queryParams: req.query
    }
  }
}