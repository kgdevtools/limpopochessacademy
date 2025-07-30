
import { extractText } from './extractText';
import { formatTournament } from './formatTournament';
import { TournamentData } from '../types/tournamentData';

export async function parseTournamentPDF(buffer: Buffer): Promise<TournamentData> {
      const text = await extractText(buffer);
        const tournament = formatTournament(text);
          return tournament;
}
