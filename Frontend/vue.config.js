const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
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
