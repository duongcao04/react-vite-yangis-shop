interface ILinks {
    title: string
    links: { path: string; label: string }[]
}

const FOOTER_NAVIGATES: ILinks[] = [
    {
        title: 'Support',
        links: [
            {
                path: '#',
                label: '111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.',
            },
            {
                path: '#',
                label: 'exclusive@gmail.com',
            },
            {
                path: '#',
                label: '+88015-88888-9999',
            },
        ],
    },
    {
        title: 'Account',
        links: [
            {
                path: '#',
                label: 'My Account',
            },
            {
                path: '#',
                label: 'Login / Register',
            },
            {
                path: '#',
                label: 'Cart',
            },
            {
                path: '#',
                label: 'Wishlist',
            },
            {
                path: '#',
                label: 'Shop',
            },
        ],
    },
    {
        title: 'Quick Link',
        links: [
            {
                path: '#',
                label: 'Privacy Policy',
            },
            {
                path: '#',
                label: 'Terms Of Use',
            },
            {
                path: '#',
                label: 'FAQ',
            },
            {
                path: '#',
                label: 'Contact',
            },
        ],
    },
]

export default FOOTER_NAVIGATES
