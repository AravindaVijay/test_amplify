// config-overrides.js

const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    url: require.resolve("url/"),
    assert: require.resolve("assert/"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    util: require.resolve("util/"),
    buffer: require.resolve("buffer/"),       // buffer polyfill
    "process/browser": require.resolve("process/browser.js") // specify exact path
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
