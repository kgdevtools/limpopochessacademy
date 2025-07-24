import { Tournament } from '@/types/tournament'

interface StatusBadgeProps {
  status: Tournament['status']
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    upcoming: {
      label: 'Upcoming',
      className: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    registration: {
      label: 'Registration Open',
      className: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    completed: {
      label: 'Completed',
      className: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  )
}