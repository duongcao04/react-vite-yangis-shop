import { Dispatch, SetStateAction } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface ISelectBoxProps {
    selectList: string[]
    className?: string
    defaultValue?: string
    setValue: Dispatch<SetStateAction<string>>
}

export default function SelectBox({
    className,
    defaultValue,
    setValue,
    selectList,
}: ISelectBoxProps) {
    return (
        <Select onValueChange={setValue}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={defaultValue} />
            </SelectTrigger>
            <SelectContent>
                {selectList.map((item, index) => (
                    <SelectItem key={index} value={item}>
                        {item}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
