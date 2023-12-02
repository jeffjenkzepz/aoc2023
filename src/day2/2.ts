import { fetchInput } from '../utils/input';

type Game = Record<string, number>;

const input: string = fetchInput('src/day2/input.txt');

const games: Record<string, Game[]> = {};

// parse data into something useful
const sessions = input.split('\n');
sessions.forEach((session) => {
  let [gameTitle, gamePlayStrings] = session.split(': ');
  let gameId = gameTitle.split(' ')[1];
  let gamePlays = gamePlayStrings.split('; ');
  const plays: Game[] = gamePlays.map((play) => {
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

// lets get the power set of all the games
const sum = Object.keys(games)
  .map((gameId) => {
    const plays = games[gameId];
    const max: Record<string, number> = {
      red: 0,
      blue: 0,
      green: 0
    };

    plays.forEach((play) => {
      Object.keys(play).forEach((color) => {
        max[color] = Math.max(max[color], play[color]);
      });
    });

    console.log(
      gameId,
      max,
      Object.values(max).reduce((total, num) => total * num, 1)
    );

    return Object.values(max).reduce((total, num) => total * num, 1);
  })
  .reduce((total, num) => total + num, 0);

console.log(sum);
