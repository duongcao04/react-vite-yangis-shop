import * as React from 'react'

import Modal from '@/components/modal/Modal'

import { cn } from '@/lib/utils'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
}

const Image: React.FC<ImageProps> = ({ className, src, ...props }) => {
    return (
        <Modal
            trigger={
                <img
                    className={cn(className, 'cursor-zoom-in')}
                    src={src}
                    {...props}
                />
            }
            overlayClassname="backdrop-blur-md cursor-zoom-out"
            classname="bg-white flex items-center justify-center gap-0 max-h-screen max-w-screen h-fit w-fit bg-transparent p-0 border-none outline-none"
        >
            <div className="h-full w-full bg-white">
                <img
                    src={src}
                    className="scale-150 object-contain w-full h-full"
                />
            </div>
        </Modal>
    )
}

export { Image }
