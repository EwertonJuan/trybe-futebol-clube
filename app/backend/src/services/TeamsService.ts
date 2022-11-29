import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  static async getAll() {
    return TeamsModel.findAll();
  }

  static async getById(id: number) {
    return TeamsModel.findOne({ where: { id } });
  }
}
