import fs from 'fs';

export function fetchInput(path: string) {
    return fs.readFileSync(path, 'utf8');
}