import { useQuery } from '@tanstack/react-query'

import userApi from '@/apis/user.api'
import { type User } from '@/types/user'

const useGetAllUser: () => {
    isLoading: boolean
    users: User[]
} = () => {
    const { data, isFetching } = useQuery({
        queryKey: ['allUsers'],
        queryFn: () =>
            userApi.getAllUsers().then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return []
        },
    })

    return { isLoading: isFetching, users: data }
}
export default useGetAllUser
