
import { TournamentPlayer } from '../types/tournamentData';
import { parseMatchValue } from './parseMatchValue';

export function parsePlayers(text: string, header: string[]): TournamentPlayer[] {
  const lines = text.split('\n');
  const start = lines.findIndex(line => header.every(h => line.includes(h)));
  const rows = lines.slice(start + 1);

  const players: TournamentPlayer[] = [];

  for (const row of rows) {
    const cols = row.trim().split(/\s+/);
    if (cols.length < header.length) continue;

    const entry: TournamentPlayer = {
      name: cols[header.indexOf('name')],
      rating: Number(cols[header.indexOf('rating')]),
      points: Number(cols[header.indexOf('points')]),
      fed: cols[header.indexOf('fed')],
      rounds: {}
    };

    header.forEach((h, idx) => {
      if (/rd\d+/i.test(h)) {
        const round = parseMatchValue(cols[idx]);
        if (round) {
          entry.rounds[h] = round;
        }
      }
    });

    players.push(entry);
  }

  return players;
}
// Parses table rows below the detected header. Dynamically builds player records including rounds (rd1, rd2, ...).
// Parses table rows below the detected header. Dynamically builds player records including rounds (rd1, rd2, …).
// Parses table rows below the detected header. Dynamically builds player records including rounds (rd1, rd2, …).
