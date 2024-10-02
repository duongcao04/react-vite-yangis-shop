import { DialogDescription } from '@radix-ui/react-dialog'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { cn } from '../../lib/utils'

interface IModalProps {
    classname?: string
    trigger: React.ReactNode
    header?: { title: React.ReactNode }
    overlayClassname?: string
    bodyClassname?: string
    children: React.ReactNode
    footer?: React.ReactNode
}

export default function Modal({
    trigger,
    header,
    children,
    classname,
    bodyClassname,
    overlayClassname,
    footer,
}: IModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                className={cn('flex flex-col', classname)}
                overlayClassname={overlayClassname}
            >
                {header && (
                    <DialogHeader id="dialog_header">
                        <DialogTitle className="text-center">
                            {header.title}
                        </DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                )}
                <div id="dialog_body" className={bodyClassname}>
                    {children}
                </div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}
