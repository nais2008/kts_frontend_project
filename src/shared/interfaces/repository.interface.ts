export interface IRepository {
  id: number
  name: string
  description: string
  stars: number
  lastUpdate: string
  avatar: string | null
  stargazersCount: number
  watchersCount: number
  forksCount: number
  topics: string[]
  homepage: string | null
}

export interface IGitHubOwner {
  avatar_url: string
}

export interface IGitHubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  updated_at: string
  owner: IGitHubOwner
  watchers_count: number
  forks_count: number
  topics: string[]
  homepage: string | null
}

export const mapRepo = (repo: IGitHubRepo): IRepository => ({
  id: repo.id,
  name: repo.name,
  description: repo.description || ' ',
  stars: repo.stargazers_count,
  lastUpdate: repo.updated_at,
  avatar: repo.owner.avatar_url || null,
  stargazersCount: repo.stargazers_count,
  watchersCount: repo.watchers_count,
  forksCount: repo.forks_count,
  topics: repo.topics,
  homepage: repo.homepage,
})
