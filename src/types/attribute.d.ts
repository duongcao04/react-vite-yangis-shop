type Attribute = {
    id: string
    name: string
    product: Product
    variants: Variant[]
}

type NewAttribute = Pick<Attribute, 'name'>
