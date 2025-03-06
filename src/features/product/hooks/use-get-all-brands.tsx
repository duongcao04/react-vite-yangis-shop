import { useQuery } from '@tanstack/react-query'

import brandApi from '@/apis/brand.api'
import type { Brand } from '@/types/brand'

export const useGetAllBrands: (params?: object) => {
    isLoading: boolean
    brands: Brand[]
} = (params) => {
    const initialData = [{} as Brand]
    const placeholderData = [{} as Brand]

    const { data, isFetching } = useQuery({
        queryKey: ['brands', params],
        queryFn: () =>
            brandApi
                .getAllBrands(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        initialData,
        placeholderData,
    })

    return { isLoading: isFetching, brands: data }
}
