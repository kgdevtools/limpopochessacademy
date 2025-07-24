import { Tournament } from '@/types/tournament'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatDateRange } from '@/utils/date-formatter'
import { Calendar, MapPin, Users, Clock, Trophy, Phone, Mail } from 'lucide-react'

interface TournamentCardProps {
  tournament: Tournament
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{tournament.title}</h3>
        <StatusBadge status={tournament.status} />
      </div>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {tournament.description}
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          {formatDateRange(tournament.date, tournament.endDate)}
        </div>
        
        <div className="flex items-center text-sm text-gray-400">
          <MapPin className="w-4 h-4 mr-2 text-blue-400" />
          {tournament.venue}, {tournament.district}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Users className="w-4 h-4 mr-2 text-green-400" />
            {tournament.currentPlayers}/{tournament.maxPlayers}
          </div>
          
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-2 text-green-400" />
            {tournament.timeControl}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {tournament.rounds} rounds • {tournament.format}
          </span>
          <span className="text-blue-400 font-medium">
            {tournament.entryFee}
          </span>
        </div>
        
        <div className="pt-3 border-t border-gray-700">
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
            1st: {tournament.prizes.first}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {tournament.contact}
            </div>
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              {tournament.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}