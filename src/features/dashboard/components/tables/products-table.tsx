import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import useDeleteProduct from '@/hooks/use-delete-product'

import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { config } from '@/config'
import type { Product } from '@/types/product'
import { VNDCurrencyFormat } from '@/utils/format'

interface Props {
    loadingProducts: boolean
    products: Product[]
}

export default function ProductsTable({ loadingProducts, products }: Props) {
    const { deleteProduct } = useDeleteProduct()

    const handleDeleteProduct = (product: Product) => {
        toast.message('Are you sure delete the product ?', {
            description: `${product.name}`,
            action: {
                label: 'Confirm',
                onClick: () => deleteProduct(product.id),
            },
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>In stock</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
                <TableRow className="h-[14px]"></TableRow>
            </TableHeader>
            <TableBody>
                {!loadingProducts &&
                    products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="flex items-center justify-start gap-[14px]">
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={product.thumbnail}
                                    alt="thumbnail"
                                    className="size-[50px] object-contain"
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Link
                                        to={`${config.routes.dashboard.product.DEFAULT}/${product.slug}`}
                                        className="hover:text-[#2275fb] transition-colors text-base font-semibold"
                                    >
                                        {product.name}
                                    </Link>
                                </motion.div>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {VNDCurrencyFormat(product.price)}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {product.discount_percentage &&
                                        product.discount_percentage + '%'}
                                    {!product.discount_percentage && '---'}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {product.brand.name}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                {product.price === 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs leading-none p-1 bg-[#fff2ed] w-fit rounded-md font-medium text-[#ff5200]"
                                    >
                                        Out stock
                                    </motion.p>
                                )}
                                {product.price > 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs leading-none p-1 bg-[#f0fdf4] w-fit rounded-md font-medium text-[#3ecc73]"
                                    >
                                        In stock
                                    </motion.p>
                                )}
                            </TableCell>
                            <TableCell>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center gap-5"
                                >
                                    <button title="View">
                                        <Link
                                            to={`${config.routes.products}/${product.slug}`}
                                        >
                                            <Icon
                                                icon="hugeicons:view"
                                                fontSize={20}
                                                className="cursor-pointer text-[#2377fc]"
                                            />
                                        </Link>
                                    </button>
                                    <button title="Edit">
                                        <Icon
                                            icon="hugeicons:pencil-edit-01"
                                            fontSize={20}
                                            className="cursor-pointer text-[#22c55e]"
                                        />
                                    </button>
                                    <button
                                        title="Delete"
                                        onClick={() => {
                                            handleDeleteProduct(product)
                                        }}
                                    >
                                        <Icon
                                            icon="hugeicons:delete-03"
                                            fontSize={20}
                                            className="cursor-pointer text-[#ff5200]"
                                        />
                                    </button>
                                </motion.div>
                            </TableCell>
                        </TableRow>
                    ))}
                {loadingProducts &&
                    new Array(5).fill('table').map((item, index) => (
                        <TableRow key={item + index}>
                            <TableCell className="font-semibold flex items-center justify-start gap-[14px]">
                                <Skeleton className="size-[50px] rounded-md" />
                                <Skeleton className="w-[100px] h-[20px] rounded-md" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-[100px] h-[20px] rounded-md" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-[100px] h-[20px] rounded-md" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-[100px] h-[20px] rounded-md" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-[60px] h-5 rounded-md" />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center gap-5">
                                    <Skeleton className="size-[20px] rounded-md" />
                                    <Skeleton className="size-[20px] rounded-md" />
                                    <Skeleton className="size-[20px] rounded-md" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}
