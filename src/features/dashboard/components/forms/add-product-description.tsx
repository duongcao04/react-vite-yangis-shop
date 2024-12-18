import * as React from 'react'

import { OutputData } from '@editorjs/editorjs'

import Editor from '@/components/editor/Editor'
import { Input } from '@/components/ui/input'

type AddProductDescriptionProps = {
    id: string
    initialData: OutputData
}
const AddProductDescription = React.forwardRef<
    React.ElementRef<typeof Input>,
    React.PropsWithoutRef<AddProductDescriptionProps>
>(({ id, initialData }, ref) => {
    const [data, setData] = React.useState<OutputData>(initialData)

    return (
        <div id={id} ref={ref} className="h-full">
            <Editor
                data={data}
                onChange={setData}
                editorblock="editorjs-container"
            />
        </div>
    )
})

export default AddProductDescription
