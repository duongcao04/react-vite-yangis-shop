import { Button } from '@/components/ui/button'

function SocialButton({
    icon,
    title = 'Sign up with google',
}: {
    icon?: React.ReactNode
    title?: string
}) {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full h-[56px] flex items-center justify-center gap-3 rounded-xl !bg-white"
            title={title}
        >
            {icon}
            <p>{title}</p>
        </Button>
    )
}

export default SocialButton
