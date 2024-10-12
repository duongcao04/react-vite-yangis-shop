import Star from '@/components/icons/Star'

interface IProps {
    data: Review
}

function UserReviewCard({ data }: IProps) {
    return (
        <div className="flex items-start justify-start gap-5 py-6">
            <img className="size-11 rounded-full" src={data.user.avatar} />
            <div className="flex flex-col items-start justify-center gap-2">
                <p className="font-bold">Cao Hải Dương</p>
                <div className="flex items-center justify-center gap-1">
                    {new Array(Number(data.rating))
                        .fill('fill')
                        .map((item, index) => (
                            <Star key={item + index} />
                        ))}
                    {new Array(5 - Number(data.rating))
                        .fill('outline')
                        .map((item, index) => (
                            <Star key={index + item} fill='#bfbfbf'/>
                        ))}
                </div>
                <p className="mt-1 text-xs">{data.comment}</p>
            </div>
        </div>
    )
}

export default UserReviewCard
