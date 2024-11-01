import * as React from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'

type SingleImageUploadProps = InputProps & { label?: string }

const SingleImageUpload = React.forwardRef<
    React.ElementRef<typeof Input>,
    React.PropsWithoutRef<SingleImageUploadProps> & {
        onChange?: (files: File | undefined) => void
        value: File
        required?: boolean
        className?: string
    }
>(({ id, className, onChange, value, ...props }, ref) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

    React.useEffect(() => {
        if (value) {
            // Convert URLs to File objects if necessary
            // This part is hypothetical and depends on your use case
        }
    }, [value])

    return (
        <React.Fragment>
            {!selectedFile && (
                <div
                    className={cn(
                        'size-[150px] flex flex-col items-center justify-center gap-2.5 border border-dashed px-7 rounded-lg border-[#3facfd]',
                        className
                    )}
                >
                    <Icon
                        icon="hugeicons:image-add-01"
                        fontSize={30}
                        color="#3facfd"
                    />
                    <p className="text-xs text-center">
                        Drop your images here or select{' '}
                        <label
                            className="text-[#3facfd] cursor-pointer"
                            htmlFor={id}
                        >
                            click to browse
                        </label>
                    </p>
                </div>
            )}
            {selectedFile && (
                <div
                    className={cn(
                        'group relative size-[150px] rounded-lg border border-[#bebebe]',
                        className
                    )}
                >
                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="thumbnail"
                        className="w-full h-full rounded-lg object-contain"
                    />
                    <button
                        className="hidden group-hover:block absolute top-1 right-1 cursor-pointer p-2 rounded-full bg-[#ffebe1] z-10"
                        title="Xóa"
                        onClick={() => {
                            onChange?.(undefined)
                            setSelectedFile(null)
                        }}
                    >
                        <Icon
                            icon="hugeicons:delete-03"
                            fontSize={20}
                            className="text-[#ff5200]"
                        />
                    </button>
                </div>
            )}
            <Input
                ref={ref}
                id={id}
                name={id}
                {...props}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const inputFiles = event.target.files
                    if (inputFiles) {
                        setSelectedFile(inputFiles[0])
                        onChange?.(inputFiles[0])
                    }
                }}
            />
        </React.Fragment>
    )
})
SingleImageUpload.displayName = 'SingleImageUpload'

export { SingleImageUpload }
