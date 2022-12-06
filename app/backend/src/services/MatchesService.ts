import { Op } from 'sequelize';
import { NextFunction } from 'express';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';
// import HttpException from '../utils/HttpException';

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

  static async findTeams(homeTeam: number, awayTeam: number) {
    return TeamsModel
      .findAll({ where: { [Op.or]: [{ id: homeTeam }, { id: awayTeam }] } });
  }

  static async createMatch(match: IMatch, next: NextFunction) {
    const { homeTeam, awayTeam } = match;
    const bothTeamsExists = (await this.findTeams(homeTeam, awayTeam)).length === 2;
    if (!bothTeamsExists) next({ status: 404, message: 'There is no team with such id!' });

    const newMatch = await MatchesModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async finishMatch(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}
