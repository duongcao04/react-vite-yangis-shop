import axiosClient from '@/apis/axiosClient'

export interface IGetProductsParams {
    name?: string
    category?: string
    brand?: string
    order?: string
    sort?: string
}

const productApi = {
    getProducts: async (params: IGetProductsParams) => {
        const url = 'product'
        return await axiosClient.get(url, { params })
    },
    getProduct: async (productId: string) => {
        const url = `product/${productId}`
        return await axiosClient.get(url)
    },
    createProduct: async (newProduct: NewProduct) => {
        const url = 'product/add'
        return await axiosClient.post(url, newProduct, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
    },
    deleteProduct: (productId: string) => {
        const url = `/product/${productId}`
        return axiosClient.delete(url)
    },
    updateProduct: (productId: string, updatedProduct: Product) => {
        const url = `/product/${productId}`
        return axiosClient.put(url, updatedProduct)
    },
}

export default productApi
