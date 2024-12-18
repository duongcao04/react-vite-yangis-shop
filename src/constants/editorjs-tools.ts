import AttachesTool from '@editorjs/attaches'
import CodeTool from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
// import ImageTool from '@editorjs/image'
import SimpleImage from '@editorjs/simple-image'
import ChangeCase from 'editorjs-change-case'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
// import Marker from '@editorjs/marker'
import ColorPlugin from 'editorjs-text-color-plugin'

import uploadApi from '@/api/upload.api'

export const EDITOR_JS_TOOLS: {
    [toolName: string]: ToolConstructable | ToolSettings
} = {
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ['anyTuneName'],
    },
    code: CodeTool,
    list: List,
    header: {
        class: Header as unknown as ToolConstructable,
        /**
         * This property will override the common settings
         * That means that this tool will have only Marker and Link inline tools
         * If 'true', the common settings will be used.
         * If 'false' or omitted, the Inline Toolbar wont be shown
         */
        inlineToolbar: ['marker', 'link'],
        config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
            defaultAlignment: 'left',
        },
        tunes: ['anyTuneName'],
        shortcut: 'CMD+SHIFT+H',
    },
    Color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            colorCollections: [
                '#EC7878',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#0070FF',
                '#03A9F4',
                '#00BCD4',
                '#4CAF50',
                '#8BC34A',
                '#CDDC39',
                '#FFF',
            ],
            defaultColor: '#EC7878',
            type: 'text',
            customPicker: true, // add a button to allow selecting any colour
        },
    },
    Marker: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            defaultColor: '#FFBF00',
            type: 'marker',
            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
        },
    },
    delimiter: Delimiter,
    image: {
        class: SimpleImage,
    },
    // image: {
    //     class: ImageTool,
    //     inlineToolbar: true,
    //     config: {
    //         types: 'image/*',
    //         uploader: {
    //             /**
    //              * Upload file to the server and return an uploaded image data
    //              * @param {File} file - file selected from the device or pasted by drag-n-drop
    //              * @return {Promise.<{success, file: {url}}>}
    //              */
    //             async uploadByFile(file: File) {
    //                 return await uploadApi
    //                     .imageUploader(file)
    //                     .then((response) => {
    //                         const { status, data } = response.data
    //                         return {
    //                             success: status === 201 ? 1 : 0,
    //                             file: {
    //                                 url: data,
    //                             },
    //                         }
    //                     })
    //             },
    //         },
    //     },
    // },
    attaches: {
        class: AttachesTool,
        config: {
            endpoint: 'http://localhost:8008/uploadFile',
        },
    },
    // Config Tune name
    anyTuneName: {
        class: AlignmentTuneTool,
        config: {
            default: 'left',
            blocks: {
                header: 'left',
                list: 'left',
            },
        },
    },
    changeCase: {
        class: ChangeCase,
        config: {
            showLocaleOption: true, // enable locale case options
            locale: 'tr', // or ['tr', 'TR', 'tr-TR']
        },
    },
}
