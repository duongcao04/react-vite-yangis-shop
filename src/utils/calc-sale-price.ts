export const calcSalePrice = (origin: number, sale: string) => {
    if (sale.length > 0) {
        const saleNumber = sale.slice(0, sale.length - 1)
        return origin - origin * (+saleNumber / 100)
    } else {
        return origin
    }
}
