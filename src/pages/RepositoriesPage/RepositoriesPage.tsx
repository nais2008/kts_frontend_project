import React from "react"

import { ROUTES } from "config/routes"
import { useLocalStore } from "hooks/useLocalStore"
import { Star } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router"
import { MetaValues } from "shared/types/meta.type"
import GitHubStore from "store/GitHubStore"

import Card from "components/ui/Card"
import Search from "components/ui/Search"

import { formatDate } from "utils/formatDate"

import styles from "./RepositoriesPage.module.scss"
import { useDebounce } from "hooks/useDebounce"

const RepositoriesPageBase: React.FC = () => {
  const navigate = useNavigate()
  const gitHubStore = useLocalStore(() => new GitHubStore())
  const [ search, setSearch ] = React.useState("ktsstudio")
  const debouncedSearch = useDebounce(search, 500)

  console.log("GitHubReposPage")

  React.useEffect(() => {
    gitHubStore.getOrganizationReposList({ orgName: debouncedSearch });
  }, [debouncedSearch, gitHubStore]);

  return (
    <div className={styles.repositories__container}>
      {gitHubStore.meta === MetaValues.LOADING && <p>Loading...</p>}
      <Search value={search} onChange={setSearch} />
      <div className={styles.repositories}>
        {gitHubStore.list.map((rep) => (
          <Card
            key={rep.id}
            image={
              rep.owner.avatarURL || "https://avatar.vercel.sh/rauchg?size=347"
            }
            captionSlot={
              <span className={styles.repository__captionSlot}>
                <Star color="#ff9432" size={16} />
                {rep.stars} Updated {formatDate(rep.lastUpdate)}
              </span>
            }
            title={rep.name}
            subtitle={rep.description}
            onClick={() => navigate(ROUTES.repository.create(rep.name))}
            className={styles.repository}
          />
        ))}
      </div>
    </div>
  )
}

const RepositoriesPage = observer(RepositoriesPageBase)
export default RepositoriesPage
