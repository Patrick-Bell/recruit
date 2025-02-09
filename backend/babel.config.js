module.exports = function(api) {
  const isDevelopmentEnv = api.env('development');
  const isProductionEnv = api.env('production');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: isDevelopmentEnv ? 'last 2 versions' : 'defaults',
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
        },
      ],
      '@babel/preset-react',  // Ensure JSX transformation is enabled
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
    ],
  };
};
