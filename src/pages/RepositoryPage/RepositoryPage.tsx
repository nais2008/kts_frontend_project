import React, { useEffect, useState } from "react"

import axios from "axios"
import { ROUTES } from "config/routes"
import "github-markdown-css/github-markdown-light.css"
import { useToken } from "hooks/useToken"
import { ChevronLeft, Eye, GitFork, Link as IconLink, Star } from "lucide-react"
import { Link, useParams } from "react-router"
import type {
  IGitHubContributor,
  IGitHubReadmeFile,
} from "shared/interfaces/readme.interface"
import {
  type IGitHubRepo,
  type IRepository,
  mapRepo,
} from "shared/interfaces/repository.interface"

import Heading from "components/ui/Heading"
import Loader from "components/ui/Loader"

import { generateLanguageProcentage } from "utils/generateLanguageProcentage"
import { parseReadmeToHtml } from "utils/parseReadmeFileToHtml"
import { getLangColor } from "utils/setLangColor"

import styles from "./RepositoryPage.module.scss"

const RepositoryPage: React.FC = () => {
  // const { name } = useParams<{ name: string }>()
  // const { token } = useToken()
  // const [readmeHtml, setReadmeHtml] = useState<string>("")
  // const [loadingReadme, setLoadingReadme] = useState(false)
  // const [errorReadme, setErrorReadme] = useState<string | null>(null)
  // const [repoData, setRepoData] = useState<IRepository | null>(null)
  // const [languages, setLanguages] = useState<{ [key: string]: number }>({})
  // const [contributors, setContributors] = useState<IGitHubContributor[]>([])
  // const [loadingStats, setLoadingStats] = useState(false)
  // const [errorStats, setErrorStats] = useState<string | null>(null)
  // useEffect(() => {
  //   if (!name) return
  //   const fetchReadme = async () => {
  //     setLoadingReadme(true)
  //     setErrorReadme(null)
  //     try {
  //       const response = await axios.get<IGitHubReadmeFile>(
  //         `https://api.github.com/repos/ktsstudio/${name}/readme`,
  //         {
  //           headers: {
  //             Authorization: `token ${token}`,
  //             Accept: "application/vnd.github.v3+json",
  //           },
  //         }
  //       )
  //       const html = await parseReadmeToHtml(response.data)
  //       setReadmeHtml(html)
  //     } catch (err: unknown) {
  //       if (err instanceof Error) setErrorReadme(err.message)
  //       else setErrorReadme("Не удалось загрузить README")
  //     } finally {
  //       setLoadingReadme(false)
  //     }
  //   }
  //   fetchReadme()
  // }, [name, token])
  // useEffect(() => {
  //   if (!name) return
  //   const fetchRepoStats = async () => {
  //     setLoadingStats(true)
  //     setErrorStats(null)
  //     try {
  //       const [repoRes, languagesRes, contributorsRes] = await Promise.all([
  //         axios.get<IGitHubRepo>(
  //           `https://api.github.com/repos/ktsstudio/${name}`,
  //           {
  //             headers: {
  //               Authorization: `token ${token}`,
  //               Accept: "application/vnd.github.v3+json",
  //             },
  //           }
  //         ),
  //         axios.get<{ [key: string]: number }>(
  //           `https://api.github.com/repos/ktsstudio/${name}/languages`,
  //           {
  //             headers: {
  //               Authorization: `token ${token}`,
  //               Accept: "application/vnd.github.v3+json",
  //             },
  //           }
  //         ),
  //         axios.get<IGitHubContributor[]>(
  //           `https://api.github.com/repos/ktsstudio/${name}/contributors`,
  //           {
  //             headers: {
  //               Authorization: `token ${token}`,
  //               Accept: "application/vnd.github.v3+json",
  //             },
  //           }
  //         ),
  //       ])
  //       setRepoData(mapRepo(repoRes.data))
  //       setLanguages(languagesRes.data)
  //       setContributors(contributorsRes.data)
  //     } catch (err: unknown) {
  //       if (err instanceof Error) setErrorStats(err.message)
  //       else setErrorStats("Не удалось загрузить статистику")
  //     } finally {
  //       setLoadingStats(false)
  //     }
  //   }
  //   fetchRepoStats()
  // }, [name, token])
  // if (loadingStats) return <Loader />
  // return (
  //   <div className={styles.repository__container}>
  //     {errorStats && <p style={{ color: "red" }}>{errorStats}</p>}
  //     {!loadingStats && !errorStats && repoData && (
  //       <div className={styles.statsSection}>
  //         <div className={styles.repository__header}>
  //           <Link to={ROUTES.repositories.create()}>
  //             <ChevronLeft size={32} color="#1f883d" />
  //           </Link>
  //           <div className={styles.repository__titleLink}>
  //             {repoData.avatar && (
  //               <img
  //                 src={repoData.avatar}
  //                 alt="Repo Avatar"
  //                 className={styles.repository__avatar}
  //               />
  //             )}
  //             <Heading view="title" className={styles.repository__title}>
  //               {name}
  //             </Heading>
  //           </div>
  //         </div>
  //         {repoData.homepage && (
  //           <a
  //             className={styles.repository__homepage}
  //             href={repoData.homepage}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             <IconLink color="#000" />
  //             <Heading weight="bold">{repoData.homepage}</Heading>
  //           </a>
  //         )}
  //         <div className={styles.repository__tags}>
  //           {repoData.topics?.map((topic) => (
  //             <Heading
  //               weight="medium"
  //               tag="span"
  //               view="p-14"
  //               key={topic}
  //               className={styles.tag}
  //             >
  //               {topic}
  //             </Heading>
  //           ))}
  //         </div>
  //         <div className={styles.repository__stats}>
  //           <Heading
  //             weight="medium"
  //             view="p-14"
  //             style={{ "--hoverColor": "#ff9432" } as React.CSSProperties}
  //           >
  //             <Star size={16} />
  //             {repoData.stargazersCount} stars
  //           </Heading>
  //           <Heading weight="medium" view="p-14">
  //             <Eye size={16} />
  //             {repoData.watchersCount} watching
  //           </Heading>
  //           <Heading weight="medium" view="p-14">
  //             <GitFork size={16} />
  //             {repoData.forksCount} forks
  //           </Heading>
  //         </div>
  //         <div className={styles.repository__info}>
  //           <div className={styles.repository__contributors}>
  //             <Heading tag="h2">Contributors</Heading>
  //             {contributors.map((contributor) => (
  //               <a
  //                 href={contributor.html_url}
  //                 key={contributor.login}
  //                 className={styles.repository__contributor}
  //               >
  //                 <img
  //                   src={contributor.avatar_url}
  //                   alt={contributor.login}
  //                   className={styles.contributor__avatar}
  //                 />
  //                 <Heading
  //                   view="p-16"
  //                   color="primary"
  //                   weight="medium"
  //                   className={styles.contributor__name}
  //                 >
  //                   {contributor.login}
  //                 </Heading>
  //               </a>
  //             ))}
  //           </div>
  //           <div className={styles.repository__languages}>
  //             <Heading tag="h2">Languages</Heading>
  //             {Object.keys(languages).map((lang) => (
  //               <div key={lang} className={styles.repository__language}>
  //                 <div
  //                   className={styles.language__color}
  //                   style={
  //                     {
  //                       "--langColor": getLangColor(lang),
  //                     } as React.CSSProperties
  //                   }
  //                 ></div>
  //                 <Heading view="p-14" color="primary" weight="medium">
  //                   {lang}
  //                 </Heading>
  //                 <Heading view="p-14" color="secondary">
  //                   {generateLanguageProcentage(languages[lang], languages)}%
  //                 </Heading>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //     {!loadingReadme && !errorReadme && readmeHtml && (
  //       <div className={styles.repository__readme}>
  //         <Heading weight="bold">README.md</Heading>
  //         <div
  //           className="markdown-body"
  //           dangerouslySetInnerHTML={{ __html: readmeHtml }}
  //         />
  //       </div>
  //     )}
  //   </div>
  // )
}

export default RepositoryPage
