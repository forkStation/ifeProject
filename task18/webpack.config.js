/**
 * Created by wj on 2016/5/5.

 _
 _ooOoo_
 o8888888o
 88" . "88
 (| -_- |)
 O\  =  /O
 ____/`---'\____
 .'  \\|     |//  `.
 /  \\|||  :  |||//  \
 /  _||||| -:- |||||_  \
 |   | \\\  -  /'| |   |
 | \_|  `\`---'//  |_/ |
 \  .-\__ `-. -'__/-.  /
 ___`. .'  /--.--\  `. .'___
 ."" '<  `.___\_<|>_/___.' _> \"".
 | | :  `- \`. ;`. _/; .'/ /  .' ; |
 \  \ `-.   \_\_`. _.'_/_/  -' _.' /
 ===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
 `=--=-'                    wj
 佛祖保佑                永无bug
 */
module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + '/dist',
        publicPath: "/dist/",
        filename: "app.bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
