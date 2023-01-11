const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "none",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
  devServer: {
    open: true,
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
};
