import axiosClient from '@/apis/axiosClient'

const variantApi = {
    getVariants: async (params: object) => {
        const url = 'variant'
        return await axiosClient.get(url, { params })
    },
    createVariant: async (newVariant: NewProductVariant) => {
        const url = 'variant/add'
        return await axiosClient.post(url, newVariant, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
    },
}

export default variantApi
