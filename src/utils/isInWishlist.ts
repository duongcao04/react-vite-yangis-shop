export const isProductInList: (product: Product, list: Product[]) => boolean = (
    product,
    list
) => {
    const foundProductExist = list.findIndex((item) => item._id === product._id)
    return foundProductExist !== -1 ? true : false
}
