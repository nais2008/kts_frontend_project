/* eslint-disable react-refresh/only-export-components */
import React from "react"
import { Frown } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useLocalStore } from "hooks/useLocalStore"
import GitHubStore from "store/GitHubStore"
import type { IGitHubRepoModel } from "shared/interfaces/repository.interface"

import styles from "./FavoritesPage.module.scss"
import FavoriteCard from "components/ui/FavoriteCard"

const FavoritesPage = () => {
  const gitHubStore = useLocalStore(() => new GitHubStore())
  const [removingId, setRemovingId] = React.useState<number | null>(null)

  const handleFavoriteClick = (e: React.MouseEvent, repo: IGitHubRepoModel) => {
    e.stopPropagation()
    setRemovingId(repo.id)

    setTimeout(() => {
      gitHubStore.toggleFavorite(repo)
      setRemovingId(null)
    }, 300)
  }

  if (gitHubStore.favorites.length === 0 && !removingId) {
    return (
      <div className={styles.favorites__empty}>
        <Frown size={48} color="#a0a0a0" />
        <h1>Your favorites list is empty</h1>
        <p>You can add a repository to your favorites from the search page.</p>
      </div>
    )
  }

  return (
    <div className={styles.favorites__container}>
      <h1>Favorite Repositories</h1>
      <div className={styles.repositories}>
        {gitHubStore.favorites.map((rep) => (
          <FavoriteCard
            key={rep.id}
            repo={rep}
            isRemoving={removingId === rep.id}
            onToggleFavorite={handleFavoriteClick}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(FavoritesPage)
