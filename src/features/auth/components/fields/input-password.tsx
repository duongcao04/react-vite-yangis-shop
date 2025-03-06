import { useState } from 'react'

import { Input } from '@nextui-org/input'

import { EyeFilledIcon } from '@/components/icons/eye-filled-icon'
import { EyeSlashFilledIcon } from '@/components/icons/eye-slash-filled-icon'

export default function InputPassword({ ...props }) {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <Input
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    tabIndex={-1}
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            {...props}
            autoComplete="password"
            type={isVisible ? 'text' : 'password'}
        />
    )
}
