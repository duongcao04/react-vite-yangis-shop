import axiosClient from './axiosClient'

const userApi = {
    getAllUsers: async () => {
        const url = 'users'
        return await axiosClient.get(url)
    },
}

export default userApi
