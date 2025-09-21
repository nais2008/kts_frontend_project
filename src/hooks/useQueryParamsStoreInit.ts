import * as Router from "react-router"

import rootStore from "store/RootSore"

export const useQueryParamsStoreInit = (): void => {
  const { search } = Router.useLocation()

  rootStore.query.setSearch(search)
}
