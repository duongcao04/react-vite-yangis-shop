import Delivery from '@/assets/svg/delivery.png'
import Customer from '@/assets/svg/customer.png'
import Money from '@/assets/svg/money.png'

interface IService {
    title: string
    description: string
    icon: string
}

const services: IService[] = [
    {
        title: 'FREE AND FAST DELIVERY',
        description: 'Free delivery for all orders over $140',
        icon: Delivery,
    },
    {
        title: '24/7 CUSTOMER SERVICE',
        description: 'Friendly 24/7 customer support',
        icon: Customer,
    },
    {
        title: 'MONEY BACK GUARANTEE',
        description: 'We return money within 30 days',
        icon: Money,
    },
]

export default services
