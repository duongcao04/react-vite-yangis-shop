import axiosClient from '@/apis/axiosClient'
import { NewCategory } from '@/types/category'

const categoryApi = {
    getAllCategories: async (params: object) => {
        const url = 'categories'
        return await axiosClient.get(url, { params })
    },
    getCategory: async (categoryId: string) => {
        const url = `categories/${categoryId}`
        return await axiosClient.get(url)
    },
    createCategory: async (newCategory: NewCategory) => {
        const url = 'categories'
        return await axiosClient.post(url, newCategory)
    },
}

export default categoryApi
