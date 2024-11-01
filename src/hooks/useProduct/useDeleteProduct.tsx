import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import productApi from '@/apis/product.api'

const useDeleteProduct = () => {
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

export default useDeleteProduct
