import React from "react"

import { Eye, GitFork, Star } from "lucide-react"

import Heading from "components/ui/Heading"

import styles from "./RepositoryStats.module.scss"

type RepositoryStatsProps = {
  stars: number
  watchers: number
  forks: number
}

const RepositoryStats: React.FC<RepositoryStatsProps> = ({
  stars,
  watchers,
  forks,
}) => (
  <div className={styles.repository__stats}>
    <Heading
      weight="medium"
      view="p-14"
      style={{ "--hoverColor": "#ff9432" } as React.CSSProperties}
    >
      <Star size={16} />
      {stars} stars
    </Heading>
    <Heading weight="medium" view="p-14">
      <Eye size={16} />
      {watchers} watching
    </Heading>
    <Heading weight="medium" view="p-14">
      <GitFork size={16} />
      {forks} forks
    </Heading>
  </div>
)

export default RepositoryStats
