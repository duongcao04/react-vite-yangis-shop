import { Link } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useGetCategories } from '@/hooks/useCategory'
import { useDeleteProduct } from '@/hooks/useProduct'
import { shortDateFormat } from '@/utils/dateServices'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function CategoriesTable() {
    const { isLoading, categories } = useGetCategories()
    const { deleteAProduct } = useDeleteProduct()

    const handleDeleteCategory = (category: Category) => {
        toast.message('Bạn muốn xóa sản phẩm ?', {
            description: `${category.name}`,
            action: {
                label: 'Xác nhận',
                onClick: () => deleteAProduct(category._id),
            },
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Số lượng sản phẩm</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="w-[100px]">Hành động</TableHead>
                </TableRow>
                <TableRow className="h-[14px]"></TableRow>
            </TableHeader>
            <TableBody>
                {!isLoading &&
                    categories.map((category) => (
                        <TableRow key={category._id}>
                            <TableCell className="font-semibold flex items-center justify-start gap-[14px]">
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={category.thumbnail}
                                    alt="thumbnail"
                                    className="size-[50px] object-contain"
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Link
                                        to={`/products?${category._id}`}
                                        className="hover:text-[#2275fb] transition-colors"
                                    >
                                        <p>{category.name}</p>
                                    </Link>
                                </motion.div>
                            </TableCell>
                            <TableCell>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Icon icon={category.icon} fontSize={30} />
                                </motion.div>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {category.products.length}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {shortDateFormat(category.createdAt)}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center gap-5"
                                >
                                    <button title="Xem danh mục">
                                        <Link to={`/products/?${category._id}`}>
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
                                            handleDeleteCategory(category)
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
                {isLoading &&
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
