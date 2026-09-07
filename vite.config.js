import {defineConfig} from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/yaml-ops': {
                target: 'https://devopsagent-backend-aegmehh9gcetepbf.eastus-01.azurewebsites.net',
                changeOrigin: true,
                secure: true,
            },
            '/failure-agent-api': {
                target: 'https://failureagent-aeazhcavfya3c8dm.canadacentral-01.azurewebsites.net',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/failure-agent-api/, ''),
            },
        },
    },
});
