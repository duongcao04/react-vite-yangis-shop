import { Input } from '@nextui-org/input'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/table'

import { formatMoney } from '@/utils/number-services'

function VariantsTable({ data: productVariants }: { data: ProductVariant[] }) {
    return (
        <Table aria-label="Product Variants Table">
            <TableHeader>
                <TableColumn>Color Name</TableColumn>
                <TableColumn>In stock</TableColumn>
                <TableColumn>Images</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Product hasn't variant."}>
                {productVariants?.map((variant) => (
                    <TableRow key={variant.label}>
                        <TableCell width={250}>
                            <p className="font-medium">{variant.label}</p>
                        </TableCell>
                        <TableCell width={150}>
                            <p className="font-semibold">{variant.inStock}</p>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center justify-start gap-5 overflow-y-scroll">
                                {variant.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt="image"
                                        className="w-[70px] h-[50px] px-2 object-cover border rounded-md"
                                    />
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default function EditProductForm({
    data: product,
    isEditMode,
}: {
    data: Product
    isEditMode: boolean
}) {
    return (
        <form className="grid grid-cols-3 gap-7">
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <img
                            src={product.thumbnail}
                            alt="thumbnail"
                            className="rounded-xl w-[450px] h-[300px] p-5 object-cover bg-white shadow-sm border"
                        />
                        <p className="text-xs font-semibold italic">
                            Thumbnail
                        </p>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8">
                    <div className="flex flex-col gap-7">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Information
                            </h2>
                            <div className="flex flex-col gap-7 mt-3 border rounded-xl p-6">
                                <Input
                                    label="Product Name"
                                    labelPlacement="outside"
                                    value={product.name}
                                    classNames={{
                                        label: 'font-medium opacity-70',
                                        input: 'font-medium text-base',
                                    }}
                                    disabled={!isEditMode}
                                />
                                <div className="grid grid-cols-2 gap-7">
                                    <Input
                                        label="Price"
                                        labelPlacement="outside"
                                        classNames={{
                                            label: 'font-medium opacity-70',
                                            input: 'font-medium text-base',
                                        }}
                                        value={formatMoney(product.price)}
                                        disabled={!isEditMode}
                                    />
                                    <Input
                                        label="Discount"
                                        labelPlacement="outside"
                                        classNames={{
                                            label: 'font-medium opacity-70',
                                            input: 'font-medium text-base',
                                        }}
                                        value={product.sale}
                                        disabled={!isEditMode}
                                    />
                                </div>
                                <Input
                                    label="Category"
                                    labelPlacement="outside"
                                    classNames={{
                                        label: 'font-medium opacity-70',
                                        input: 'font-medium text-base',
                                    }}
                                    value={product.category?.name}
                                    disabled={!isEditMode}
                                />
                                <Input
                                    label="Brand"
                                    labelPlacement="outside"
                                    classNames={{
                                        label: 'font-medium opacity-70',
                                        input: 'font-medium text-base',
                                    }}
                                    value={product.brand?.name}
                                    disabled={!isEditMode}
                                />
                                <div>
                                    <p className="text-sm font-medium opacity-70 mb-3">
                                        Variants
                                    </p>
                                    <VariantsTable data={product.variants} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">
                                Description
                            </h2>
                            <div className="flex flex-col gap-7 mt-3 border rounded-xl p-6"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 h-fit bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-lg font-semibold">Specifications</h2>
                <div className="flex flex-col gap-7 mt-3 border rounded-xl p-6"></div>
            </div>
        </form>
    )
}
