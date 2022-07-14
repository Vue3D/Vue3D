import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()], resolve: {
        alias: {
            '@vue3d': '/src'
        }
    },
    css: {
        // css预处理器
        // preprocessorOptions: {
        //     less: {
        //         javascriptEnabled: true,
        //         additionalData: `@import "${path.resolve(__dirname, 'cihua/theme/base.less')}";`
        //     }
        // },
    },
})
