import JwtValidation from '../utils/JwtValidation';
import UsersModel from '../database/models/UsersModel';
import ILogin from '../interfaces/ILogin';

export default class UsersService {
  static async login(user: ILogin): Promise<string> {
    const userExists = await UsersModel
      .findOne({ where: { email: user.email, password: user.password } });
    if (!userExists) {
      throw new Error();
    }
    const token = JwtValidation.createToken(userExists);
    return token;
  }
}
