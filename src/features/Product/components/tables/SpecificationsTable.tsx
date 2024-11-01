import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface IProps {
    data: ProductProperties
}

function SpecificationsTable({ data }: IProps) {
    return (
        <div className="px-2">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium w-[150px]">
                            Kích thước màn hình
                        </TableCell>
                        <TableCell>{data.screen?.size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[150px]">
                            Công nghệ màn hình
                        </TableCell>
                        <TableCell>{data.screen?.technology}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[150px]">
                            Camera sau
                        </TableCell>
                        <TableCell>{data.rearCamera?.rearCamera}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[150px]">
                            Camera trước
                        </TableCell>
                        <TableCell>{data.frontCamera?.frontCamera}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[150px]">
                            RAM
                        </TableCell>
                        <TableCell>{data.storage?.RAM}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[150px]">
                            Bộ nhớ trong
                        </TableCell>
                        <TableCell>{data.storage?.storage}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[150px]">
                            Độ phân giải màn hình
                        </TableCell>
                        <TableCell>{data.screen?.resolution}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default SpecificationsTable
