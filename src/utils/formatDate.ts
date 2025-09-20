/**
 * Форматирует ISO-дату в строку вида "DD Mon".
 *
 * @param iso - Дата в формате ISO (например, "2025-09-18T14:00:00Z").
 * @returns Строка с днём и сокращённым месяцем или пустая строка, если дата некорректна.
 */
export const formatDate = (iso: string): string => {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return ""

  const day = date.getDate()
  const month = date.toLocaleString("en-US", { month: "short" })

  return `${day} ${month}`
}
