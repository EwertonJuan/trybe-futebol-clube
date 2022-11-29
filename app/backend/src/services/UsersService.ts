import { Op } from 'sequelize';
import JwtValidation from '../utils/JwtValidation';
import UsersModel from '../database/models/UsersModel';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import HttpException from '../utils/HttpException';

export default class UsersService {
  static validateLogin(login: ILogin, user: IUser) {
    console.log(login);
    console.log(user);
    if (login.email !== user.email || login.password !== user.password) {
      console.log('throwing');
      throw new HttpException(401, 'Incorrect email or password');
    }
  }

  static async login(user: ILogin): Promise<string> {
    const userExists = await UsersModel
      .findOne({ where: { [Op.or]: [{ email: user.email }, { password: user.password }] } });
    console.log(userExists);
    if (userExists) {
      console.log('I exist');
      this.validateLogin(user, userExists);
    }
    console.log('I maybe dont exist');
    const token = await JwtValidation.createToken(user);
    return token;
  }
}
