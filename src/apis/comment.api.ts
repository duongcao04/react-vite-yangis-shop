import axiosClient from '@/apis/axiosClient'

const commentApi = {
    getReviews: async (params: object) => {
        const url = 'review'
        return await axiosClient.get(url, { params })
    },
    createReview: async (newReview: NewReview) => {
        const url = 'review/add'
        return await axiosClient.post(url, newReview)
    },
}

export default commentApi
