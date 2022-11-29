// import { Op } from 'sequelize';
import { JwtPayload } from 'jsonwebtoken';
import JwtValidation from '../utils/JwtValidation';
import UsersModel from '../database/models/UsersModel';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import HttpException from '../utils/HttpException';

export default class UsersService {
  static validateLogin(login: ILogin, user: IUser) {
    if (login.email !== user.email || login.password !== user.password) {
      throw new HttpException(401, 'Incorrect email or password');
    }
  }

  static async login(user: ILogin): Promise<string> {
    // const userExists = await UsersModel
    //   .findOne({ where: { [Op.or]: [{ email: user.email }, { password: user.password }] } });
    // if (userExists) {
    //   this.validateLogin(user, userExists);
    // }
    const token = await JwtValidation.createToken(user);
    return token;
  }

  static async validate(authorization: string)/* : Promise<string | JwtPayload> */ {
    const auth = JwtValidation.validateToken(authorization) as JwtPayload;
    const user = await UsersModel.findOne({ where: { email: auth.email } });
    return user?.role;
  }
}
