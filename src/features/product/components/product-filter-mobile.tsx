import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from '@/components/ui/drawer'

import FilterBar, {
    IFilterBarProps,
} from './products-filter-bar'

interface IMobileFilterDrawerProps extends IFilterBarProps {
    trigger: React.ReactNode
}

function MobileFilterDrawer({
    trigger,
    filter,
    setFilter,
}: IMobileFilterDrawerProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent>
                {/* <DrawerHeader>
                    <DrawerTitle>
                        <div className="flex">
                            <IoFilter
                                className="inline-block mr-3 leading-none align-middle"
                                size={23}
                            />
                            <p>Bộ lọc tìm kiếm</p>
                        </div>
                    </DrawerTitle>
                </DrawerHeader> */}
                <FilterBar filter={filter} setFilter={setFilter} />
                <DrawerFooter>
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            className="w-[calc(50%-10px)]"
                        >
                            Thiết lập lại
                        </Button>
                        <DrawerClose className="w-[calc(50%-10px)]">
                            <Button className="w-full">Áp dụng</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileFilterDrawer
