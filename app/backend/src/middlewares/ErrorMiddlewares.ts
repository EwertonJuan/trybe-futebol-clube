import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

export default class ErrorMiddleware {
  static handler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof HttpException) {
      console.log('error called');
      return res.status(500).send(error.message);
    }
    return res.status(500).send('Erro não definido');
  }
}
