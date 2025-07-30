export interface TournamentData {
  metadata: {
    eventName: string;
    organizer: string;
    location: string;
    date: string;
    federation?: string;
    rounds?: number;
    [key: string]: string | number | undefined;
  };
  players: TournamentPlayer[];
}

export interface TournamentPlayer {
  rank?: number;
  title?: string;
  name: string;
  rating?: number;
  fed?: string;
  points?: number;
  rounds: {
    [roundKey: string]: {
      opponent: number;
      color: 'w' | 'b';
      result: number;
    };
  };
}
