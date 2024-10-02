import * as React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export interface IDashboardPaginationProps {
    currentPage: number
    totalPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function DashboardPagination({
    currentPage,
    setCurrentPage,
    totalPage,
}: IDashboardPaginationProps) {
    return (
        <div className="flex items-center justify-end gap-2.5 font-bold text-sm">
            <button
                className="size-[42px] border rounded-full flex items-center justify-center"
                onClick={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
            >
                <FaChevronLeft size={16} />
            </button>
            {new Array(totalPage).fill('pagination').map((item, index) => (
                <button
                    key={item + index}
                    onClick={() => {
                        setCurrentPage(index + 1)
                    }}
                    className={`size-[42px] border rounded-full flex items-center justify-center ${currentPage === index + 1 ? 'bg-[#2275fc] text-white' : ''}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className="size-[42px] border rounded-full flex items-center justify-center"
                onClick={() => {
                    if (currentPage < totalPage) setCurrentPage(currentPage + 1)
                }}
            >
                <FaChevronRight size={16} />
            </button>
        </div>
    )
}
