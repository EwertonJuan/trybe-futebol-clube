import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';

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

  static async createMatch(match: IMatch) {
    const newMatch = await MatchesModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async finishMatch(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}
