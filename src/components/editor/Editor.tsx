import * as React from 'react'

import EditorJS, { OutputData } from '@editorjs/editorjs'
import DragDrop from 'editorjs-drag-drop'
import Undo from 'editorjs-undo'

import { EDITOR_JS_TOOLS } from '@/constants/editorjs-tools'

import './editor.css'

interface IEditorProps {
    data: OutputData
    onChange: React.Dispatch<React.SetStateAction<OutputData>>
    editorblock: string
}
// eslint-disable-next-line react-refresh/only-export-components
const Editor = ({ data, onChange, editorblock }: IEditorProps) => {
    const ref = React.useRef<EditorJS>()
    //Initialize editorjs
    React.useEffect(() => {
        //Initialize editorjs if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorblock,
                onReady: () => {
                    new Undo({ editor })
                    new DragDrop(editor)
                },
                /**
                 * Enable autofocus
                 */
                autofocus: true,
                placeholder: 'Let`s write an awesome story!',
                tools: EDITOR_JS_TOOLS,
                data: data,
                async onChange(api) {
                    const data = await api.saver.save()
                    onChange(data)
                },
            })
            ref.current = editor
        }

        //Add a return function to handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div id={editorblock} />
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Editor)
