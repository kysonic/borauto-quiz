import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    server: { https: true, host: true, port: 3002 },
    plugins: [
        mkcert(),
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
    ],
});
