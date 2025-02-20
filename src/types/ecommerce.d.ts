// // ProductType
// type ProductProperties = {
//     screen?: {
//         size?: string
//         technology?: string
//         resolution?: string
//         refreshRate?: string
//         type?: string
//     }
//     rearCamera?: {
//         rearCamera?: string[]
//         video?: string[]
//         features?: string[]
//     }
//     frontCamera?: {
//         frontCamera?: string[]
//         video?: string[]
//         features?: string[]
//     }
//     storage?: {
//         RAM?: string
//         storage?: string
//         memoryStick?: string
//     }
//     battery?: {
//         battery?: string
//         chargingTechnology?: string[]
//         type?: string
//     }
// }
// type Product = Timestampz & {
//     _id: string
//     name: string
//     thumbnail: string
//     featureImage: string[]
//     price: number
//     sale?: string
//     description?: object | string
//     variants: ProductVariant[]
//     inStock: number
//     properties?: ProductProperties
//     category: { name: string }
//     brand: { name: string }
//     reviews?: string[]
//     slug: string
// }
// type NewProduct = Omit<
//     Product,
//     | '_id'
//     | 'category'
//     | 'brand'
//     | 'variants'
//     | 'slug'
//     | 'featureImage'
//     | 'thumbnail'
//     | keyof Timestampz
// > & {
//     name: string
//     thumbnail: File
//     featureImage: File[]
//     category: string
//     brand: string
//     variants: NewProductVariant[]
//     slug?: string
// }

// type ProductVariant = Timestampz & {
//     _id: string
//     label: string
//     images: string[]
//     inStock: number
// }
// type NewProductVariant = Omit<ProductVariant, 'images' | keyof Timestampz> & {
//     images: File[]
// }

// // CartType
// type NewCartItem = {
//     product: Product
//     quantity: number
//     variant: ProductVariant
// }
// type CartItem = NewCartItem & {
//     id: string
// }
// type Cart = CartItem[]

// // BrandType
// type Brand = Timestampz & {
//     _id: string
//     name: string
//     slug: string
//     logo: string
//     products: Product[]
// }
// type NewBrand = Omit<Brand, '_id' | keyof Timestampz>

// // CategoryType
// type Category = Timestampz & {
//     _id: string
//     name: string
//     slug: string
//     thumbnail: string
//     icon: string
//     products: Product[]
// }
// type NewCategory = Omit<Category, '_id' | 'products' | keyof Timestampz>

// // OrderType
// type Order = Timestampz & {
//     _id: string
//     user: User
//     deliveryInformation: {
//         fullName: string
//         phone: string
//         email?: string
//         address: string
//     }
//     paymentMethod: string
//     products: ProductCart[]
//     totalAmount: number
//     subtotal: number
//     shippingFee: number
//     bonusPoints: number
// }
// type NewOrder = Omit<Order, '_id' | 'user' | keyof Timestampz> & {
//     user: string
// }

// // ReviewType
// type NewReview = {
//     user: string
//     product: string
//     rating: number
//     comment: string
// }
// type Review = Timestampz &
//     Omit<NewReview, 'user' | 'product'> & {
//         _id: string
//         user: { avatar: string }
//         product: Product | string
//     }
