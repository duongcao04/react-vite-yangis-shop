import categoryApi from '@/api/category.api'
import { useQuery } from '@tanstack/react-query'

export const useGetCategories: (params?: object) => {
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
