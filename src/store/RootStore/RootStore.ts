import QueryParamsStore from "store/QueryParamsStore"

class RootStore {
  readonly query = new QueryParamsStore()
}

export default RootStore
