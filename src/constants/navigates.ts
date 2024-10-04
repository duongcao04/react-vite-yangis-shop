import { config } from '@/config'

interface INavigate {
    id: number
    path: string
    label: string
    isDirection?: boolean
}

const HEADER_NAVIGATES: INavigate[] = [
    { id: 1, path: config.routes.home, label: 'Trang chủ' },
    { id: 2, path: config.routes.products, label: 'Sản phẩm' },
    { id: 3, path: config.routes.articles, label: 'Bài viết' },
    {
        id: 4,
        path: config.routes.about,
        label: 'Về chúng tôi',
    },
    {
        id: 5,
        path: config.routes.contact,
        label: 'Liên hệ',
    },
]

export default HEADER_NAVIGATES
