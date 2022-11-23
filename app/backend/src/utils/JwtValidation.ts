import { sign } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';

export default class JwtValidation {
  static createToken(data: ILogin): string {
    const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
    return sign(data, jwtSecret, { expiresIn: '1d', algorithm: 'HS256' });
  }
}
