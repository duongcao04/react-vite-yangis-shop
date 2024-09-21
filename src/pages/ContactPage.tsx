import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '@/components/Breadcrumbs'

export default function ContactPage() {
    return (
        <div>
            <Helmet>
                <title>Liên hệ</title>
            </Helmet>
            <div className="container mx-auto my-4">
                <Breadcrumbs />
            </div>

            <div className="bg-white pb-8">
                <div className="bg-gradient-to-tr from-[#b35053] to-[#d9503f] text-white py-24 text-center space-y-5">
                    <h2 className="text-5xl font-extrabold uppercase">
                        Liên hệ
                    </h2>
                    <p className="italic">
                        Mọi thông tin thắc mắc vui lòng liên hệ bên dưới
                    </p>
                </div>
                <div className="mt-10 container mx-auto"></div>
            </div>
        </div>
    )
}
