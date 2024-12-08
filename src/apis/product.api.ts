import axiosClient from '@/apis/axiosClient'

export interface IGetProductsParams {
    name?: string
    category?: string
    brand?: string
    order?: string
    sort?: string
}

const productApi = {
    getAllProducts: async (params: IGetProductsParams) => {
        const url = 'products'
        return await axiosClient.get(url, { params })
    },
    getProductsWithPaginate: async (params: IGetProductsParams) => {
        const url = 'products/paginate'
        return await axiosClient.get(url, { params })
    },
    getProductBySlug: async (productSlug: string) => {
        const url = `products/${productSlug}`
        return await axiosClient.get(url)
    },
    createProduct: async (newProduct: NewProduct) => {
        const url = 'products/add'
        return await axiosClient.post(url, newProduct, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
    },
    deleteProduct: (productId: string) => {
        const url = `products/${productId}`
        return axiosClient.delete(url)
    },
    updateProduct: (productId: string, updatedProduct: Product) => {
        const url = `products/${productId}`
        return axiosClient.put(url, updatedProduct)
    },
}

export default productApi
