import { apiClient } from "api/client"
import type { AxiosError } from "axios"
import type { IApiResponse } from "shared/interfaces/apiResponse.interface"
import type { IRequestOptions } from "shared/interfaces/requestOptions.interface"
import { HTTPMethod } from "shared/types/httpMethod.type"
import { HTTPStatus } from "shared/types/httpStatus.type"

export default class ApiStore {
  async request<SuccessT = unknown, ReqT = unknown>(
    params: IRequestOptions<ReqT>
  ): Promise<IApiResponse<SuccessT>> {
    try {
      const response = await apiClient.request<SuccessT>({
        method: params.method,
        url: params.endpoint,
        headers: params.headers,
        data: params.method === HTTPMethod.POST ? params.data : undefined,
        params: params.method === HTTPMethod.GET ? params.params : undefined,
      })

      return {
        success: true,
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      const axiosError = error as AxiosError

      return {
        success: false,
        data: null,
        status: axiosError.response?.status ?? HTTPStatus.UNEXPECTED_ERROR,
        error: axiosError.message ?? "Network error",
      }
    }
  }
}
