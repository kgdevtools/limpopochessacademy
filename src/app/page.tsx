import { Trophy, MapPin, Calendar, Users } from 'lucide-react'
import { ImportButton } from '@/components/import-button'
import { TournamentGrid } from '@/components/tournament-grid'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Limpopo Chess Calendar</h1>
              <p className="text-gray-400 text-sm">Official tournament schedule for 2024-2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-6">
            Chess Tournaments
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover and participate in chess tournaments across all five districts of Limpopo Province
          </p>
          <ImportButton />
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400">5</div>
              <div className="text-gray-300">Districts</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
              <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-400">12+</div>
              <div className="text-gray-300">Tournaments</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-400">All</div>
              <div className="text-gray-300">Skill Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Upcoming Tournaments</h3>
            <p className="text-gray-400">Browse all chess tournaments in Limpopo Province</p>
          </div>
          <TournamentGrid />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Limpopo Chess Calendar. Promoting chess across all districts of Limpopo Province.
          </p>
        </div>
      </footer>
    </div>
  )
}