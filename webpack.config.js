module.exports = {
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js']
  }
};
