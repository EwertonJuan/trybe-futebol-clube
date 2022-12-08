import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    let matches;
    const { inProgress } = req.query;

    if (inProgress) {
      matches = await MatchesService.getInProgress(String(inProgress));
    } else {
      matches = await MatchesService.getAll();
    }

    res.status(200).json(matches);
  }

  static async createMatch(req: Request, res: Response, next: NextFunction) {
    const match = await MatchesService.createMatch(req.body, next);
    res.status(201).json(match);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const message = await MatchesService.finishMatch(Number(id));
    res.status(200).json(message);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { message } = await MatchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message });
  }
}
