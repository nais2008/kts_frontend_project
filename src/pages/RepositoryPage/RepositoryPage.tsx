import React, { useEffect } from "react"

import { ROUTES } from "config/routes"
import "github-markdown-css/github-markdown-light.css"
import { useLocalStore } from "hooks/useLocalStore"
import { ChevronLeft, Link as IconLink } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router"
import { Link } from "react-router"
import { MetaValues } from "shared/types/meta.type"
import RepoStore from "store/RepoStore"

import Heading from "components/ui/Heading"
import Loader from "components/ui/Loader"

import styles from "./RepositoryPage.module.scss"
import RepositoryStats from "components/repository/RepositoryStats"
import RepositoryLanguages from "components/repository/RepositoryLanguages"
import RepositoryContributors from "components/repository/RepositoryContributors"

type RepositoryPageQuery = {
  orgName: string
  repoName: string
}

const RepositoryPage: React.FC = observer(() => {
  const { orgName, repoName } = useParams<RepositoryPageQuery>()
  const repoStore = useLocalStore(() => new RepoStore())

  useEffect(() => {
    if (orgName && repoName) {
      repoStore.fetchRepoData(orgName, repoName)
    }
  }, [repoStore, orgName, repoName])

  if (repoStore.meta === MetaValues.LOADING) {
    return <Loader size="l" />
  }

  if (!repoStore.repoData) {
    return null
  }

  return (
    <div className={styles.repository__container}>
      <section className={styles.repository__statsSection}>
        <div className={styles.repository__header}>
          <Link to={ROUTES.repositories.mask}>
            <ChevronLeft size={32} color="#1f883d" />
          </Link>
          <div className={styles.repository__titleLink}>
            {repoStore.repoData.owner.avatarURL && (
              <img
                src={repoStore.repoData.owner.avatarURL}
                alt="Repo Avatar"
                className={styles.repository__avatar}
              />
            )}
            <Heading view="title" className={styles.repository__title}>
              {repoStore.repoData.name}
            </Heading>
          </div>
        </div>
        {repoStore.repoData.homepage && (
          <a
            className={styles.repository__homepage}
            href={repoStore.repoData.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLink color="#000" />
            <Heading weight="bold">{repoStore.repoData.homepage}</Heading>
          </a>
        )}
        <div className={styles.repository__tags}>
          {repoStore.repoData.topics?.map((topic) => (
            <Heading
              weight="medium"
              tag="span"
              view="p-14"
              key={topic}
              className={styles.tag}
            >
              {topic}
            </Heading>
          ))}
        </div>
        <RepositoryStats
          stars={repoStore.repoData.stargazersCount}
          watchers={repoStore.repoData.watchersCount}
          forks={repoStore.repoData.forksCount}
        />
        <div className={styles.repository__info}>
          <RepositoryContributors contributors={repoStore.contributors} />
          <RepositoryLanguages languages={repoStore.languages} />
        </div>
      </section>
      {repoStore.readmeHtml && (
        <div className={styles.repository__readme}>
          <Heading weight="bold">README.md</Heading>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: repoStore.readmeHtml }}
          />
        </div>
      )}
    </div>
  )
})

export default RepositoryPage
