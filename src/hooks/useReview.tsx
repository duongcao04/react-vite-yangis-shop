import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import reviewApi from '@/apis/review.api'

export const useGetReviews: (params?: { product_slug?: string }) => {
    isLoading: boolean
    reviews: Review[]
    totalReview: number
} = (params = {}) => {
    const { data, isFetching } = useQuery({
        queryKey: ['reviews', params],
        queryFn: () =>
            reviewApi.getReviews(params).then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                reviews: [],
                totalReview: 0,
            }
        },
    })
    const { reviews, totalReview } = data
    return { isLoading: isFetching, reviews, totalReview }
}

export const useCreateReview = () => {
    const queryClient = useQueryClient()
    const { isIdle, mutate } = useMutation({
        mutationFn: (newReview: NewReview) => reviewApi.createReview(newReview),
        onSuccess: () => {
            toast.success('Gửi bình luận thành công')
            queryClient.invalidateQueries({ queryKey: ['review'] })
        },
    })

    return { isLoading: isIdle, createReview: mutate }
}
