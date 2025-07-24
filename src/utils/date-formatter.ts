export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate || startDate === endDate) {
    return formatDate(startDate)
  }
  
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}`
  }
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}