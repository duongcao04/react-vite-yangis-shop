import axios, {
    AxiosError,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
} from 'axios'
import { ServerResponse } from 'http'
import { Cookies } from 'react-cookie'

import { config as localConfig } from '@/config'

import authApi from './auth.api'

export type TError = {
    message: string
    error: string
    statusCode: number
}
export type TReponse<T = unknown> = {
    message: string
    data?: T
    statusCode: number
}

const cookie = new Cookies()

const config: CreateAxiosDefaults = {
    // Configuration
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    timeout: 1000 * 60 * 5,
}

const axiosClient = axios.create(config)

export const axiosAuth = axios.create(config)

axiosClient.defaults.headers.common['Accept'] = 'application/json'
axiosClient.defaults.headers.common['Content-Type'] = 'application/json'
axiosClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axiosClient.defaults.headers.common['X-Requested-Store'] = 'default'

// Config interceptor here
axiosClient.interceptors.request.use(
    async (config) => {
        const authToken = await cookie.get('accessToken')

        if (authToken) {
            const authorization = `Bearer ${authToken}`
            axiosAuth.defaults.headers.common['Authorization'] = authorization
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

interface ICustomResponse extends AxiosResponse {
    data: ServerResponse
}

axiosClient.interceptors.response.use(
    (res): ICustomResponse => ({
        ...res,
        data: res.data as ServerResponse,
    }),
    async (error: AxiosError) => {
        try {
            if (error?.response?.status === 401) {
                const refresh = await authApi
                    .refreshToken('refresh token')
                    .catch(async (err: AxiosError) => {
                        if (err.response?.status === 400) {
                            await authApi.logout().then(() => {
                                cookie.remove('accessToken')
                                window.location.href = localConfig.routes.login
                            })
                            window.location.href = localConfig.routes.login
                        }
                    })
                if (refresh?.access_token) {
                    cookie.set('accessToken', refresh?.access_token)
                }
                const originalRequest: InternalAxiosRequestConfig =
                    error.config as InternalAxiosRequestConfig
                if (refresh?.access_token) {
                    originalRequest.headers['Authorization'] =
                        `Bearer ${refresh?.access_token}`

                    axiosClient.defaults.headers.common['Authorization'] =
                        `Bearer ${refresh?.access_token}`
                }
                // requestTime += 1;
                return axiosAuth(originalRequest)
            } else {
                if (
                    error?.response?.status === 401 &&
                    (error?.response?.data as { message: string })?.message !==
                        'Please login'
                ) {
                    // await logout().then(() => {
                    //   cookie.remove("access_token");
                    //   window.location.href = "/login";
                    // });
                }
            }
        } catch (refreshError) {
            // Handle refresh token error
            console.error('Error refreshing token:', refreshError)
            throw refreshError
        }
        return Promise.reject(error)
    }
)

export default axiosClient
