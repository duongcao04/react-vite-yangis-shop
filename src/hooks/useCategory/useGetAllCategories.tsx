import { useQuery } from '@tanstack/react-query'

import categoryApi from '@/apis/category.api'

const useGetAllCategories: (params?: object) => {
    isLoading: boolean
    categories: Category[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['categories', params],
        queryFn: () =>
            categoryApi
                .getCategories(params ?? {})
                .then((response) => response.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return { data: [] }
        },
    })

    const { data: categories } = data

    return { isLoading: isFetching, categories }
}

export default useGetAllCategories
