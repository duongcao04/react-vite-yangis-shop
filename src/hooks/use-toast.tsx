import { AlertProps } from '@nextui-org/alert'
import { ExternalToast, toast } from 'sonner'

import CustomizeToast from '@/components/customize-toast'

export const useToast = () => {
    const onToast = (toastProps: AlertProps, data?: ExternalToast) => {
        toast.custom(() => <CustomizeToast {...toastProps} />, {
            className: 'rounded-2xl',
            ...data,
        })
    }

    return { onToast }
}
