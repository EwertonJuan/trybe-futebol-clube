import { Request, Response } from 'express';
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
}
