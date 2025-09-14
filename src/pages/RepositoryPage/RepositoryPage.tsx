import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronLeft, Eye, GitFork, Link as IconLink, Star } from 'lucide-react'
import { Link, useParams } from 'react-router'

import Heading from 'components/ui/Heading'

import { useToken } from 'hooks/useToken'
import { routes } from 'config/routes'
import { mapRepo, type IGitHubRepo, type IRepository } from 'shared/interfaces/repository.interface'
import type { IGitHubContributor, IGitHubReadmeFile } from 'shared/interfaces/readme.interface'
import { parseReadmeToHtml } from 'utils/parseReadmeFileToHtml'

import styles from './RepositoryPage.module.scss'
import 'github-markdown-css/github-markdown-light.css'
import Loader from 'components/ui/Loader'


const RepositoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const { token } = useToken()

  const [readmeHtml, setReadmeHtml] = useState<string>('')
  const [loadingReadme, setLoadingReadme] = useState(false)
  const [errorReadme, setErrorReadme] = useState<string | null>(null)

  const [repoData, setRepoData] = useState<IRepository | null>(null)
  const [languages, setLanguages] = useState<{ [key: string]: number }>({})
  const [contributors, setContributors] = useState<IGitHubContributor[]>([])
  const [loadingStats, setLoadingStats] = useState(false)
  const [errorStats, setErrorStats] = useState<string | null>(null)

  useEffect(() => {
    if (!name) return

    const fetchReadme = async () => {
      setLoadingReadme(true)
      setErrorReadme(null)

      try {
        const response = await axios.get<IGitHubReadmeFile>(
          `https://api.github.com/repos/ktsstudio/${name}/readme`,
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        )

        const html = await parseReadmeToHtml(response.data)
        setReadmeHtml(html)
      } catch (err: unknown) {
        if (err instanceof Error) setErrorReadme(err.message)
        else setErrorReadme('Не удалось загрузить README')
      } finally {
        setLoadingReadme(false)
      }
    }

    fetchReadme()
  }, [name, token])

  useEffect(() => {
    if (!name) return

    const fetchRepoStats = async () => {
      setLoadingStats(true)
      setErrorStats(null)

      try {
        const [repoRes, languagesRes, contributorsRes] = await Promise.all([
          axios.get<IGitHubRepo>(
            `https://api.github.com/repos/ktsstudio/${name}`,
            {
              headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
              },
            }
          ),
          axios.get<{ [key: string]: number }>(
            `https://api.github.com/repos/ktsstudio/${name}/languages`,
            {
              headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
              },
            }
          ),
          axios.get<IGitHubContributor[]>(
            `https://api.github.com/repos/ktsstudio/${name}/contributors`,
            {
              headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
              },
            }
          ),
        ])

        setRepoData(mapRepo(repoRes.data))
        setLanguages(languagesRes.data)
        setContributors(contributorsRes.data)
      } catch (err: unknown) {
        if (err instanceof Error) setErrorStats(err.message)
        else setErrorStats('Не удалось загрузить статистику')
      } finally {
        setLoadingStats(false)
      }
    }

    fetchRepoStats()
  }, [name, token])

  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)

  if (loadingStats)
    return <Loader />

  return (
    <div className={`container ${styles.readme__container}`}>
      {errorStats && <p style={{ color: 'red' }}>{errorStats}</p>}
      {!loadingStats && !errorStats && repoData && (
        <div className={styles.statsSection}>
          <div className={styles.repo__header}>
            <Link to={routes.repositories.create()}>
              <ChevronLeft size={32} color='#1f883d'/>
            </Link>

            <div className={styles.repo__titleLink}>
              {
                repoData.avatar &&
                <img
                  src={repoData.avatar}
                  alt='Repo Avatar'
                  className={styles.repoAvatar}
                />
              }
              <Heading view='title' className={styles.repoTitle}>{name}</Heading>
            </div>
          </div>
          {repoData.homepage && (
            <a className={styles.homepage} href={repoData.homepage} target='_blank' rel='noopener noreferrer'>
              <IconLink color='#000' />
              <Heading weight='bold'>{repoData.homepage}</Heading>
            </a>
          )}
          <div className={styles.tags}>
            {repoData.topics?.map(topic => (
              <Heading weight='medium' tag='span' view='p-14' key={topic} className={styles.tag}>{topic}</Heading>
            ))}
          </div>
          <div className={styles.counts}>
            <Heading weight='medium'>
              <Star size={16}/>
              {repoData.stargazersCount} stars
            </Heading>
            <Heading weight='medium'>
              <Eye size={16}/>
              {repoData.watchersCount} watching
            </Heading>
            <Heading weight='medium'>
              <GitFork size={16}/>
              {repoData.forksCount} forks
            </Heading>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.contributors}>
              <Heading tag='h2'>Contributors</Heading>
              {contributors.map(contributor => (
                <div key={contributor.login} className={styles.contributor}>
                  <img src={contributor.avatar_url} alt={contributor.login} className={styles.avatar} />
                  <span>
                    <a href={contributor.html_url} target='_blank' rel='noopener noreferrer'>{contributor.login}</a>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.languages}>
              <Heading tag='h2'>Languages</Heading>
              {Object.keys(languages).map(lang => (
                <div key={lang} className={styles.languageItem}>
                  <div className={styles.languageDot} style={{ backgroundColor: '#ccc' }}></div>
                  <span>{lang}</span>
                  <span className={styles.percentage}>
                    {((languages[lang] / totalBytes) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {loadingReadme && <Loader />}
      {errorReadme && <p style={{ color: 'red' }}>{errorReadme}</p>}
      {!loadingReadme && !errorReadme && readmeHtml && (
        <div className={styles.readme}>
          <Heading weight='bold'>README.md</Heading>
          <div
            className='markdown-body'
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </div>
      )}
      {!loadingReadme && !errorReadme && !readmeHtml && <p>README пуст</p>}
    </div>
  )
}

export default RepositoryPage
