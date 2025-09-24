/* eslint-disable react-refresh/only-export-components */
import React from "react"

import { ROUTES } from "config/routes"
import { useDebounce } from "hooks/useDebounce"
import { useLocalStore } from "hooks/useLocalStore"
import { Heart, Star } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useNavigate, useSearchParams } from "react-router"
import { MetaValues } from "shared/types/meta.type"
import GitHubStore from "store/GitHubStore"

import Button from "components/ui/Button"
import Card from "components/ui/Card"
import Loader from "components/ui/Loader"
import Pagination from "components/ui/Pagination"
import Search from "components/ui/Search"

import { formatDate } from "utils/formatDate"

import styles from "./RepositoriesPage.module.scss"
import Heading from "components/ui/Heading"

const RepositoriesPage = () => {
  const navigate = useNavigate()
  const gitHubStore = useLocalStore(() => new GitHubStore())

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? "ktsstudio"
  const page = Number(searchParams.get("page")) || 1
  const perPage = 9

  const [search, setSearch] = React.useState(searchQuery)
  const debouncedSearch = useDebounce(search, 500)

  React.useEffect(() => {
    setSearch(searchQuery)

    if (debouncedSearch !== searchQuery && debouncedSearch) {
      setSearchParams({ search: debouncedSearch, page: "1" })
    }

    if (debouncedSearch) {
      gitHubStore.getOrganizationReposList({
        orgName: debouncedSearch,
        page,
        perPage,
      })
    }
  }, [searchQuery, debouncedSearch, setSearchParams, gitHubStore, page])

  const handlePageChange = (newPage: number) => {
    setSearchParams({ search: searchQuery, page: String(newPage) })
  }

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    repo: (typeof gitHubStore.list)[number]
  ) => {
    e.stopPropagation()
    gitHubStore.toggleFavorite(repo)
  }

  return (
    <div className={styles.repositories__container}>
      <Search value={search} onChange={setSearch} />

      <h2>Search Results</h2>

      { gitHubStore.meta === MetaValues.ERROR && <Heading weight="medium" view="p-24">Ничего не найдено 404</Heading> }

      <div className={styles.repositories}>
        {gitHubStore.meta === MetaValues.LOADING &&
          Array.from({ length: perPage }).map((_, i) => (
            <Loader key={i} size="l" />
          ))}

        {gitHubStore.list.map((rep) => (
          <Card
            key={rep.id}
            image={
              rep.owner.avatarURL || "https://avatar.vercel.sh/rauchg?size=350"
            }
            captionSlot={
              <>
                <Star color="#ff9432" size={16} />
                {rep.stargazersCount} Updated {formatDate(rep.lastUpdate)}
              </>
            }
            title={rep.name}
            subtitle={rep.description}
            onClick={() =>
              navigate(ROUTES.repository.create(searchQuery, rep.name))
            }
            className={styles.repository}
            actionSlot={
              <Button
                onClick={(e) => handleFavoriteClick(e, rep)}
              >
                <Heart
                  size={20}
                  color={gitHubStore.isFavorite(rep.id) ? "#ffc700" : "#ffffff"}
                  fill={gitHubStore.isFavorite(rep.id) ? "#ffc700" : "none"}
                />
              </Button>
            }
          />
        ))}
      </div>

      {gitHubStore.meta !== MetaValues.ERROR && (
        <Pagination
          currentPage={page}
          totalPages={30}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default observer(RepositoriesPage)
