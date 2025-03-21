'use client'

import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from 'src/lib/utils'

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
        VariantProps<typeof labelVariants> & {
            required?: boolean
        }
>(({ className, required = false, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            labelVariants(),
            required &&
                'after:ml-0.5 after:text-destructive after:content-["*"]',
            className
        )}
        {...props}
    />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
