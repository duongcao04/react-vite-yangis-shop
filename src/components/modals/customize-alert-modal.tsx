import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface IAlertModalProps {
    classname?: string
    trigger: React.ReactNode
    overlay?: React.ReactNode
    header?: { title?: React.ReactNode; description?: React.ReactNode }
    body: React.ReactNode
    footer?: React.ReactNode
}

export default function AlertModal({
    trigger,
    header,
    body,
    classname,
    overlay,
    footer,
}: IAlertModalProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogOverlay asChild>{overlay}</AlertDialogOverlay>
            <AlertDialogContent className={classname}>
                {header && (
                    <AlertDialogHeader>
                        {header.title && (
                            <AlertDialogTitle className="text-center">
                                {header.title}
                            </AlertDialogTitle>
                        )}
                        {header.description ? (
                            <AlertDialogDescription>
                                {header.description}
                            </AlertDialogDescription>
                        ) : (
                            <AlertDialogDescription />
                        )}
                    </AlertDialogHeader>
                )}
                {body}
                <AlertDialogFooter>{footer}</AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
