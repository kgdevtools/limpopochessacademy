import { TournamentData } from '../types/tournamentData';
import { extractMetadata } from './extractMetadata';
import { detectTableHeader } from './detectHeader';
import { parsePlayers } from './parsePlayers';

export function formatTournament(text: string): TournamentData {
  const rawMetadata = extractMetadata(text);
  const header = detectTableHeader(text);
  const players = parsePlayers(text, header);

  // Map rawMetadata to required TournamentData fields with defaults
  const metadata = {
    eventName: rawMetadata.eventName || rawMetadata['event name'] || '',
    organizer: rawMetadata.organizer || '',
    location: rawMetadata.location || '',
    date: rawMetadata.date || '',
    federation: rawMetadata.federation,
    rounds: rawMetadata.rounds ? Number(rawMetadata.rounds) : undefined,
    ...rawMetadata
  };

  return { metadata, players };
}
