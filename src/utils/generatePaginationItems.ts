export const generatePaginationItems = (
  current: number,
  total: number,
  maxVisible = 5
): (number | "...")[] => {
  const pages: (number | "...")[] = []

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  pages.push(1)

  if (left > 2) pages.push("...")

  for (let i = left; i <= right; i++) pages.push(i)

  if (right < total - 1) pages.push("...")

  pages.push(total)

  return pages
}
