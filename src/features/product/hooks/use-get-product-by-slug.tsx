import { useQuery } from '@tanstack/react-query'

import productApi from '@/apis/product.api'

export function useGetProductBySlug(slug: string) {
    const { data, isFetching } = useQuery({
        queryKey: ['product', slug],
        queryFn: () =>
            productApi.getProductBySlug(slug).then((response) => {
                return response.data
            }),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {} as Product
        },
    })

    return { isLoading: isFetching, product: data }
}
