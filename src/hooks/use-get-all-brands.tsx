import { useQuery } from '@tanstack/react-query'

import brandApi from '@/apis/brand.api'

import { Brand } from '../types/brand'

export const useGetAllBrands: (params?: object) => {
    isLoading: boolean
    brands: Brand[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['brands', params],
        queryFn: () =>
            brandApi
                .getAllBrands(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return { data: [] }
        },
    })

    const { data: brands } = data

    return { isLoading: isFetching, brands }
}
