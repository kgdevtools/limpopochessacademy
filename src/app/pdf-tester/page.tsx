import { TournamentPdfTester } from '@/components/tournament-pdf-tester'

export default function PdfTesterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <TournamentPdfTester />
      </div>
    </main>
  )
}
