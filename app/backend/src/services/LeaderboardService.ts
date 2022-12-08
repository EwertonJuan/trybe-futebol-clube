import LeaderboardTeam from '../utils/LeaderboardTeam';
import TeamsModel from '../database/models/TeamsModel';
import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';

export default class LeaderboardService {
  static async getLeaderboard() {
    const teamsIds = await TeamsModel.findAll({ attributes: { exclude: ['teamName'] } });
    const allTeams: ILeaderboardTeam[] = [];
    const promises = teamsIds.map(async ({ id }) => {
      const leaderboardTeam = new LeaderboardTeam(id);
      const team = await leaderboardTeam.getLeaderboardTeam();
      allTeams.push(team);
      // return leaderboardTeam.getLeaderboardTeam();
    });
    await Promise.all(promises);
    console.log(allTeams);
    // console.log(promises);
    return allTeams;
  }
}
