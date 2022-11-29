import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  static async getAll() {
    const teams = await TeamsModel.findAll();
    return teams;
  }
}
