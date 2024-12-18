import { WheelEvent, useEffect, useRef } from 'react'

export default function useHorizontalScroll() {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const onWheel = (event: WheelEvent) => {
        if (!scrollRef.current) return
        if (event.deltaY === 0) return

        event.preventDefault()
        scrollRef.current.scrollTo({
            left: scrollRef.current.scrollLeft + event.deltaY,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const refValueHolder = scrollRef.current
        if (refValueHolder) {
            refValueHolder.addEventListener(
                'wheel',
                onWheel as unknown as EventListener
            )
        }
        return () => {
            if (refValueHolder) {
                refValueHolder.removeEventListener(
                    'wheel',
                    onWheel as unknown as EventListener
                )
            }
        }
    }, [])

    return scrollRef
}
