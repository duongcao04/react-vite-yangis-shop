interface INavigate {
    id: number
    path: string
    label: string
    isDirection?: boolean
}

const HEADER_NAVIGATES: INavigate[] = [
    { id: 1, path: '/', label: 'Trang chủ' },
    { id: 2, path: '/products', label: 'Sản phẩm' },
    { id: 3, path: '/posts', label: 'Bài viết' },
    {
        id: 4,
        path: '/about',
        label: 'Về chúng tôi',
    },
    {
        id: 5,
        path: '/contact',
        label: 'Liên hệ',
    },
]

export default HEADER_NAVIGATES
