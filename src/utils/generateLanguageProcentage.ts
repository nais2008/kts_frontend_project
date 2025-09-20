export const generateLanguageProcentage = (
  lang: number,
  languages: { [key: string]: number }
) => {
  const totalBytes = Object.values(languages).reduce(
    (sum, bytes) => sum + bytes,
    0
  )

  return ((lang / totalBytes) * 100).toFixed(1)
}
