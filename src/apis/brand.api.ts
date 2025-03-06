import axiosClient from '@/apis/axiosClient'
import type { NewBrand } from '@/types/brand'

const brandApi = {
    getAllBrands: async (params: object) => {
        const url = 'brands'
        return await axiosClient.get(url, { params })
    },
    createBrand: async (newBrand: NewBrand) => {
        const url = 'brands'
        return await axiosClient.post(url, newBrand)
    },
}

export default brandApi
