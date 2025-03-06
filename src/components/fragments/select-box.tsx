import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { IFilters } from '../../features/product/pages/products'

interface ISelectBoxProps {
    selectList: string[]
    className?: string
    filters: IFilters
    setFilters: (filterRecord: Record<string, string | undefined>) => void
}

export default function SelectBox({
    className,
    filters,
    setFilters,
    selectList,
}: ISelectBoxProps) {
    return (
        <Select
            onValueChange={(value) => {
                setFilters({ price: value })
            }}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={filters.price} />
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
