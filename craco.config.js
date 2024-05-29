module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Add your customizations here
        webpackConfig.optimization.minimize = true;
        return webpackConfig;
      },
    },
  };