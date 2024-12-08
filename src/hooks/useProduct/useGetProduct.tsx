import { useQuery } from '@tanstack/react-query'

import productApi from '@/apis/product.api'

const useGetProduct: (productSlug: string) => {
    isLoading: boolean
    product: Product
} = (productSlug) => {
    const { data, isFetching } = useQuery({
        queryKey: ['product', productSlug],
        queryFn: () =>
            productApi.getProductBySlug(productSlug ?? '').then((response) => {
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
