import { Icon } from '@iconify/react'

import { Image } from '@/components/ui/image'

export default function GalleryImageCard({ image }: { image: string }) {
    return (
        <div className="relative p-2 group border border-gray-400 rounded-md hover:shadow-lg transition duration-200">
            <Image src={image} />
            <button
                className="hidden group-hover:block absolute top-0 right-0 cursor-pointer p-2 bg-[#fff2ed] rounded-bl-md rounded-tr-md"
                title="Xóa"
            >
                <Icon
                    icon="hugeicons:delete-03"
                    fontSize={20}
                    className="text-[#ff5200]"
                />
            </button>
        </div>
    )
}
