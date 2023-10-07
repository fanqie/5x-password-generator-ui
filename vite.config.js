import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'
const timestamp = new Date().getTime()
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()
       ],

    build: {
        outDir:"docs",
        target: "esnext",
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                entryFileNames: `static/[name].${timestamp}.js`,
                chunkFileNames: `static/[name].${timestamp}.js`,
                assetFileNames: `static/[name].${timestamp}.[ext]`
            },
        }
    },
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    css: {

    },

})
