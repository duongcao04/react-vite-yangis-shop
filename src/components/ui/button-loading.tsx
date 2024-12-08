import { Loader2 } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'

interface ButtonLoading extends ButtonProps {
    isLoading?: boolean
}

export function ButtonLoading({
    isLoading = false,
    children,
    ...props
}: ButtonLoading) {
    return (
        <>
            {isLoading && (
                <Button disabled {...props}>
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Please wait</span>
                </Button>
            )}
            {!isLoading && <Button {...props}>{children}</Button>}
        </>
    )
}
