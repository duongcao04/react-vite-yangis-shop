import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface IPaginationCustomize {
    totalPage: number
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export function PaginationCustomize({
    totalPage,
    currentPage,
    setCurrentPage,
}: IPaginationCustomize) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className="cursor-pointer select-none"
                        onClick={() => {
                            if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                    />
                </PaginationItem>
                {new Array(totalPage).fill('pagination').map((item, index) => (
                    <PaginationItem key={item + index}>
                        <PaginationLink
                            isActive={currentPage === index + 1}
                            onClick={() => {
                                setCurrentPage(index + 1)
                            }}
                            className="cursor-pointer select-none"
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        className="cursor-pointer select-none"
                        onClick={() => {
                            if (currentPage < totalPage)
                                setCurrentPage(currentPage + 1)
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
