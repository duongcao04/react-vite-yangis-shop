import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'

import { config } from '@/configs'

export default function CategoryCard({
    isLoading = false,
    data: category,
}: {
    isLoading?: boolean
    data: Category
}) {
    if (isLoading) return <CategoryCardSkeleton />
    if (!isLoading)
        return (
            <Link to={`${config.routes.products}?danh_muc=${category.slug}`} className='block'>
                <div
                    key={category._id}
                    className="h-[170px] rounded-md flex flex-col items-center justify-center gap-4 duration-200 hover:bg-[#DB4444] hover:text-white cursor-pointer bg-white shadow-sm border hover:shadow-lg transition"
                >
                    <div className="p-[6px]">
                        <Icon icon={category.icon} fontSize={44} />
                    </div>
                    <p className="text-base">{category.name}</p>
                </div>
            </Link>
        )
}

export function CategoryCardSkeleton() {
    return (
        <div className='bg-white h-[170px] rounded-md p-3 border flex flex-col items-center justify-center'>
            <Skeleton className='size-[60px]'/>
            <Skeleton className='mt-4 w-[60%] h-[20px]'/>
        </div>
    )
}
