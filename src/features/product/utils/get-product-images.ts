export interface IImagePreviewOptions {
    id: number
    label: string
    icon?: string
    images: string[]
}

const getProductImages: (product: Product) => IImagePreviewOptions[] = (
    product,
) => {
    const result = []

    if (product.featureImage?.length !== 0) {
        result.push({
            id: result.length,
            label: 'Ảnh nổi bật',
            icon: 'hugeicons:star-circle',
            images: product.featureImage,
        })
    }

    product.variants?.forEach((item: ProductVariant) => {
        result.push({
            id: result.length,
            label: item.label,
            images: item.images,
        })
    })

    return result
}

export { getProductImages }
