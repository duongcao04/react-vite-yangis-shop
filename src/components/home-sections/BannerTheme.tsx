import Background from '@/assets/images/background.png'
import DeskImage from '@/assets/images/desk_header_beeb2af002.png'
import MobileBackground from '@/assets/images/mobile_background.webp'
import MobileDeskImage from '@/assets/images/mobile_desk_images.webp'
import BannerCarousel from '@/components/carousels/BannerCarousel'

function BannerTheme() {
    return (
        // <div
        //     className="w-full bg-[url('@/assets/images/mobile_background.webp')] laptop:bg-[url('@/assets/images/background.png')] laptop:h-[700px]"
        //     style={{ backgroundRepeat: "no-repeat" }}
        // >
        //     <div className="relative container top-[24px] px-0">
        //         <img
        //             src={DeskImage}
        //             alt="DeskImage"
        //             className="hidden laptop:block"
        //         />
        //         <div className="flex items-center justify-center">
        //             <img
        //                 src={MobileDeskImage}
        //                 alt="MobileDeskImage"
        //                 className="block laptop:hidden"
        //             />
        //         </div>
        //         <div className="container mx-auto mt-[35px] laptop:mt-[85px]">
        //             <BannerCarousel />
        //         </div>
        //     </div>
        // </div>
        <div className="relative w-full h-[400px] laptop:h-[800px]">
            <img
                src={MobileBackground}
                alt="background"
                className="block laptop:hidden w-full select-none"
            />
            <img
                src={Background}
                alt="background"
                className="hidden laptop:block w-full select-none"
            />

            <div className="absolute container top-[24px] laptop:top-[70px] laptop:left-[50%] laptop:translate-x-[-50%] px-0">
                <img
                    src={DeskImage}
                    alt="DeskImage"
                    className="hidden laptop:block select-none"
                />
                <div className="flex items-center justify-center">
                    <img
                        src={MobileDeskImage}
                        alt="MobileDeskImage"
                        className="block laptop:hidden select-none"
                    />
                </div>

                <div className="container mx-auto mt-[35px] laptop:mt-[100px]">
                    <BannerCarousel />
                </div>
            </div>
        </div>
    )
}

export default BannerTheme
