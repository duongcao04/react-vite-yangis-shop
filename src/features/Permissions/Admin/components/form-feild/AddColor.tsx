import * as React from 'react'

import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { Input, InputProps } from '@/components/ui/input'
import { useCreateVariant } from '@/hooks/useVariant'
import { Icon } from '@iconify/react'

interface IColor {
    label: string
    images: File[]
    inStock: number
}
type AddColorProps = InputProps

const AddColor = React.forwardRef<
    React.ElementRef<typeof Input>,
    React.PropsWithoutRef<AddColorProps> & {
        id: string
        value: string[]
        onChange: (colors: string[]) => void
    }
>(({ id, value, onChange }, ref) => {
    const { createVariant } = useCreateVariant()
    // Lưu thông tin hiển thị
    const [colorList, setColorList] = React.useState<IColor[]>([])
    // Lưu danh sách các chuỗi id của Gallery được trả về từ server
    const [colorData, setColorData] = React.useState<string[]>([])
    const [label, setLabel] = React.useState<string>('')
    const [inStock, setInStock] = React.useState<string>('')
    const [file, setFile] = React.useState<File[] | null>(null)

    React.useEffect(() => {
        if (value && value.length > 0) {
            // Convert URLs to File objects if necessary
            // This part is hypothetical and depends on your use case
        }
    }, [value])

    return (
        <div id={id} ref={ref}>
            <div className="space-y-2">
                <div className="grid grid-cols-[2fr_1fr_44px] gap-3">
                    <FloatingLabelInput
                        label="Thêm màu mới"
                        value={label}
                        onChange={(e) => {
                            setLabel(e.target.value)
                        }}
                    />
                    <FloatingLabelInput
                        label="Kho"
                        type="number"
                        value={inStock}
                        onChange={(e) => {
                            setInStock(e.target.value)
                        }}
                    />
                    <Button
                        type="button"
                        className="p-1"
                        onClick={async () => {
                            if (file !== null) {
                                setLabel('')
                                setInStock('')
                                setFile(null)
                                const newItem = {
                                    label: label,
                                    images: file,
                                    inStock: +inStock,
                                }
                                const respone = await createVariant(newItem)
                                const rest = [...colorList]
                                rest.push(newItem)
                                setColorList(rest)
                                const colorStringData = [...colorData]
                                colorStringData.push(respone._id)
                                setColorData(colorStringData)
                                onChange?.(colorStringData)
                            }
                        }}
                    >
                        <Icon icon="hugeicons:tick-01" fontSize={30} />
                    </Button>
                </div>
                <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        const inputFiles = e.target.files
                        if (inputFiles) {
                            const inputFilesArray = Array.from(inputFiles)
                            setFile(inputFilesArray)
                        }
                    }}
                />
            </div>
            {colorList.length > 0 &&
                colorList.map((item, index) => (
                    <div key={index} className="text-sm">
                        <div className="h-[1px] w-full bg-border my-3" />
                        <div className="grid grid-cols-2">
                            <div className="flex items-center justify-start gap-1">
                                <p>Màu:</p>
                                <p className="font-semibold">{item.label}</p>
                            </div>
                            <div className="flex items-center justify-start gap-1">
                                <p>Kho:</p>
                                <p className="font-semibold">{item.inStock}</p>
                            </div>
                        </div>
                        <ul className="mt-1 flex items-center justify-start gap-3">
                            {item.images.map((image, index) => {
                                const imageSrc = URL.createObjectURL(image)

                                return (
                                    <li
                                        key={index}
                                        className="border p-1 rounded-xl"
                                    >
                                        <img
                                            src={imageSrc}
                                            alt="src"
                                            className="size-[50px] object-contain"
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
        </div>
    )
})

export default AddColor
