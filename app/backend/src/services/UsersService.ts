import { JwtPayload } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import JwtValidation from '../utils/JwtValidation';
import UsersModel from '../database/models/UsersModel';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';

export default class UsersService {
  static validateLogin(login: ILogin, user: IUser) {
    if (login.email !== user.email || !(compareSync(login.password, user.password))) {
      return 'Incorrect email or password';
    }
    return '';
  }

  static async login(user: ILogin): Promise<string> {
    const userExists = await UsersModel
      .findOne({ where: { email: user.email } });

    if (!userExists) {
      return 'Incorrect email or password';
    }
    const invalid = this.validateLogin(user, userExists);
    if (invalid) return invalid;

    const token = await JwtValidation.createToken(user);
    return token;
  }

  static async validate(authorization: string)/* : Promise<string | JwtPayload> */ {
    const auth = JwtValidation.validateToken(authorization) as JwtPayload;
    const user = await UsersModel.findOne({ where: { email: auth.email } });
    return user?.role;
  }
}
