import { AxiosResponse } from 'axios'

import { TReponse, axiosAuth } from '@/apis/axiosClient'
import { type User } from '@/types/user'

const userApi = {
    getAllUsers: async (): Promise<AxiosResponse<TReponse<User[]>>> => {
        const url = 'users'
        return await axiosAuth.get(url)
    },
}

export default userApi
