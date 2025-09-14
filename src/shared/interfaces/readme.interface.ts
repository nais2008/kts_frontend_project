export interface IGitHubReadmeFile {
  name: string
  content: string
  encoding: 'base64' | string
  html_url: string
  download_url?: string
}

export interface IGitHubReadmeFile {
  name: string
  content: string
  encoding: 'base64' | string
  html_url: string
  download_url?: string
}

export interface IGitHubContributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}
