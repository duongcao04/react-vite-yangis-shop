type Variant = Timestampz & {
    id: string
    value: string
    product: Product
    attribute: Attribute
    sku: string
    price: number
    stock: number
}

type NewVariant = Pick<Variant, 'price' | 'value' | 'sku' | 'stock'>
