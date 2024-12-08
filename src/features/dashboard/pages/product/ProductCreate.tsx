import { FaChevronLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { config } from '@/configs'

import { NewProductForm } from '../../components/forms'

function Heading() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-5">
                <Button asChild variant={'outline'} className="size-12">
                    <Link to={config.routes.dashboard.product.DEFAULT}>
                        <FaChevronLeft />
                    </Link>
                </Button>
                <div className="flex flex-col">
                    <p className="text-sm font-medium opacity-80">
                        Product Table
                    </p>
                    <h2 className="text-2xl font-bold">Create a New product</h2>
                </div>
            </div>
        </div>
    )
}

function ProductCreate() {
    return (
        <div className="w-full h-full">
            <Heading />
            <div className="w-full h-[1px] bg-border my-5" />
            <div className="w-full h-full">
                <NewProductForm />
            </div>
        </div>
    )
}

export default ProductCreate
