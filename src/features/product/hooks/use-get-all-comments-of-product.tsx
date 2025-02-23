import { useQuery } from '@tanstack/react-query'

import productApi from '@/apis/product.api'
import { type Comment } from '@/types/comment'

export function useGetAllCommentsOfProduct(productId: string): {
    isLoading: boolean
    comments: Comment[]
} {
    const { data, isFetching } = useQuery({
        queryKey: ['comments', productId],
        queryFn: () =>
            productApi
                .getAllCommentsOfProduct(productId)
                .then((response) => response.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return []
        },
    })

    return { isLoading: isFetching, comments: data }
}
