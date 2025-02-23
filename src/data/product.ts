import { type Product } from '../types/product'

export const PRODUCT: Product = {
    id: 'd8bec627-a963-4906-aa76-7a326b6f6137',
    created_at: '2025-02-20T09:33:21.824Z',
    updated_at: '2025-02-20T09:33:21.824Z',
    deleted_at: null,
    name: 'iPhone 15',
    slug: 'iphone-15',
    price: 16990000,
    discount_percentage: 20,
    description: 'Hello Desc',
    thumbnail:
        'https://res.cloudinary.com/dqx1guyc0/image/upload/v1727191769/yangis-ecommerce/products/ddxe5ntaj3agxpal5f8g.jpg',
    is_publish: false,
    view_count: 0,
    brand: {
        id: 'd6183d22-3b7e-456c-9cd6-cd12f4c5221e',
        created_at: '2025-02-20T09:31:09.544Z',
        updated_at: '2025-02-20T09:31:09.544Z',
        deleted_at: null,
        name: 'Apple',
        slug: 'apple',
        logo: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1726504737/yangis-ecommerce/brands/apple.png',
    },
    categories: [
        {
            id: '0f9b02fa-d35d-473a-a988-6575ee864fb3',
            created_at: '2025-02-20T09:31:17.193Z',
            updated_at: '2025-02-20T09:31:17.193Z',
            deleted_at: null,
            name: 'Phone',
            slug: 'phone',
            thumbnail:
                'https://res.cloudinary.com/dqx1guyc0/image/upload/v1726663528/yangis-ecommerce/categories/d5tlrphn5z5ixoz4hz11.jpg',
            description: null,
        },
    ],
    attributes: [],
    variants: [],
    comments: [
        {
            id: '3bb2300e-248e-42ec-9c8a-72526dd06f27',
            created_at: '2025-02-20T10:39:54.026Z',
            updated_at: '2025-02-20T10:39:54.026Z',
            deleted_at: null,
            rating: 3,
            comment: 'Hello comment',
        },
    ],
}
