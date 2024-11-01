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
import { useDeleteProduct } from '@/hooks/useProduct'
import { shortDateFormat } from '@/utils/dateServices'
import { formatMoney } from '@/utils/numberServices'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface IOrdersTableProps {
    loadingOrders: boolean
    orders: Order[]
}

export default function OrdersTable({
    loadingOrders,
    orders,
}: IOrdersTableProps) {
    const { deleteProduct } = useDeleteProduct()

    const handleDeleteCategory = (order: Order) => {
        toast.message('Bạn muốn xóa đơn đặt hàng ?', {
            description: `${order._id}`,
            action: {
                label: 'Xác nhận',
                onClick: () => deleteProduct(order._id),
            },
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Người đặt hàng</TableHead>
                    <TableHead>Tổng cộng</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Thanh toán</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày đặt hàng</TableHead>
                    <TableHead className="w-[100px]">Hành động</TableHead>
                </TableRow>
                <TableRow className="h-[14px]"></TableRow>
            </TableHeader>
            <TableBody>
                {!loadingOrders &&
                    orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-semibold flex items-center justify-start gap-[14px]">
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={order.user.avatar}
                                    alt="user avatar"
                                    className="size-[50px] object-contain rounded-full"
                                />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm font-semibold"
                                >
                                    {order.user.fullName}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {formatMoney(order.totalAmount)}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {1}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {order.paymentMethod === 'cash'
                                        ? 'Tiền mặt'
                                        : 'Chuyển khoản'}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-fit text-xs py-0.5 px-2 rounded-md bg-[#f0fdf4] text-[#22c563] font-medium"
                                >
                                    Thành công
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {shortDateFormat(order.createdAt)}
                                </motion.p>
                            </TableCell>
                            <TableCell>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center gap-5"
                                >
                                    <button title="Xem danh mục">
                                        <Link
                                            to={`/dashboard/orders/${order._id}`}
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
                                            handleDeleteCategory(order)
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
                {loadingOrders &&
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
                                <Skeleton className="w-[60px] h-5 rounded-md" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-[60px] h-5 rounded-md" />
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
