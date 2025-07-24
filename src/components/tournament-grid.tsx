'use client'

import { useEffect, useState } from 'react'
import { Tournament } from '@/types/tournament'
import { TournamentCard } from '@/components/tournament-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function TournamentGrid() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      const response = await fetch('/api/tournaments')
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments')
      }
      const data = await response.json()
      setTournaments(data.tournaments || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error: {error}</p>
      </div>
    )
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg mb-4">No tournaments found</p>
        <p className="text-gray-500 text-sm">
          Click the "Import Tournament Data" button above to load sample tournaments
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  )
}