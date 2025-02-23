import { AxiosResponse } from 'axios'

import axiosClient from '@/apis/axiosClient'
import { type Attribute } from '@/types/attribute'
import { type NewProduct, type Product } from '@/types/product'

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
        const params = { slug }
        return await axiosClient.get(url, { params })
    },
    getProductAttributes: async (
        productId: string
    ): Promise<AxiosResponse<Attribute[]>> => {
        const url = `products/${productId}/attributes`
        return await axiosClient.get(url)
    },
    getAllCommentsOfProduct: async (
        productId: string
    ): Promise<AxiosResponse<Comment[]>> => {
        const url = `products/${productId}/comments`
        return await axiosClient.get(url)
    },
    getVariantByAttributes: async (
        productId: string,
        attributes: Record<string, string>
    ) => {
        const url = `products/${productId}/variants/findByAttributes`
        const params = attributes
        return await axiosClient.get(url, { params })
    },
    getProductsWithPaginate: async (params: IGetProductsParams) => {
        const url = 'products/paginate'
        return await axiosClient.get(url, { params })
    },
    createProduct: async (newProduct: NewProduct) => {
        const url = 'products'
        return await axiosClient.post(url, newProduct)
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
