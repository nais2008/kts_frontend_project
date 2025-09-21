import React from "react"

import * as Router from "react-router"
import rootStore from "store/RootStore"

export const useQueryParamsStoreInit = (): void => {
  const { search } = Router.useLocation()

  React.useEffect(() => {
    rootStore.query.setSearch(search)
  }, [search])
}
