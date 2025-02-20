export const calcProductPrice = (
    origin: number,
    discount_percentage?: number
) => {
    if (!discount_percentage) {
        return origin
    }

    const discountCost = (discount_percentage / 100) * origin
    return origin - discountCost
}
