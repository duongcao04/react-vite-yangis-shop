import { useQuery } from '@tanstack/react-query'

import userApi from '@/apis/user.api'
import { type User } from '@/types/user'

const useGetAllUser: () => {
    isLoading: boolean
    users: User[]
} = () => {
    const initialData = [{} as User]
    const placeholderData = [{} as User]

    const { data, isFetching } = useQuery({
        queryKey: ['allUsers'],
        queryFn: () =>
            userApi.getAllUsers().then((response) => {
                return response.data.data
            }),
        refetchOnWindowFocus: false,
        placeholderData,
        initialData,
    })
    return { isLoading: isFetching, users: data ?? [] }
}
export { useGetAllUser }
