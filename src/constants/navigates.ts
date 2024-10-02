import { pathConstants } from '@/routes/pathConstants'

interface INavigate {
    id: number
    path: string
    label: string
    isDirection?: boolean
}

const HEADER_NAVIGATES: INavigate[] = [
    { id: 1, path: pathConstants.HOME, label: 'Trang chủ' },
    { id: 2, path: pathConstants.PRODUCTS, label: 'Sản phẩm' },
    { id: 3, path: pathConstants.ARTICLES, label: 'Bài viết' },
    {
        id: 4,
        path: pathConstants.ABOUT,
        label: 'Về chúng tôi',
    },
    {
        id: 5,
        path: pathConstants.CONTACT,
        label: 'Liên hệ',
    },
]

export default HEADER_NAVIGATES
