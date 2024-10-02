import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { useDeleteProduct } from '@/hooks/useProduct'

import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { formatMoney } from '@/utils/numberServices'

interface IProductsTableProps {
    loadingProducts: boolean
    products: Product[]
}

export default function ProductsTable({
    loadingProducts,
    products,
}: IProductsTableProps) {
    const { deleteProduct } = useDeleteProduct()

    const handleDeleteProduct = (product: Product) => {
        toast.message('Bạn muốn xóa sản phẩm ?', {
            description: `${product.name}`,
            action: {
                label: 'Xác nhận',
                onClick: () => deleteProduct(product._id),
            },
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Giá tiền</TableHead>
                    <TableHead>Giảm giá</TableHead>
                    <TableHead>Nhà cung cấp</TableHead>
                    <TableHead>Kho hàng</TableHead>
                    <TableHead className="w-[100px]">Hành động</TableHead>
                </TableRow>
                <TableRow className="h-[14px]"></TableRow>
            </TableHeader>
            <TableBody>
                {!loadingProducts &&
                    products.map((product) => (
                        <TableRow key={product._id}>
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
                                    className="flex flex-col items-start justify-start gap-1"
                                >
                                    <Link
                                        to={`/products/${product.slug}`}
                                        className="hover:text-[#2275fb] transition-colors text-base font-semibold"
                                    >
                                        {product.name}
                                    </Link>
                                    <p className="text-xs">
                                        {product.category.name}
                                    </p>
                                </motion.div>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {formatMoney(product.price)}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {product.sale && product.sale + '%'}
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
                                {product.inStock === 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs leading-none p-1 bg-[#fff2ed] w-fit rounded-md font-medium text-[#ff5200]"
                                    >
                                        Hết hàng
                                    </motion.p>
                                )}
                                {product.inStock > 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs leading-none p-1 bg-[#f0fdf4] w-fit rounded-md font-medium text-[#3ecc73]"
                                    >
                                        Còn hàng
                                    </motion.p>
                                )}
                            </TableCell>
                            <TableCell>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center gap-5"
                                >
                                    <button title="Xem sản phẩm">
                                        <Link
                                            to={`/products/${product.slug}`}
                                            target="_blank"
                                        >
                                            <Icon
                                                icon="hugeicons:view"
                                                fontSize={20}
                                                className="cursor-pointer text-[#2377fc]"
                                            />
                                        </Link>
                                    </button>
                                    <button title="Chỉnh sửa">
                                        <Icon
                                            icon="hugeicons:pencil-edit-01"
                                            fontSize={20}
                                            className="cursor-pointer text-[#22c55e]"
                                        />
                                    </button>
                                    <button
                                        title="Xóa"
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
