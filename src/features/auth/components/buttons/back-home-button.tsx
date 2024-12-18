import { MdOutlineArrowForward } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { config } from '@/config'

function BackHomeButton() {
    return (
        <Link to={config.routes.home} className="block">
            <button
                type="button"
                className="relative w-fit flex items-center justify-center gap-2 px-4 py-1 z-10"
            >
                <div className="flex items-center gap-2 text-white">
                    <p>Go home</p> <MdOutlineArrowForward size={17} />
                </div>
                <div className="absolute w-full h-full bg-white opacity-20 rounded-xl"></div>
            </button>
        </Link>
    )
}

export default BackHomeButton
