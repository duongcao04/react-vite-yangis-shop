import axiosClient from '@/apis/axiosClient'

const brandApi = {
    getBrands: async (params: object) => {
        const url = 'brand'
        return await axiosClient.get(url, { params })
    },
    createBrand: async (newBrand: NewBrand) => {
        const url = 'brand/add'
        return await axiosClient.post(url, newBrand)
    },
}

export default brandApi
