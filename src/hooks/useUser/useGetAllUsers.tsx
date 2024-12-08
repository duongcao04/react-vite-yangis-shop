import { useQuery } from '@tanstack/react-query'

import userApi from '@/apis/user.api'

const useGetAllUser: () => {
    isLoading: boolean
    users: Product[]
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
