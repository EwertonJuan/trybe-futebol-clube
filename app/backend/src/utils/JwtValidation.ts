import { decode, sign, verify } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';
// import HttpException from './HttpException';

export default class JwtValidation {
  static createToken(data: ILogin): string {
    const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
    return sign(data, jwtSecret, { expiresIn: '1d', algorithm: 'HS256' });
  }

  static validateToken(token: string) {
    const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
    try {
      const data = verify(token, jwtSecret);
      return data;
    } catch (error) {
      return 'Unauthorized';
    }
  }

  static decodeToken(token: string) {
    const data = decode(token);
    console.log(data);
    return data;
  }
}
