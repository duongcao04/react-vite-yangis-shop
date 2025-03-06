import { useQuery } from '@tanstack/react-query'

import categoryApi from '@/apis/category.api'
import { Category } from '@/types/category'

export const useGetAllCategories: (params?: object) => {
    isLoading: boolean
    categories: Category[]
} = (params) => {
    const initialData = [{} as Category]
    const placeholderData = [{} as Category]

    const { data, isFetching } = useQuery({
        queryKey: ['categories', params],
        queryFn: () =>
            categoryApi
                .getAllCategories(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        initialData,
        placeholderData,
    })

    return { isLoading: isFetching, categories: data }
}
