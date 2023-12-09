import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const fetchInput = async (path: string): Promise<string> => {
  const fileName = path
    .replace('https://adventofcode.com/', '')
    .split('/')
    .join('-');

  // aoc input doesnt change once you have it so
  // if we have a cached result fetch that (respect their server)
  // if you wanna bust cache for any reason just delete the file in inputs/
  if (fs.existsSync(`./inputs/${fileName}`)) {
    console.log('Cache hit returning cached input', fileName);
    const data = fs.readFileSync(`./inputs/${fileName}`, 'utf8');
    return data.trim();
  }

  const response = await fetch(path, {
    headers: {
      Cookie: process.env.COOKIE!
    }
  });

  const data = await response.text();

  // cache the input
  fs.writeFileSync(`./inputs/${fileName}`, data);

  return data.trim();
};
