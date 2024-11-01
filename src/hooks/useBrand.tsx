import { useQuery } from '@tanstack/react-query'

import brandApi from '@/apis/brand.api'

export const useGetBrands: (params?: object) => {
    isLoading: boolean
    brands: Brand[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['brands', params],
        queryFn: () =>
            brandApi.getBrands(params ?? {}).then((response) => response.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return { data: [] }
        },
    })

    const { data: brands } = data

    return { isLoading: isFetching, brands }
}
