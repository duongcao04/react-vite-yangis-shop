import axiosClient from '@/api/axiosClient'

const categoryApi = {
    getCategories: async (params: object) => {
        const url = 'category'
        return await axiosClient.get(url, { params })
    },
    getCategory: async (categoryId: string) => {
        const url = `category/${categoryId}`
        return await axiosClient.get(url)
    },
    createCategory: async (newCategory: Category) => {
        const url = 'category/add'
        return await axiosClient.post(url, newCategory)
    },
}

export default categoryApi
