import { action, computed, makeObservable, observable, reaction, runInAction, type IReactionDisposer } from "mobx"
import type { ILocalStore } from "shared/interfaces/localStore.interface"
import {
  type IGitHubRepoAPI,
  type IGitHubRepoModel,
  normilizeRepo,
} from "shared/interfaces/repository.interface"
import {
  type TCollectionMoldel,
  getInitialCollectionModel,
  lineorizeCollection,
  normilizeCollection,
} from "shared/types/colletction.type"
import type { TGetOrganizationReposListParams } from "shared/types/getOrgReposLost.type"
import { HTTPMethod } from "shared/types/httpMethod.type"
import { MetaValues } from "shared/types/meta.type"
import ApiStore from "store/ApiStore"
import rootStore from "store/RootSore"

type PrivateFields = "_list" | "_meta"

class GitHubStore implements ILocalStore {
  private readonly _apiStore = new ApiStore()

  private _list: TCollectionMoldel<number, IGitHubRepoModel> =
    getInitialCollectionModel()
  private _meta: MetaValues = MetaValues.INITIAL

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
    })
  }

  get list(): IGitHubRepoModel[] {
    return lineorizeCollection(this._list)
  }

  get meta(): MetaValues {
    return this._meta
  }

  async getOrganizationReposList(
    params: TGetOrganizationReposListParams
  ): Promise<void> {
    this._meta = MetaValues.LOADING
    this._list = getInitialCollectionModel()

    const response = await this._apiStore.request<IGitHubRepoAPI[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/orgs/${params.orgName}/repos`,
    })

    runInAction(() => {
      if (!response.success || !response.data) {
        this._meta = MetaValues.ERROR
        return
      }

      try {
        const list: IGitHubRepoModel[] = []
        for (const item of response.data) {
          list.push(normilizeRepo(item))
        }

        this._meta = MetaValues.SUCCESS
        this._list = normilizeCollection(list, (listItem) => listItem.id)
        return
      } catch (e) {
        console.log(e)
        this._meta = MetaValues.ERROR
        this._list = getInitialCollectionModel()
      }
    })
  }

  destroy(): void {
    this._qpReaction()
  }
  
  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      console.log(search)
    }
  )
}

export default GitHubStore
