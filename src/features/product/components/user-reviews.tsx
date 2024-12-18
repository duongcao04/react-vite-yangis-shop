import Star from '@/components/icons/star'
import { Progress } from '@/components/ui/progress'

import { ReviewForm } from './review-form'
import UserReviewCard from './cards/user-review-card'

interface IProps {
    data: Review[]
    productId: string
}

function UserReview({ data, productId }: IProps) {
    const calcAverageRate = () => {
        let result = 0
        data.forEach((item) => {
            result += Number(item.rating)
        })
        return Math.round(result / data.length)
    }

    const progressReview = [
        { id: 5, countReviews: 50 },
        { id: 4, countReviews: 30 },
        { id: 3, countReviews: 60 },
        { id: 2, countReviews: 10 },
        { id: 1, countReviews: 25 },
    ]

    return (
        <div>
            {data.length !== 0 && (
                <div className="laptop:grid grid-cols-[456px_1px_1fr] gap-[50px] py-5">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <p className="text-3xl font-bold">
                            {calcAverageRate()} / 5
                        </p>
                        <div className="mt-2 flex items-center justify-center gap-1">
                            {new Array(5).fill('fill').map((item, index) => (
                                <Star
                                    key={item + index}
                                    width={20}
                                    height={19}
                                />
                            ))}
                        </div>
                        <p className="underline underline-offset-4">
                            <span className="font-semibold">{data.length}</span>{' '}
                            đánh giá
                        </p>
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
                                    <Star />
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
            )}

            <div className="border-t mt-5 py-5">
                <ReviewForm productId={productId} />
            </div>

            {data.length > 0 && (
                <div>
                    <p className="text-[16px] leading-none font-semibold mb-3">
                        Nhận xét gần đây
                    </p>
                    <div className="divide-y">
                        {data.map((review) => (
                            <UserReviewCard key={review._id} data={review} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserReview
