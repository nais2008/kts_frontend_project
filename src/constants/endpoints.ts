export const ENDPOINTS = {
  repositories: {
    create: (orgName: string, perPage: number, page: number) =>
      `/orgs/${orgName}/repos?per_page=${perPage}&page=${page}`,
  },
  repository: {
    info: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}`,
    },
    languages: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}/languages`,
    },
    contributors: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}/contributors`,
    },
    readme: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}/readme`,
    },
  },
}
