// ProductType
type Product = Timestamps & {
    _id: string
    name: string
    thumbnail: string
    featureImage: string[]
    price: number
    sale?: string
    description?: string
    variants: ProductVariant[]
    inStock: number
    properties?: ProductProperties
    category: { name: string }
    brand: { name: string }
    reviews?: string[]
}
type ProductProperties = {
    screen?: {
        size?: string
        technology?: string
        resolution?: string
        refreshRate?: string
        type?: string
    }
    rearCamera?: {
        rearCamera?: string[]
        video?: string[]
        features?: string[]
    }
    frontCamera?: {
        frontCamera?: string[]
        video?: string[]
        features?: string[]
    }
    storage?: {
        RAM?: string
        storage?: string
        memoryStick?: string
    }
    battery?: {
        battery?: string
        chargingTechnology?: string[]
        type?: string
    }
}
type NewProduct = Omit<Product, '_id' | keyof Timestamps>

type ProductVariant = Timestamps & {
    _id: string
    label: string
    images: string[]
    inStock: number
}
type NewProductVariant = Omit<
    ProductVariant,
    '_id' | 'images' | keyof Timestamps
> & {
    images: File[]
}

// CartType
type ProductCart = Product & {
    quantity: number
    color: ProductVariant
}

// BrandType
type Brand = Timestamps & {
    _id: string
    name: string
    logo: string
    products: Product[]
}
type NewBrand = Omit<Brand, '_id' | keyof Timestamps>

// CategoryType
type Category = Timestamps & {
    _id: string
    name: string
    thumbnail: string
    icon: string
    products: Product[]
}
type NewCategory = Omit<Category, '_id' | keyof Timestamps>

// OrderType
type Order = Timestamps & {
    _id: string
    user: User
    deliveryInformation: {
        fullName: string
        phone: string
        email?: string
        address: string
    }
    paymentMethod: string
    products: ProductCart[]
    totalAmount: number
    subtotal: number
    shippingFee: number
    bonusPoints: number
}
type NewOrder = Omit<Order, '_id' | 'user' | keyof Timestamps> & {
    user: string
}

// ReviewType
type Review = Timestamps & {
    _id: string
    user: User
    product: Product
    rating: number
    comment: string
}
