import productApi, { IGetProductsParams } from '@/api/product.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useGetProducts: (params?: IGetProductsParams) => {
    isLoading: boolean
    products: Product[]
    totalPage: number
    totalProduct: number
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['products', params],
        queryFn: () =>
            productApi
                .getProducts(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                totalProduct: 0,
                totalPage: 0,
                products: [],
            }
        },
    })

    const { products, totalPage, totalProduct } = data
    return { isLoading: isFetching, products, totalPage, totalProduct }
}

export const useGetProduct: (productId: string) => {
    isLoading: boolean
    product: Product
} = (productId) => {
    const { data, isFetching } = useQuery({
        queryKey: ['product', productId],
        queryFn: () =>
            productApi.getProduct(productId ?? '').then((response) => {
                return response.data
            }),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                data: {} as Product,
            }
        },
    })

    const { data: product } = data

    return { isLoading: isFetching, product }
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    const { isIdle, mutate } = useMutation({
        mutationFn: (newProduct: NewProduct) =>
            productApi.createProduct(newProduct),
        onSuccess: () => {
            toast.success('Thêm mới sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    return { isLoading: isIdle, createProduct: mutate }
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    const { isIdle, mutate } = useMutation({
        mutationFn: (productId: string) => productApi.deleteProduct(productId),
        onSuccess: () => {
            toast.success('Xóa sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    return { isLoading: isIdle, deleteProduct: mutate }
}
