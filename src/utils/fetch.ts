import dotenv from 'dotenv';

dotenv.config();

export const fetchInput = async (path: string): Promise<string> => {
  const response = await fetch(path, {
    headers: {
      Cookie: process.env.COOKIE!
    }
  });

  const data = await response.text();

  return data;
};
