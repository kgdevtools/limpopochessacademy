'use client'

import { useState } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'

export function ImportButton() {
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleImport = async () => {
    setIsImporting(true)
    setImportStatus('idle')
    setMessage('')

    try {
      const response = await fetch('/api/import-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setImportStatus('success')
        setMessage(`Successfully imported ${data.count} tournaments`)
        // Refresh the page to show new data
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setImportStatus('error')
        setMessage(data.error || 'Failed to import tournaments')
      }
    } catch (error) {
      setImportStatus('error')
      setMessage('Network error occurred')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={handleImport}
        disabled={isImporting}
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors"
      >
        {isImporting ? (
          <>
            <LoadingSpinner size="sm" />
            <span className="ml-2">Importing tournaments...</span>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 mr-2" />
            Import Tournament Data
          </>
        )}
      </button>

      {importStatus !== 'idle' && (
        <div className={`flex items-center space-x-2 text-sm ${
          importStatus === 'success' ? 'text-green-400' : 'text-red-400'
        }`}>
          {importStatus === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}