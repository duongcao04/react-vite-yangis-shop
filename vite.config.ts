import react from '@vitejs/plugin-react'
import path from 'path'
import { createFilter, defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

function removeUseClient() {
    const filter = createFilter(/.*\.(js|ts|jsx|tsx)$/)

    return {
        name: 'remove-use-client',

        transform(code: string, id: string) {
            if (!filter(id)) {
                return null
            }

            const newCode = code.replace(/['"]use client['"];\s*/g, '')

            return { code: newCode, map: null }
        },
    }
}

export default defineConfig({
    base: './',
    server: {
        port: 3000,
    },
    build: {
        outDir: 'build',
    },
    plugins: [react(), tsconfigPaths(), removeUseClient()],
    resolve: {
        alias: [
            { find: '@src', replacement: path.resolve(__dirname, './src') },
            {
                find: '@ui',
                replacement: path.resolve(__dirname, '../../packages/ui/src'),
            },
        ],
    },
})
