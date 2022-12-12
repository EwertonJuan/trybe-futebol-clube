import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  static async login(req: Request, res: Response) {
    const token = await UsersService.login(req.body);
    if (token === 'Incorrect email or password') return res.status(401).json({ message: token });
    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const role = await UsersService.validate(authorization as string);
    res.status(200).json({ role });
  }
}
