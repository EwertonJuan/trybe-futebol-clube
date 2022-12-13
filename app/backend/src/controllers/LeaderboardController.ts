// import LeaderboardTeam from '../utils/LeaderboardTeam';

import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard('all');
    return res.status(200).json(leaderboard);
  }

  static async getHomeLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard('home');
    return res.status(200).json(leaderboard);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard('away');
    return res.status(200).json(leaderboard);
  }
}
