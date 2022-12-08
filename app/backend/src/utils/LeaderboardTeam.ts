import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';
import MatchesService from '../services/MatchesService';
import TeamsService from '../services/TeamsService';

export default class LeaderboardTeam {
  private _id: number;
  private _name: string;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: string;

  constructor(id: number) {
    this._id = id;
    this._name = '';
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._totalGames = this._totalVictories + this._totalDraws + this._totalLosses;
    this._totalPoints = this._totalVictories * 3 + this._totalDraws;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._efficiency = '00.0';
  }

  get name(): string {
    return this._name;
  }

  get totalPoints(): number {
    return this._totalPoints;
  }

  get totalGames(): number {
    return this._totalGames;
  }

  get totalVictories(): number {
    return this._totalVictories;
  }

  get totalDraws(): number {
    return this._totalDraws;
  }

  get totalLosses(): number {
    return this._totalLosses;
  }

  get goalsFavor(): number {
    return this._goalsFavor;
  }

  get goalsOwn(): number {
    return this._goalsOwn;
  }

  get goalsBalance(): number {
    return this._goalsBalance;
  }

  get efficiency(): string {
    return this._efficiency;
  }

  public async getName(): Promise<void> {
    const teamName = await TeamsService.getById(this._id);
    this._name = teamName?.teamName as string;
  }

  public async getHomeResults(): Promise<void> {
    const homeMatches = await MatchesService.getSingleTeamHomeMatches(this._id);

    let homeVictories = 0;
    let homeDefeats = 0;
    let draws = 0;

    homeMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        homeVictories += 1;
      }
      if (homeTeamGoals < awayTeamGoals) {
        homeDefeats += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        draws += 1;
      }
    });

    this._totalVictories += homeVictories;
    this._totalLosses += homeDefeats;
    this._totalDraws += draws;
  }

  public async getAwayResults(): Promise<void> {
    const awayMatches = await MatchesService.getSingleTeamAwayMatches(this._id);

    let awayVictories = 0;
    let awayDefeats = 0;
    let draws = 0;

    awayMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) {
        awayVictories += 1;
      }
      if (homeTeamGoals > awayTeamGoals) {
        awayDefeats += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        draws += 1;
      }
    });

    this._totalVictories += awayVictories;
    this._totalLosses += awayDefeats;
    this._totalDraws += draws;
  }

  public async getHomeGoals(): Promise<void> {
    const homeMatches = await MatchesService.getSingleTeamHomeMatches(this._id);
    let homeGoalsFavor = 0;
    let homeGoalsOwn = 0;
    homeMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      homeGoalsFavor += homeTeamGoals;
      homeGoalsOwn += awayTeamGoals;
    });

    this._goalsFavor = homeGoalsFavor;
    this._goalsOwn = homeGoalsOwn;
  }

  public async getAwayGoals() {
    const awayMatches = await MatchesService.getSingleTeamAwayMatches(this._id);
    let awayGoalsFavor = 0;
    let awayGoalsOwn = 0;
    awayMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      awayGoalsFavor += awayTeamGoals;
      awayGoalsOwn += homeTeamGoals;
    });

    this._goalsFavor = awayGoalsFavor;
    this._goalsOwn = awayGoalsOwn;
  }

  public getGames(): void {
    this._totalGames = this._totalVictories + this._totalDraws + this._totalLosses;
  }

  public getGoalsBalance(): void {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  public getPoints(): void {
    this._totalPoints = this._totalVictories * 3 + this._totalDraws;
  }

  public getEfficiency(): void {
    const efficiency = (this._totalPoints / (this._totalGames * 3)) * 100;
    this._efficiency = String(efficiency.toFixed(2));
  }

  public async generateData(homeOrAway: string): Promise<void> {
    await this.getName();
    if (homeOrAway === 'home') {
      await this.getHomeResults();
      await this.getHomeGoals();
    }
    if (homeOrAway === 'away') {
      await this.getAwayResults();
      await this.getAwayGoals();
    }
    this.getGames();
    this.getGoalsBalance();
    this.getPoints();
    this.getPoints();
    this.getEfficiency();
  }

  public async getLeaderboardTeam(homeOrAway: string): Promise<ILeaderboardTeam> {
    await this.generateData(homeOrAway);

    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
