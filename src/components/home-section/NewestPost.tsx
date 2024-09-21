import React from 'react'

import Ps5 from '@/assets/images/PS5.png'
import Perfume from '@/assets/images/perfume.png'
import Speaker from '@/assets/images/speaker.png'
import Women from '@/assets/images/women.png'

function NewestPost() {
    return (
        <React.Fragment>
            <div className="flex items-center justify-start gap-4">
                <svg
                    width="20"
                    height="40"
                    viewBox="0 0 20 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="20" height="40" rx="4" fill="#DB4444" />
                </svg>
                <p className="font-semibold text-base text-[#DB4444]">
                    Bài viết
                </p>
            </div>
            <h2 className="my-5 text-2xl font-semibold">Bài viết mới nhất</h2>

            <div className="grid grid-rows-4 laptop:grid-cols-4 laptop:grid-rows-2 gap-x-[30px] gap-y-[32px] h-[600px]">
                <div className="relative laptop:col-span-2 row-span-1 laptop:row-span-2 w-full h-full bg-black flex items-end justify-center rounded-sm">
                    <img src={Ps5} alt="ps5" className="size-[50px]" />
                    <div className="absolute bottom-[32px] left-[32px] max-w-[242px] text-white">
                        <p className="text-[24px] leading-[24px] font-semibold font-inter tracking-[3%]">
                            PlayStation 5
                        </p>
                        <p className="mt-4 text-sm leading-[21px]">
                            Black and White version of the PS5 coming out on
                            sale.
                        </p>
                        <p className="mt-[16px] text-base font-medium">
                            Shop Now
                        </p>
                    </div>
                </div>
                <div className="relative laptop:col-span-2 row-span-1 w-full h-full bg-[#0D0D0D] rounded-sm flex items-end justify-end">
                    <img src={Women} alt="women" />
                    <div className="absolute bottom-[24px] left-[24px] max-w-[242px] text-white">
                        <p className="text-[24px] leading-[24px] font-semibold font-inter tracking-[3%]">
                            {`Women's Collections`}
                        </p>
                        <p className="mt-4 text-sm leading-[21px]">
                            Featured woman collections that give you another
                            vibe.
                        </p>
                        <p className="mt-[16px] text-base font-medium">
                            Shop Now
                        </p>
                    </div>
                </div>
                <div className="relative laptop:col-span-1 row-span-1 w-full h-full bg-black rounded-sm flex items-center justify-center">
                    <img src={Speaker} alt="Speaker" className="z-10" />
                    <div className="absolute size-[190px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white blur-[170px]" />
                    <div className="absolute bottom-[24px] left-[24px] max-w-[242px] text-white z-10">
                        <p className="text-[24px] leading-[24px] font-semibold font-inter tracking-[3%]">
                            Speakers
                        </p>
                        <p className="mt-4 text-sm leading-[21px]">
                            Amazon wireless speakers
                        </p>
                        <p className="mt-[16px] text-base font-medium">
                            Shop Now
                        </p>
                    </div>
                </div>
                <div className="relative laptop:col-span-1 row-span-1 w-full h-full bg-black rounded-sm flex items-center justify-center">
                    <img src={Perfume} alt="Perfume" className="z-10" />
                    <div className="absolute size-[190px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white blur-[170px]" />
                    <div className="absolute bottom-[24px] left-[24px] max-w-[242px] text-white z-10">
                        <p className="text-[24px] leading-[24px] font-semibold font-inter tracking-[3%]">
                            Perfume
                        </p>
                        <p className="mt-4 text-sm leading-[21px]">
                            GUCCI INTENSE OUD EDP
                        </p>
                        <p className="mt-[16px] text-base font-medium">
                            Shop Now
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NewestPost
