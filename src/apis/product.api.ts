import { AxiosResponse } from 'axios'

import axiosClient from '@/apis/axiosClient'

export interface IGetProductsParams {
    slug?: string
    name?: string
    category?: string
    brand?: string
    order?: string
    sort?: string
}
const productApi = {
    getProducts: async (
        params: IGetProductsParams
    ): Promise<AxiosResponse<Product[]>> => {
        const url = 'products'
        return await axiosClient.get(url, { params })
    },
    getProductBySlug: async (slug: string): Promise<AxiosResponse<Product>> => {
        const url = 'products'
        const params = { slug: slug }
        return await axiosClient.get(url, { params })
    },
    getProductsWithPaginate: async (params: IGetProductsParams) => {
        const url = 'products/paginate'
        return await axiosClient.get(url, { params })
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
