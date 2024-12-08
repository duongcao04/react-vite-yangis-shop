import { useQuery } from '@tanstack/react-query'

import productApi, { IGetProductsParams } from '@/apis/product.api'

const useGetAllProducts: (params?: IGetProductsParams) => {
    isLoading: boolean
    products: Product[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['allProducts', params],
        queryFn: () =>
            productApi
                .getAllProducts(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return []
        },
    })

    return { isLoading: isFetching, products: data }
}
export default useGetAllProducts
