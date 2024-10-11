import { Button } from '@nextui-org/react'
import { FaChevronDown } from 'react-icons/fa6'

import { Progress } from '@/components/ui/progress'

import { ReviewForm } from './ReviewForm'
import UserReviewCard from './UserReviewCard'

interface IProps {
    data: Review[]
    productId: string
}

function UserReview({ data, productId }: IProps) {
    const progressReview = [
        { id: 5, countReviews: 50 },
        { id: 4, countReviews: 30 },
        { id: 3, countReviews: 60 },
        { id: 2, countReviews: 10 },
        { id: 1, countReviews: 25 },
    ]

    return (
        <div>
            <div className="laptop:grid grid-cols-[456px_1px_1fr] gap-[50px] py-5">
                <div className="flex flex-col items-center justify-center gap-3">
                    <p className="text-2xl font-bold">4,9/5</p>
                    <div className="mt-2 flex items-center justify-center gap-3">
                        {new Array(5).fill('fill').map((item, index) => (
                            <svg
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                key={item + index}
                            >
                                <path
                                    d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                                    fill="#FFAD33"
                                />
                            </svg>
                        ))}
                    </div>
                    <p className="underline underline-offset-4">
                        <span className="font-semibold">{data.length}</span>{' '}
                        đánh giá
                    </p>
                    <Button color="primary">Đánh giá ngay</Button>
                </div>
                <div className="h-full bg-gray-300" />
                <div className="mt-12 px-3 laptop:px-10 flex flex-col items-start justify-center gap-3">
                    {progressReview.map((item) => (
                        <div
                            className="flex items-center justify-start gap-3 w-full"
                            key={item.id}
                        >
                            <p className="flex items-center justify-start gap-1">
                                {item.id}
                                <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                                        fill="#FFAD33"
                                    />
                                </svg>
                            </p>
                            <Progress
                                value={item.countReviews}
                                className="w-[450px] h-[10px] ml-2 bg-gray-200"
                            />
                            <p className="text-nowrap ml-3">
                                {item.countReviews} đánh giá
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-b mt-5 py-5">
                <ReviewForm productId={productId} />
            </div>

            <div className="mt-5">
                <p className="text-[16px] leading-none font-semibold mb-3">
                    Nhận xét gần đây
                </p>
                {data.map((review) => (
                    <UserReviewCard key={review._id} data={review} />
                ))}
            </div>
            <div className="mt-5 flex justify-center mb-2">
                <Button color="primary" className="px-20">
                    Xem thêm
                    <FaChevronDown className="ml-2" size={10} />
                </Button>
            </div>
        </div>
    )
}

export default UserReview
