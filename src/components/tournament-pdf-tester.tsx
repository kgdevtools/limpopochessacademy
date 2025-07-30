"use client"

import { useState } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function TournamentPdfTester() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult(null)
    setError(null)
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/parse-tournament-pdf', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to parse PDF')
      setResult(data.tournamentData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-800/60 border border-gray-700 rounded-lg p-8 mt-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-4">Test Tournament PDF Parser</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        <button
          type="submit"
          disabled={!file || loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Parse PDF'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-400">Error: {error}</div>}
      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-2">Parsed Tournament Data</h3>
          <pre className="bg-gray-900 text-gray-200 p-4 rounded overflow-x-auto text-xs max-h-96">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
