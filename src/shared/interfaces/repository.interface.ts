export interface IRepository {
  id: number
  name: string
  description: string
  stars: number
  lastUpdate: string
  avatar: string | null
}

interface IGitHubOwner {
  avatar_url: string;
}

interface IGitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
  owner: IGitHubOwner;
}

export const mapRepo = (repo: IGitHubRepo): IRepository => ({
  id: repo.id,
  name: repo.name,
  description: repo.description || "",
  stars: repo.stargazers_count,
  lastUpdate: repo.updated_at,
  avatar: repo.owner.avatar_url || null,
});
