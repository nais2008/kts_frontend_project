/* eslint-disable react-refresh/only-export-components */
import React from "react"

import { ROUTES } from "config/routes"
import { useLocalStore } from "hooks/useLocalStore"
import { Frown, Heart, Star } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router"
import type { IGitHubRepoModel } from "shared/interfaces/repository.interface"
import GitHubStore from "store/GitHubStore"

import Button from "components/ui/Button"
import Card from "components/ui/Card"

import styles from "./FavoritesPage.module.scss"

const FavoritesPage = () => {
  const navigate = useNavigate()
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
        {gitHubStore.favorites.map((rep) => {
          const isRemoving = removingId === rep.id

          return (
            <Card
              key={rep.id}
              image={
                rep.owner.avatarURL ||
                "https://avatar.vercel.sh/rauchg?size=347"
              }
              captionSlot={
                <span className={styles.repository__captionSlot}>
                  <Star color="#ff9432" size={16} />
                  {rep.stargazersCount}
                </span>
              }
              title={rep.name}
              subtitle={rep.description}
              onClick={() =>
                navigate(ROUTES.repository.create(rep.owner.login, rep.name))
              }
              className={styles.repository}
              actionSlot={
                <Button
                  className={styles.favoriteButton}
                  onClick={(e) => handleFavoriteClick(e, rep)}
                  disabled={isRemoving}
                >
                  <Heart
                    size={20}
                    color={isRemoving ? "#ffffff" : "#ffc700"}
                    fill={isRemoving ? "none" : "#ffc700"}
                    style={{ transition: "fill 0.2s, color 0.2s" }}
                  />
                </Button>
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default observer(FavoritesPage)
