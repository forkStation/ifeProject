/**
 * Created by wj on 2016/4/28.
 */
const webpack=require('webpack');
const path=require('path');

module.exports = {
    entry: {
        app:["./app.js"]
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: "/dist/",
        filename: "app.bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('This file is created by wj')
    ]
};