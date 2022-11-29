import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  static async getAll() {
    return MatchesModel.findAll({ include: [
      { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
  }

  static async getInProgress(param: string) {
    const inProgress = JSON.parse(param);
    return MatchesModel.findAll({ where: { inProgress },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
  }
}
