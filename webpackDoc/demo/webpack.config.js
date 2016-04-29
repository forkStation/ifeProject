/**
 * Created by wj on 2016/4/28.
 */
const webpack=require('webpack');

module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname+'/dist',
        filename: "app.bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins:[new webpack.BannerPlugin('This file is created by wj')]
};