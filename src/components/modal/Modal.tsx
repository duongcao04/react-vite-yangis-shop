import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface IModalProps {
    classname?: string
    trigger: React.ReactNode
    header?: { title?: React.ReactNode; description?: React.ReactNode }
    body: React.ReactNode
    footer?: React.ReactNode
}

export default function Modal({
    trigger,
    header,
    body,
    classname,
    footer,
}: IModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={classname}>
                {header && (
                    <DialogHeader>
                        {header.title && (
                            <DialogTitle className="text-center">
                                {header.title}
                            </DialogTitle>
                        )}
                        {header.description ? (
                            <DialogDescription>
                                {header.description}
                            </DialogDescription>
                        ) : (
                            <DialogDescription />
                        )}
                    </DialogHeader>
                )}
                {body}
                <DialogFooter>{footer}</DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
