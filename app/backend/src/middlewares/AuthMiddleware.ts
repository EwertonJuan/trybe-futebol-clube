import { NextFunction, Request, Response } from 'express';
import JwtValidation from '../utils/JwtValidation';

export default class AuthMiddleware {
  static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const auth = JwtValidation.validateToken(authorization as string);
    if (auth === 'Unauthorized') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.body.user = auth;
    next();
  }
}
