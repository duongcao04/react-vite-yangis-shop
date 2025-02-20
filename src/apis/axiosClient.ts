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

const cookie = new Cookies()

const config: CreateAxiosDefaults<any> = {
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

let requestTime = 0
let authToken: string = ''

// Config interceptor here
axiosClient.interceptors.request.use(
    async (config) => {
        const authToken = cookie.get('access_token') || ''
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`
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
                // if (requestTime >= 6) {
                //   return;
                // }

                const refresh = await authApi
                    .refreshToken('refresh token')
                    .catch(async (err: AxiosError) => {
                        if (err.response?.status === 400) {
                            await authApi.logout().then(() => {
                                cookie.remove('access_token')
                                window.location.href = localConfig.routes.login
                            })
                            window.location.href = localConfig.routes.login
                        }
                    })
                if (refresh?.access_token) {
                    cookie.set('access_token', refresh?.access_token)
                }
                const originalRequest: InternalAxiosRequestConfig<any> =
                    error.config as InternalAxiosRequestConfig<any>
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
