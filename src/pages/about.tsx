import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '@/components/customize-breadcrumb'
import { Image } from '@/components/ui/image'

import Focus from '@/assets/Focus_1.png'
import AboutImage from '@/assets/about.png'

export default function AboutPage() {
    return (
        <div>
            <Helmet>
                <title>Về chúng tôi</title>
            </Helmet>
            <div className="container mx-auto my-4">
                <Breadcrumbs />
            </div>

            <div className="bg-white pb-8">
                <div className="bg-gradient-to-tr from-[#b35053] to-[#d9503f] text-white py-24 text-center space-y-5">
                    <h2 className="text-5xl font-extrabold uppercase">
                        Về chúng tôi
                    </h2>
                    <p className="italic">
                        Yangis Ecommerce - nơi cung cấp các sản phẩm điện tử và
                        công nghệ tiên tiến đáng tin cậy
                    </p>
                </div>
                <div className="mt-10 container mx-auto">
                    <div className="flex items-start gap-10">
                        <div className="leading-loose text-lg space-y-2 text-justify">
                            <p className="first-letter:ml-10">
                                Chào mừng bạn đến với{' '}
                                <span className="font-bold">
                                    Yangis Ecommerce
                                </span>
                                , nơi cung cấp các sản phẩm điện tử và công nghệ
                                tiên tiến đáng tin cậy. Được thành lập với niềm
                                đam mê công nghệ, chúng tôi chuyên cung cấp đa
                                dạng sản phẩm bao gồm máy tính, điện thoại thông
                                minh và các phụ kiện công nghệ, giúp nâng cao
                                trải nghiệm số của bạn.
                            </p>
                            <p className="first-letter:ml-10">
                                Tại{' '}
                                <span className="font-bold">
                                    Yangis Ecommerce
                                </span>
                                , chúng tôi không chỉ cung cấp những sản phẩm
                                tốt nhất mà còn mang đến trải nghiệm mua sắm
                                mượt mà. Bộ sưu tập của chúng tôi luôn cập nhật
                                những sản phẩm mới nhất từ các thương hiệu hàng
                                đầu trong ngành công nghệ, đảm bảo bạn luôn có
                                trong tay những thiết bị đáng tin cậy và hiện
                                đại, phù hợp với nhu cầu cá nhân và công việc.
                            </p>
                            <p className="first-letter:ml-10">
                                Chúng tôi cam kết mang lại dịch vụ khách hàng
                                xuất sắc, cung cấp tư vấn chuyên nghiệp, mua sắm
                                trực tuyến an toàn và giao hàng nhanh chóng. Dù
                                bạn đang tìm kiếm một chiếc laptop hiệu năng
                                cao, một chiếc điện thoại thông minh mới nhất
                                hay phụ kiện để hoàn thiện hệ thống của mình,
                                Yangis Ecommerce luôn sẵn sàng giúp bạn tìm được
                                sản phẩm hoàn hảo.
                            </p>
                            <p className="first-letter:ml-10">
                                Cảm ơn bạn đã lựa chọn Yangis Ecommerce. Sự hài
                                lòng của bạn là ưu tiên hàng đầu của chúng tôi
                                và chúng tôi mong muốn được phục vụ mọi nhu cầu
                                công nghệ của bạn!
                            </p>
                        </div>
                        <Image
                            src={AboutImage}
                            alt="about"
                            className="rounded-lg"
                        />
                    </div>
                    <div className=" mt-10 flex items-start gap-10">
                        <Image
                            src={Focus}
                            alt="about"
                            className="rounded-lg w-[500px]"
                        />
                        <div className="leading-loose text-lg space-y-2 text-justify">
                            <div>
                                <p className="font-bold">
                                    Sứ mệnh của chúng tôi
                                </p>
                                <p>
                                    Cung cấp những sản phẩm công nghệ tiên tiến,
                                    mang đến trải nghiệm mua sắm tiện lợi và
                                    dịch vụ hoàn hảo cho khách hàng.
                                </p>
                            </div>
                            <div>
                                <p className="font-bold">
                                    Tầm nhìn của chúng tôi
                                </p>
                                <p>
                                    Trở thành điểm đến trực tuyến hàng đầu cho
                                    những người yêu thích công nghệ, cung cấp
                                    những sản phẩm đột phá nhất và xây dựng mối
                                    quan hệ bền vững với khách hàng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
