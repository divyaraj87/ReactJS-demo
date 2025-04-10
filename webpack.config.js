module.exports = {
    module: {
      rules: [
        // SCSS loader configuration
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Inject styles into DOM
            'css-loader',   // Translate CSS into CommonJS
            'postcss-loader', // Process CSS with PostCSS (includes Tailwind)
            'sass-loader'    // Compile SCSS to CSS
          ],
        },
        // CSS loader configuration (if you're using plain CSS)
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
  };
  