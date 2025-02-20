import { useQuery } from '@tanstack/react-query'

import productApi from '@/apis/product.api'

export const useGetProductBySlug: (slug: string) => {
    isLoading: boolean
    product: Product
} = (slug) => {
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

    return { isLoading: isFetching, product: data ?? ({} as Product) }
}
