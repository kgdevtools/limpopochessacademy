export interface Tournament {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  venue: string
  district: string
  status: 'upcoming' | 'registration' | 'completed' | 'cancelled'
  rounds: number
  timeControl: string
  format: string
  entryFee: string
  contact: string
  phone: string
  maxPlayers: number
  currentPlayers: number
  prizes: {
    first: string
    second: string
    third: string
  }
}

export interface TournamentEvent {
  id: string
  event_data: Tournament
  created_at: string
}