import React from "react"

import { ROUTES } from "config/routes"
import { Heart, Star } from "lucide-react"
import { useNavigate } from "react-router"

import type { IGitHubRepoModel } from "shared/interfaces/repository.interface"

import Button from "components/ui/Button"
import Card from "components/ui/Card"

interface FavoriteCardProps {
  repo: IGitHubRepoModel
  isRemoving: boolean
  onToggleFavorite: (e: React.MouseEvent, repo: IGitHubRepoModel) => void
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  repo,
  isRemoving,
  onToggleFavorite,
}) => {
  const navigate = useNavigate()

  return (
    <Card
      key={repo.id}
      image={repo.owner.avatarURL || "https://avatar.vercel.sh/rauchg?size=347"}
      captionSlot={
        <>
          <Star color="#ff9432" size={16} />
          {repo.stargazersCount}
        </>
      }
      title={repo.name}
      subtitle={repo.description}
      onClick={() =>
        navigate(ROUTES.repository.create(repo.owner.login, repo.name))
      }
      actionSlot={
        <Button
          onClick={(e) => onToggleFavorite(e, repo)}
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
}

export default FavoriteCard
