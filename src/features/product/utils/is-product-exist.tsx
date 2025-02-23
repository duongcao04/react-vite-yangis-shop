import { Product } from '@/types/product'

function isProductExist(product: Product, list: Product[]): boolean {
    const foundIndex = list.findIndex((item) => item.id === product.id)
    return foundIndex === -1 ? false : true
}

export { isProductExist }
