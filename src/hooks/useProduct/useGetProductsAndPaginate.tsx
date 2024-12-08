import { useQuery } from '@tanstack/react-query'

import productApi, { IGetProductsParams } from '@/apis/product.api'

const useGetProductsAndPaginate: (params?: IGetProductsParams) => {
    isLoading: boolean
    products: Product[]
    totalPage: number
    totalProduct: number
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['products', params],
        queryFn: () =>
            productApi
                .getProductsWithPaginate(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                totalProduct: 0,
                totalPage: 0,
                products: [],
            }
        },
    })

    const { products, totalPage, totalProduct } = data
    return { isLoading: isFetching, products, totalPage, totalProduct }
}
export default useGetProductsAndPaginate
