const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
 return {
  mode: "development",
  entry: {
    main: "./client/js/index.js",      // Update the path to client-side entry file
    install: "./client/js/install.js", // Update the path to client-side entry file
   },
  output: {
   filename: "[name].bundle.js",
   path: path.resolve(__dirname, "dist"),
  },
  plugins: [
   // HtmlWebpackPlugin to generate HTML files
   new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "index.html",
   }),

   // WebpackPwaManifest to generate a manifest file
   new WebpackPwaManifest({
    name: "My App",
    short_name: "App",
    description: "My Progressive Web App",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
     {
      src: path.resolve("src/assets/icon.png"),
      sizes: [96, 128, 192, 256, 384, 512],
     },
    ],
   }),

   // InjectManifest to inject the service worker
   new InjectManifest({
    swSrc: "./client/src/service-worker.js",
   }),
  ],

  module: {
   rules: [
    // CSS loader for handling CSS files
    {
     test: /\.css$/,
     use: ["style-loader", "css-loader"],
    },

    // Babel loader for JavaScript transpilation
    {
     test: /\.js$/,
     exclude: /node_modules/,
     use: {
      loader: "babel-loader",
      options: {
       presets: ["@babel/preset-env"],
      },
     },
    },
   ],
  },
 };
};
