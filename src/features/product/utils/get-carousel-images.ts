export interface IImagePreviewOptions {
    id: number
    label: string
    icon?: string
    images: string[]
}

export const getCarouselImages: (product: Product) => IImagePreviewOptions[] = (
    product
) => {
    const result = []

    if (product.variants.length === 0) {
        const thumbnail = {
            id: result.length,
            label: 'Ảnh nổi bật',
            icon: 'hugeicons:star-circle',
            images: [...product.thumbnail],
        }
        result.push(thumbnail)
    }

    return result
}
