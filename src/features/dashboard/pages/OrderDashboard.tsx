import * as React from 'react'

import xlsx from 'json-as-xlsx'
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa6'
import { toast } from 'sonner'

import { useGetOrders } from '@/hooks/useOrder'

import SelectBox from '@/components/fragment/SelectBox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { OrdersTable } from '../components/tables'

export default function OrderDashboard() {
    const { isLoading, orders } = useGetOrders()
    const [showing, setShowing] = React.useState<string>('10')

    const handleExport = () => {
        const formatOrder = orders.map((order) => ({
            createdAt: order.createdAt,
            user: order.user.fullName,
            totalAmount: order.totalAmount,
            quantity: '1',
            paymentMethod:
                order.paymentMethod === 'cash'
                    ? 'Thanh toán bằng tiền mặt'
                    : 'Thanh toán qua ngân hàng',
            status: 'Thành công',
        }))

        const data = [
            {
                sheet: 'Đơn đặt hàng',
                columns: [
                    { label: 'Ngày đặt hàng', value: 'createdAt' },
                    { label: 'Người đặt hàng', value: 'user' },
                    {
                        label: 'Tổng cộng',
                        value: 'totalAmount',
                    },
                    { label: 'Số lượng', value: 'quantity' },
                    { label: 'Thanh toán', value: 'paymentMethod' },
                    { label: 'Trạng thái', value: 'status' },
                ],
                content: formatOrder,
            },
        ]
        const settings = {
            fileName: 'yangis-ecommerce-don-dat-hang', // Name of the resulting spreadsheet
            extraLength: 3, // A bigger number means that columns will be wider
            writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
            writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
        }
        xlsx(data, settings)
        toast.success('Tải xuống file thành công')
    }

    return (
        <React.Fragment>
            <h1 className="text-2xl font-bold mb-7">Đơn đặt hàng</h1>
            <div className="bg-white p-6 rounded-xl">
                <div className="grid grid-cols-[200px_1fr_208px] gap-7">
                    <div className="text-xs flex items-center justify-start gap-2.5 w-[200px]">
                        <SelectBox
                            selectList={['10', '20', '30']}
                            defaultValue={showing}
                            setValue={setShowing}
                        />
                        <p className="text-sm text-nowrap">
                            đơn đặt hàng / trang
                        </p>
                    </div>
                    <div>
                        <Input placeholder="Tìm kiếm" />
                    </div>
                    <Button
                        onClick={() => {
                            handleExport()
                        }}
                    >
                        Xuất dưới dạng XLSX
                    </Button>
                </div>
                <div className="mt-6">
                    <OrdersTable loadingOrders={isLoading} orders={orders} />
                </div>
                <div className="mt-6 bg-[#edf1f5] h-[1px] w-full" />
                <div id="pagination" className="mt-6">
                    <div className="flex items-center justify-end gap-2.5 font-bold text-sm">
                        <button className="size-[42px] border rounded-full flex items-center justify-center">
                            <FaChevronLeft size={16} />
                        </button>
                        <button className="size-[42px] border rounded-full flex items-center justify-center">
                            1
                        </button>
                        <button className="size-[42px] border rounded-full flex items-center justify-center bg-[#2275fc] text-white transition-colors">
                            2
                        </button>
                        <button className="size-[42px] border rounded-full flex items-center justify-center">
                            3
                        </button>
                        <button className="size-[42px] border rounded-full flex items-center justify-center">
                            <FaChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
