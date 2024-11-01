import * as React from 'react'

import { Input, InputProps } from '@/components/ui/input'
import { Icon } from '@iconify/react/dist/iconify.js'

type MultipleImageUploadProps = InputProps

const MultipleImageUpload = React.forwardRef<
    React.ElementRef<typeof Input>,
    React.PropsWithoutRef<MultipleImageUploadProps> & {
        onChange?: (files: File[]) => void
        value: File[]
        required?: boolean
    }
>(({ id, onChange, value, ...props }, ref) => {
    const [selectedFile, setSelectedFile] = React.useState<File[]>([])

    React.useEffect(() => {
        if (value && value.length > 0) {
            // Convert URLs to File objects if necessary
            // This part is hypothetical and depends on your use case
        }
    }, [value])
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const container = containerRef.current

        if (container) {
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault()
                // Handling horizontal scroll inline, without the use of hooks
                const strength = Math.abs(e.deltaY)
                if (e.deltaY === 0) return

                const el = e.currentTarget as HTMLDivElement
                if (
                    !(el.scrollLeft === 0 && e.deltaY < 0) &&
                    !(
                        el.scrollWidth -
                            el.clientWidth -
                            Math.round(el.scrollLeft) ===
                            0 && e.deltaY > 0
                    )
                ) {
                    e.preventDefault()
                }
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: strength > 70 ? 'auto' : 'smooth',
                })
            }

            // Adding event listener with { passive: false }
            container.addEventListener('wheel', handleWheel, { passive: false })

            return () => {
                container.removeEventListener('wheel', handleWheel)
            }
        }
    }, [])

    const handleRemove: (fileName: string) => void = (fileName) => {
        const rest = [...selectedFile]
        const foundExist = rest.findIndex((item) => item.name === fileName)
        rest.splice(foundExist, 1)
        setSelectedFile(rest)
        onChange?.(rest)
    }

    return (
        <React.Fragment>
            <Input
                ref={ref}
                id={id}
                {...props}
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const inputFiles = event.target.files
                    if (inputFiles) {
                        const inputFilesArray = Array.from(inputFiles)
                        const rest = [...selectedFile]
                        inputFilesArray.forEach((file) => {
                            const foundExist = rest.findIndex(
                                (item) => item.name === file.name
                            )
                            if (foundExist === -1) {
                                rest.push(file)
                            }
                        })
                        setSelectedFile(rest)
                        onChange?.(rest)
                    }
                }}
            />
            <div
                className="flex justify-start items-center gap-3 w-full overflow-x-scroll [&>*]:flex-shrink-0 no-scrollbar"
                ref={containerRef}
            >
                <div className="size-[150px] flex flex-col items-center justify-center gap-2.5 border border-dashed px-7 rounded-lg border-[#3facfd]">
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
                {selectedFile &&
                    selectedFile.map((file, index) => {
                        const imageSrc = URL.createObjectURL(file)

                        return (
                            <div
                                key={index}
                                className="group relative size-[150px] rounded-lg border border-[#bebebe]"
                            >
                                <img
                                    src={imageSrc}
                                    alt={id}
                                    className="w-full h-full rounded-lg object-contain"
                                />
                                <button
                                    type="button"
                                    className="hidden group-hover:block absolute top-1 right-1 cursor-pointer p-2 rounded-full bg-[#ffebe1] z-10"
                                    title="Xóa"
                                    onClick={() => {
                                        handleRemove(file.name)
                                    }}
                                >
                                    <Icon
                                        icon="hugeicons:delete-03"
                                        fontSize={20}
                                        className="text-[#ff5200]"
                                    />
                                </button>
                            </div>
                        )
                    })}
            </div>
        </React.Fragment>
    )
})
MultipleImageUpload.displayName = 'MultipleImageUpload'

export { MultipleImageUpload }
