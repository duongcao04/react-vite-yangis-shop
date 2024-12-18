import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                placeholder=" "
                className={cn('peer', className)}
                ref={ref}
                {...props}
            />
        )
    }
)
FloatingInput.displayName = 'FloatingInput'

const FloatingLabel = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label> & {
        required?: boolean
    }
>(({ className, required, ...props }, ref) => {
    return (
        <Label
            className={cn(
                'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
                required &&
                    'after:ml-0.5 after:text-destructive after:content-["*"]',
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
FloatingLabel.displayName = 'FloatingLabel'

type FloatingLabelInputProps = InputProps & { label?: string }

const FloatingLabelInput = React.forwardRef<
    React.ElementRef<typeof FloatingInput>,
    React.PropsWithoutRef<FloatingLabelInputProps> & {
        required?: boolean
        classNames?: {
            label: string
            input: string
        }
    }
>(({ id, label, required = false, classNames, ...props }, ref) => {
    return (
        <div className="relative">
            <FloatingInput
                ref={ref}
                id={id}
                {...props}
                className={classNames?.input}
            />
            <FloatingLabel
                htmlFor={id}
                required={required}
                className={classNames?.label}
            >
                {label}
            </FloatingLabel>
        </div>
    )
})
FloatingLabelInput.displayName = 'FloatingLabelInput'

export { FloatingInput, FloatingLabel, FloatingLabelInput }
