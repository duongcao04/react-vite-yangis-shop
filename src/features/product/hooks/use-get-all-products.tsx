import { useQuery } from '@tanstack/react-query'

import productApi, { GetProductParams } from '@/apis/product.api'
import { Product } from '@/types/product'

export function useGetAllProducts(params?: GetProductParams) {
    const initialData = [{} as Product]
    const placeholderData = [{} as Product]

    const { data, isFetching } = useQuery({
        queryKey: ['allProducts', params],
        queryFn: () =>
            productApi
                .getProducts(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData,
        initialData,
    })
    const { products, total_count, current_page, page_size, total_page } = data

    return {
        isLoading: isFetching,
        products,
        totalPage: total_page,
        pageSize: page_size,
        current_page: current_page,
        totalCount: total_count,
    }
}
