import { SVGProps } from 'react'

declare module '@editorjs/simple-image'
declare module '@editorjs/paragraph'
declare module '@editorjs/attaches'
declare module 'editorjs-undo'
declare module 'editorjs-drag-drop'
declare module '@editorjs/marker'
declare module 'editorjs-text-color-plugin'
declare module 'editorjs-change-case'
declare module 'editorjs-text-alignment-blocktune'

declare module 'editorjs-drag-drop'

type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number
}
