import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

import Card from 'components/ui/Card'
import Button from 'components/ui/Button'

import { formatDate } from 'utils/formatDate'
import { getVisiblePages } from 'utils/getVisiblePages'
import {
  type IRepository,
  type IGitHubRepo,
  mapRepo,
} from 'shared/interfaces/repository.interface'
import { routes } from 'config/routes'
import { useToken } from 'hooks/useToken'

import styles from './RepositoriesPage.module.scss'
import Search from 'components/ui/Search'
import Loader from 'components/ui/Loader'

const perPage = 9

const RepositoriesPage: React.FC = () => {
  const navigate = useNavigate()
  const [repositories, setRepositories] = React.useState<IRepository[]>([])
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { token } = useToken()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get<IGitHubRepo[]>(
          `https://api.github.com/orgs/ktsstudio/repos`,
          {
            params: { per_page: perPage, page },
            headers: {
              Authorization: `token ${token}`
            }
          },
        )



        setRepositories(response.data.map(mapRepo))

        const linkHeader = response.headers.link || ''
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/)
        setTotalPages(match ? parseInt(match[1], 10) : page)
      } catch (err) {
        setError('Не удалось загрузить репозитории')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, token])

  if (loading)
    return <Loader />

  if (error)
    return <div className={styles.error}>{error}</div>

  return (
    <div className={`container ${styles.rep_content}`}>
      <Search />
      <div className={styles.repositories__container}>
        {repositories.map((rep) => (
          <Card
            key={rep.id}
            image={rep.avatar || 'https://avatar.vercel.sh/rauchg?size=347'}
            captionSlot={
              <span className={styles.repositories__captionSlot}>
                <Star color='#ff9432' size={16}/>
                {rep.stars} {formatDate(rep.lastUpdate)}
              </span>
            }
            title={rep.name}
            subtitle={rep.description || 'Нет описания'}
            onClick={() =>
              navigate(routes.repository.create(rep.name))
            }
          />
        ))}
      </div>
      <div className={styles.repositories__pagination}>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={21}/>
        </Button>

        {getVisiblePages(page, totalPages).map((p, i) =>
          p === '...' ? (
            <span key={i} className={styles.ellipsis}>…</span>
          ) : (
            <Button
              key={i}
              className={p === page ? styles.activePage : ''}
              onClick={() => setPage(Number(p))}
            >
              {p}
            </Button>
          )
        )}

        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={21}/>
        </Button>
      </div>
    </div>
  )
}

export default RepositoriesPage
