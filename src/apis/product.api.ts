import { AxiosResponse } from 'axios'

import axiosClient, { TReponse } from '@/apis/axiosClient'
import { type Attribute } from '@/types/attribute'
import { Comment } from '@/types/comment'
import { type Product } from '@/types/product'

import { Variant } from '../types/variant'

export interface ProductsResponse {
    products: Partial<Product[]>
    total_count: number
    current_page: number
    page_size: number | string
    total_page: number
}
export interface GetProductParams {
    keyword?: string
    fields?: string
    category?: string
    brand?: string
    sort?: string
}
const productApi = {
    getProducts: async (
        params: GetProductParams
    ): Promise<AxiosResponse<TReponse<ProductsResponse>>> => {
        const url = 'products'
        return await axiosClient.get(url, { params })
    },
    getProductBySlug: async (
        slug: string
    ): Promise<AxiosResponse<TReponse<Product>>> => {
        const url = 'products'
        const params = { slug }
        return await axiosClient.get(url, { params })
    },
    getProductAttributes: async (
        productId: string
    ): Promise<AxiosResponse<TReponse<Attribute[]>>> => {
        const url = `products/${productId}/attributes`
        return await axiosClient.get(url)
    },
    getAllCommentsOfProduct: async (
        productId: string
    ): Promise<AxiosResponse<TReponse<Comment[]>>> => {
        const url = `products/${productId}/comments`
        return await axiosClient.get(url)
    },
    getVariantByAttributes: async (
        productId: string,
        attributes: Record<string, string>
    ): Promise<AxiosResponse<TReponse<Variant>>> => {
        const url = `products/${productId}/variants/findByAttributes`
        const params = attributes
        return await axiosClient.get(url, { params })
    },
    createProduct: async (
        newProduct: FormData
    ): Promise<AxiosResponse<TReponse<Product>>> => {
        const url = 'products'
        return await axiosClient.post(url, newProduct, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
