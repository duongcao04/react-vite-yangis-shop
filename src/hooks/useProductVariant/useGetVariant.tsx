import { useQuery } from '@tanstack/react-query'

import variantApi from '@/apis/product-variant.api'

const useGetVariants: (params?: object) => {
    isLoading: boolean
    variants: ProductVariant[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['variants', params],
        queryFn: () =>
            variantApi
                .getVariants(params ?? {})
                .then((response) => response.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return { data: [] }
        },
    })

    const { data: variants } = data

    return { isLoading: isFetching, variants }
}

export default useGetVariants
