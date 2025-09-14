export const formatDate = (iso: string): string => {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return 'Updated —'

  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' })

  return `Updated ${day} ${month}`
}
