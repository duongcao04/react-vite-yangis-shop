export type VariantImage = Timestampz & {
    id: string
    image_url: string
    variant?: Variant
}

export type Variant = Timestampz & {
    id: string
    product?: Product
    attribute?: Attribute
    is_active: boolean
    SKU: string
    price: number
    stock_quantity: number
    attribute_values?: {
        id: string
        value: string
    }[]
    images: VariantImage[]
}

export type NewVariant = Pick<Variant, 'price' | 'value' | 'sku' | 'stock'>
