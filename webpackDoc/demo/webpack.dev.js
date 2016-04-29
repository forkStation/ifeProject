/**
 * Created by wj on 2016/4/29.
 */
const config = require("./webpack.config.js");
const WebpackDevServer = require("webpack-dev-server");
const webpack = require('webpack');

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot: true,
    publicPath: "/dist/"
});
server.listen(8080);