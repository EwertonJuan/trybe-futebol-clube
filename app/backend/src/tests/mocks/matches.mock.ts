const matches = [
  {
    "id": 1,
    "homeTeam": 1,
    "homeTeamGoals": 3,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeam": 2,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": true,
    "teamHome": {
      "teamName": "Bahia"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  },
];

const setMatch = {
  "homeTeam": 1,
  "awayTeam": 2,
  "homeTeamGoals": 3,
  "awayTeamGoals": 1,
}

const invalidMatch = {
  "homeTeam": 1,
  "awayTeam": 1,
  "homeTeamGoals": 3,
  "awayTeamGoals": 1,
}

const teamNotFound = {
  "homeTeam": 1,
  "awayTeam": 99,
  "homeTeamGoals": 3,
  "awayTeamGoals": 1,
}

export { matches, setMatch, invalidMatch, teamNotFound }