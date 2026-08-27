import {defineConfig} from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/yaml-ops': {
                target: 'https://devopsagent-backend-aegmehh9gcetepbf.eastus-01.azurewebsites.net',
                changeOrigin: true,
                secure: true,
            },
        },
    },
});
