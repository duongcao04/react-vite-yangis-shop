import { useQuery } from '@tanstack/react-query'

import productApi, { IGetProductsParams } from '@/apis/product.api'

const fetchProducts = async (params: object) => {
    const response = await productApi.getAllProducts(params ?? {})

    const { data } = response.data
    return data ?? []
}

export default function useGetAllProducts(params?: IGetProductsParams) {
    const { data, isFetching } = useQuery({
        queryKey: ['allProduct', params],
        queryFn: fetchProducts,
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return []
        },
    })

    return { isLoading: isFetching, products: data }
}
