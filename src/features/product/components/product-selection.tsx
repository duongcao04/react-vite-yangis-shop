import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { type Attribute } from '@/types/attribute'
import { isObjectEmpty } from '@/utils/is-object-empty'

interface Props {
    isLoading: boolean
    data: Attribute[]
    variantFilters: Record<string, string>
    onChangeVariantFilters: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >
}

function ProductSelection({
    isLoading,
    data,
    variantFilters,
    onChangeVariantFilters,
}: Props) {
    const onChangeHanler = (attributeName: string, attributeValue: string) => {
        const rest = { ...variantFilters }
        rest[`${attributeName}`] = attributeValue
        onChangeVariantFilters(rest)
    }

    return (
        <>
            {!isLoading &&
                data.map((attribute, index) => (
                    <motion.div
                        key={attribute.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 grid grid-cols-[100px_1fr] gap-6 items-center"
                    >
                        <p className="mt-2 text-sm font-medium font-inter text-nowrap">
                            {attribute.name}
                        </p>
                        <div className="flex items-center justify-start gap-2 flex-wrap">
                            {attribute?.values.map((value) => {
                                const isSelected =
                                    !isObjectEmpty(variantFilters) &&
                                    Object.entries(variantFilters)[index][0] ===
                                        attribute.name.toLowerCase() &&
                                    Object.entries(variantFilters)[index][1] ===
                                        value.value.toLowerCase()

                                return (
                                    <Button
                                        key={value.id}
                                        variant={
                                            isSelected ? 'default' : 'outline'
                                        }
                                        onClick={() => {
                                            const attributeName =
                                                attribute.name.toLowerCase()
                                            const attributeValue =
                                                value.value.toLowerCase()

                                            onChangeHanler(
                                                attributeName,
                                                attributeValue
                                            )
                                        }}
                                        className={`py-1 px-3 rounded-md font-semibold`}
                                    >
                                        {value.value}
                                    </Button>
                                )
                            })}
                        </div>
                    </motion.div>
                ))}
            <div className="mt-6 grid grid-cols-[100px_1fr] gap-6 items-center">
                {isLoading &&
                    new Array(5)
                        .fill('productVariant')
                        .map((item, index) => (
                            <Skeleton
                                key={item + index}
                                className="w-[65px] h-[40px] rounded-md"
                            />
                        ))}
            </div>
        </>
    )
}

export default ProductSelection
