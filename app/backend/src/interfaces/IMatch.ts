export default interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
  inProgress?: boolean;
}
