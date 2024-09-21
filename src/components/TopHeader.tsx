import { GoDotFill } from 'react-icons/go'
import { Link } from 'react-router-dom'

export default function TopHeader() {
    const notis = [
        'MacBook tặng Đặc quyền Bảo hành 2 năm',
        'MacBook tặng Đặc quyền Bảo hành 2 năm',
        'MacBook tặng Đặc quyền Bảo hành 2 năm',
        'MacBook tặng Đặc quyền Bảo hành 2 năm',
    ]
    return (
        <div className="bg-white text-black py-1">
            <div className="container mx-auto">
                <ul className='flex items-center justify-between'>
                    {notis.map((noti, idx) => (
                        <li key={idx} className='flex items-center justify-between'>
                            <Link
                                to={'/shop'}
                                className="text-[14px] leading-[32px] font-semibold"
                            >
                                {noti}
                            </Link>
                            {idx !== notis.length - 1 && (
                                <GoDotFill size={10} className='ml-4'/>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
