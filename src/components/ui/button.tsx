import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'text-primary-foreground',
                destructive:
                    '!bg-destructive text-destructive-foreground hover:!bg-destructive/90',
                outline:
                    'border border-input !bg-background hover:bg-accent hover:text-accent-foreground hover:!bg-slate-200',
                secondary:
                    '!bg-secondary text-secondary-foreground hover:!bg-secondary/80',
                ghost: '!bg-transparent hover:!bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
            colorSchema: {
                default: 'bg-primary hover:bg-primary-800',
                secondary: 'bg-secondary hover:bg-secondary-600',
                danger: 'bg-destructive hover:bg-red-600',
                success: 'bg-success hover:bg-green-600',
                warn: 'bg-warning hover:bg-yellow-600 text-slate-800',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            colorSchema: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
    children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, colorSchema, asChild = false, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <motion.div whileTap={{ scale: 0.9 }}>
                <Comp
                    className={cn(
                        buttonVariants({
                            colorSchema,
                            variant,
                            size,
                            className,
                        })
                    )}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
