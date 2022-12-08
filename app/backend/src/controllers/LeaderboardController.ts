// import LeaderboardTeam from '../utils/LeaderboardTeam';

import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard();
    res.status(200).json(leaderboard);
  }
}
