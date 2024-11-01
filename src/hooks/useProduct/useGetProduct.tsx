import { useQuery } from '@tanstack/react-query'

import productApi from '@/apis/product.api'

const useGetProduct: (productId: string) => {
    isLoading: boolean
    product: Product
} = (productId) => {
    const { data, isFetching } = useQuery({
        queryKey: ['product', productId],
        queryFn: () =>
            productApi.getProduct(productId ?? '').then((response) => {
                return response.data
            }),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                data: {} as Product,
            }
        },
    })

    const { data: product } = data

    return { isLoading: isFetching, product }
}

export default useGetProduct
