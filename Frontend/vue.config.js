const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');
const path = require('path');

console.log('Building the application...'); // Log to confirm build process

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      extraFiles: [
        {
          from: path.join(__dirname, 'src/login.html'), // Ensure the correct path
          to: path.join(__dirname, 'dist_electron/login.html') // Ensure it goes to the correct output directory
        }
      ]
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
      },
    },
    plugins: [
      new NodePolyfillPlugin(),
    ],
  },
});
