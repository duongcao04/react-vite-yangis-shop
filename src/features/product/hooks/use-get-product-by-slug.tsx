import { useQuery } from '@tanstack/react-query'

import productApi from '@/apis/product.api'
import { PRODUCT } from '@/data/product'
import { type Product } from '@/types/product'

export function useGetProductBySlug(slug: string): {
    isLoading: boolean
    product: Product
} {
    const placeholderData = PRODUCT
    const initialData = PRODUCT

    const { data, isFetching } = useQuery({
        queryKey: ['product', slug],
        queryFn: () =>
            productApi.getProductBySlug(slug).then((response) => response.data),
        refetchOnWindowFocus: false,
        initialData,
        placeholderData,
    })

    return { isLoading: isFetching, product: data }
}
