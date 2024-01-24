import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json' assert { type: 'json' };

const license = `/*!
 * ${ pkg.name }
 * ${ pkg.repository.url }
 * (c) 2024 ${pkg.author}
 * Released under the ${pkg.license} License.
 */`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        hmr: false,
    },
    base: '/harmonograph-3d/',
    build:{
        rollupOptions: {
            output: {
              banner: license,
              // Provide global variables to use in the UMD build
              // for externalized deps
              globals: {
                vue: "Vue",
              },
            },
        },
    }
})
