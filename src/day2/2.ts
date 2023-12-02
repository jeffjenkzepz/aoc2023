import { fetchInput } from '../utils/fetch';

type Game = Record<string, number>;

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/2/input`
  );

  // const input: string = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  // Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  // Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

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

      return Object.values(max).reduce((total, num) => total * num, 1);
    })
    .reduce((total, num) => total + num, 0);

  console.log(sum);
};

puzzle();
