import { NextFunction, Request, Response } from 'express';
import JwtValidation from '../utils/JwtValidation';

export default class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      const auth = JwtValidation.validateToken(authorization as string);
      req.body.user = auth;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
