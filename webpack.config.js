const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const srcFolder = "src";
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
 

module.exports = (env)=>{
  console.log("env.NODE_ENV  --->" , process.env.NODE_ENV);
  const isProduction = process.env.NODE_ENV === 'production';
  const dotenvFilename = isProduction ? '.env.production' : '.env.development';
  return {
  entry: {
    index: path.join(__dirname, srcFolder, "index.tsx"),
  },
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  resolve: {
    // order matters, resolves left to right
    // root is an absolute path to the folder containing our application
    // modules
    // root: __dirname`
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@utils": path.resolve(__dirname, "./src/util"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@compo": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      stream: "stream-browserify",
      path: "path-browserify",
    },
    extensions: ["", ".md", ".js", ".ts", ".tsx", ".json"],
  },
  mode:process.env.NODE_ENV,
  plugins: [
    new Dotenv({path : `./${dotenvFilename}`}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // to import index.html file inside index.js
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  devServer: {
    port: 3000, // you can change the port
    historyApiFallback: true,
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.ts(x?)$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(js|ts|tsx|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, // to import images and fonts
      //   use: {
      //     loader: "url-loader",
      //     options: { limit: 50000 },
      //   },
      // },
    ],
  },
}
};
