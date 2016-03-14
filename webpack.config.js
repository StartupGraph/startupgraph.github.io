var path = require("path");
var	webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
  cache: true,
  entry: {
    app: [
      path.join(__dirname, "src/index.jsx"),
      "webpack/hot/only-dev-server",
      "webpack-dev-server/client?http://localhost:8080"
    ]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/StartupGraph/",
    devtoolModuleFilenameTemplate: "/[absolute-resource-path]"
  },
  resolve: {
    modulesDirectories: [ "src", "web_modules", "node_modules" ],
    extensions: [ "", ".js", ".jsx" ]
  },
  module: {
    loaders: [
      {
        test: /\favicon\.ico$/i,
        include: [ path.resolve(__dirname, "src/img/favicon/") ],
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.png$/i,
        include: [ path.resolve(__dirname, "src/img/favicon/") ],
        loader: "file?name=favicon/[path][name].[ext]!img?progressive=true"
      },
      {
        test: /\.json$/i,
        include: [ path.resolve(__dirname, "src/img/favicon/") ],
        loader: "file?name=favicon/[path][name].[ext]"
      },
      {
        test: /\.json$/i,
        include: [ path.resolve(__dirname, "src/data/") ],
        loader: "file?name=data/[path][name].[ext]"
      },
      {
        test: /\.csv$/i,
        include: [ path.resolve(__dirname, "src/data/") ],
        loader: "file?name=data/[name].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [ path.resolve(__dirname, "src/") ],
        exclude: /(node_modules|src\/favicon)/,
        loader: "url?name=img/[name].[ext]&limit=10000!img?progressive=true"
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)($|\?)/i,
        loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.scss$/i,
        include: [ path.resolve(__dirname, "src/") ],
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
            "style",
            [
              "css?" + JSON.stringify({ sourceMap: true }),
              "postcss",
              "sass?" + JSON.stringify({ outputStyle: "compressed" })
            ].join("!")
          )
      },
      {
        test: /\.css$/i,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap=true")
      },
      {
        test: /\.jsx?$/i,
        include: [ path.resolve(__dirname, "src/") ],
        exclude: /node_modules/,
        loader: "babel?" + JSON.stringify({ cacheDirectory: true })
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: [ "> 1%" ] }) ],
  plugins: [
    new webpack.ProvidePlugin({ _: "lodash" }),
    new ExtractTextPlugin("bundle.css"),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body"
    })
  ]
};

if (process.env.HOT) {
  config.devtool = "cheap-eval-source-map";
  config.plugins.unshift(new webpack.NoErrorsPlugin());
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

if (process.env.NODE_ENV === "production") {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    minimize: true,
    compress: { warnings: false }
  }));
}

module.exports = config;
