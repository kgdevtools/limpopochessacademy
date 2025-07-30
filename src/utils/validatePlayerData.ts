import { TournamentPlayer } from '../types/tournamentData';

export function validatePlayerData(players: TournamentPlayer[]) {
      return players.map(p => ({
            name: p.name,
                missing: {
                          rating: p.rating ? null : 'missing',
                                points: p.points ? null : 'missing'
                }
      }));
}
