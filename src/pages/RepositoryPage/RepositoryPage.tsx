import React, { useEffect } from "react"

import { ROUTES } from "config/routes"
import "github-markdown-css/github-markdown-light.css"
import { useLocalStore } from "hooks/useLocalStore"
import { ChevronLeft, Eye, GitFork, Link as IconLink, Star } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router"
import { Link } from "react-router"
import { MetaValues } from "shared/types/meta.type"
import RepoStore from "store/RepoStore"

import Heading from "components/ui/Heading"
import Loader from "components/ui/Loader"

import { generateLanguageProcentage } from "utils/generateLanguageProcentage"
import { getLangColor } from "utils/setLangColor"

import styles from "./RepositoryPage.module.scss"

const RepositoryPage: React.FC = observer(() => {
  const { orgName, repoName } = useParams<{
    orgName: string
    repoName: string
  }>()
  const repoStore = useLocalStore(() => new RepoStore())

  useEffect(() => {
    if (orgName && repoName) {
      repoStore.fetchRepoData(orgName, repoName)
    }
  }, [repoStore, orgName, repoName])

  console.log(repoStore.meta)

  if (repoStore.meta === MetaValues.LOADING) {
    return <Loader size="l" />
  }

  const { repoData, languages, contributors, readmeHtml } = repoStore

  if (!repoData) {
    return null
  }

  return (
    <div className={styles.repository__container}>
      <div className={styles.statsSection}>
        <div className={styles.repository__header}>
          <Link to={ROUTES.repositories.mask}>
            <ChevronLeft size={32} color="#1f883d" />
          </Link>
          <div className={styles.repository__titleLink}>
            {repoData.owner.avatarURL && (
              <img
                src={repoData.owner.avatarURL}
                alt="Repo Avatar"
                className={styles.repository__avatar}
              />
            )}
            <Heading view="title" className={styles.repository__title}>
              {repoData.name}
            </Heading>
          </div>
        </div>
        {repoData.homepage && (
          <a
            className={styles.repository__homepage}
            href={repoData.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLink color="#000" />
            <Heading weight="bold">{repoData.homepage}</Heading>
          </a>
        )}
        <div className={styles.repository__tags}>
          {repoData.topics?.map((topic) => (
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
        <div className={styles.repository__stats}>
          <Heading
            weight="medium"
            view="p-14"
            style={{ "--hoverColor": "#ff9432" } as React.CSSProperties}
          >
            <Star size={16} />
            {repoData.stargazersCount} stars
          </Heading>
          <Heading weight="medium" view="p-14">
            <Eye size={16} />
            {repoData.watchersCount} watching
          </Heading>
          <Heading weight="medium" view="p-14">
            <GitFork size={16} />
            {repoData.forksCount} forks
          </Heading>
        </div>
        <div className={styles.repository__info}>
          <div className={styles.repository__contributors}>
            <Heading tag="h2">Contributors</Heading>
            <div className={styles.repository__2line}>
              {contributors.map((contributor) => (
                <a
                  href={contributor.htmlURL}
                  key={contributor.login}
                  className={styles.repository__contributor}
                >
                  <img
                    src={contributor.avatarURL}
                    alt={contributor.login}
                    className={styles.contributor__avatar}
                  />
                  <Heading
                    view="p-16"
                    color="primary"
                    weight="medium"
                    className={styles.contributor__name}
                  >
                    {contributor.login}
                  </Heading>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.repository__languages}>
            <Heading tag="h2">Languages</Heading>
            <div className={styles.repository__2line}>
              {Object.keys(languages).map((lang) => (
                <div key={lang} className={styles.repository__language}>
                  <div
                    className={styles.language__color}
                    style={
                      {
                        "--langColor": getLangColor(lang),
                      } as React.CSSProperties
                    }
                  ></div>
                  <Heading view="p-14" color="primary" weight="medium">
                    {lang}
                  </Heading>
                  <Heading view="p-14" color="secondary">
                    {generateLanguageProcentage(languages[lang], languages)}%
                  </Heading>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {readmeHtml && (
        <div className={styles.repository__readme}>
          <Heading weight="bold">README.md</Heading>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </div>
      )}
    </div>
  )
})

export default RepositoryPage
