const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
 return {
  mode: "development",
  entry: {
    main: "./src/js/index.js",      
    install: "./src/js/install.js",
  },
  output: {
   filename: "[name].bundle.js",
   path: path.resolve(__dirname, "dist"),
  },
  plugins: [
   // Generates HTML files
   new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "index.html",
   }),

   // Generates a manifest file
   new WebpackPwaManifest({
    name: "My App",
    short_name: "App",
    description: "My Progressive Web App",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
     {
      src: path.resolve("src/images/logo.png"),
      // loads only six size versions of the .png.
      sizes: [96, 128, 192, 256, 384, 512],
     },
    ],
   }),

   // InjectManifest to inject the service worker
   new InjectManifest({
    swSrc: "./src-sw.js",
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
