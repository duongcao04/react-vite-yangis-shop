import { useQuery } from '@tanstack/react-query'

import categoryApi from '@/apis/category.api'

export const useGetAllCategories: (params?: object) => {
    isLoading: boolean
    categories: Category[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['categories', params],
        queryFn: () =>
            categoryApi
                .getCategories(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return []
        },
    })

    return { isLoading: isFetching, categories: data ?? [] }
}
