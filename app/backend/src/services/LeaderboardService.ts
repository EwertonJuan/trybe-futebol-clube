import LeaderboardTeam from '../utils/LeaderboardTeam';
import TeamsModel from '../database/models/TeamsModel';
import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';

export default class LeaderboardService {
  static orderLeaderboard(teams: ILeaderboardTeam[]) {
    return teams.sort((a: ILeaderboardTeam, b: ILeaderboardTeam) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      if (a.goalsOwn > b.goalsOwn) return 1;
      return 0;
    });
  }

  static async getLeaderboard() {
    const teamsIds = await TeamsModel.findAll({ attributes: { exclude: ['teamName'] } });
    const allTeams: ILeaderboardTeam[] = [];
    const promises = teamsIds.map(async ({ id }) => {
      const leaderboardTeam = new LeaderboardTeam(id);
      const team = await leaderboardTeam.getLeaderboardTeam('home');
      allTeams.push(team);
    });
    await Promise.all(promises);
    const leaderboard = this.orderLeaderboard(allTeams);
    return leaderboard;
  }
}
