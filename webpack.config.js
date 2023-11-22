// webpack.config.js
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const path = require("path");
const webpack = require('webpack');
dotenv.config({path: `./.env`});
module.exports = {
    entry: './src/index.js',
    externals: {
        react: 'react'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: false,
        port: 3003,
    },
    module: {
        rules: [
             { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/assets',
        filename: 'bundle.js',
    },
    plugins: [
        new Dotenv({
            path: './.env' // default is .env
        }),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html'
      })
    ]
};
