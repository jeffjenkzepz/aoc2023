import { fetchInput } from '../utils/input';

type Game = Record<string, number>;

const input: string = fetchInput('src/day2/input.txt');

const games: Record<string, Game[]> = {};
const GAME_LIMTS: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14
};

// parse data into something useful
const sessions = input.split('\n');
sessions.forEach((session) => {
  let [gameTitle, gamePlayStrings] = session.split(': ');
  let gameId = gameTitle.split(' ')[1];
  let gamePlays = gamePlayStrings.split('; ');
  const plays: Game[] = gamePlays.map((play) => {
    console.log(play);
    const game: Game = {
      red: 0,
      blue: 0,
      green: 0
    };

    play.split(', ').forEach((colorStr) => {
      let [value, color] = colorStr.split(' ');
      game[color] = parseInt(value);
    });

    return game;
  });

  games[gameId] = plays;
});

console.log(games);

// find valid games
const validGames: Record<string, Game[]> = {};
Object.keys(games).forEach((gameId) => {
  const plays = games[gameId];

  // finding all valid plays
  const validPlays = plays.filter((play) => {
    return Object.keys(play).every((color) => {
      return play[color] <= GAME_LIMTS[color];
    });
  });

  // if all plays are valid, add to valid games
  if (validPlays.length === plays.length) {
    validGames[gameId] = validPlays;
  }
});

console.log(validGames);

// sum of valid game ids
const sum = Object.keys(validGames).reduce((total, gameId) => {
  return total + parseInt(gameId);
}, 0);

console.log(sum);