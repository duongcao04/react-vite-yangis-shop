import { useQuery } from '@tanstack/react-query'

import productApi, { IGetProductsParams } from '@/apis/product.api'

export function useGetAllProducts(params?: IGetProductsParams) {
    const { data, isFetching } = useQuery({
        queryKey: ['allProducts', params],
        queryFn: () =>
            productApi
                .getProducts(params ?? {})
                .then((response) => response.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return []
        },
    })

    return { isLoading: isFetching, products: data }
}
