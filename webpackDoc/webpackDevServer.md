# webpack服务器

    npm install webpack-dev-server -g
    webpack-dev-server --progress --colors

这将会在localhost:8080端口启动一个小型的express服务器；
webpack-dev-server使用了[webpack-dev-middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)

# root位置
webpack-dev-server默认会在终端所在的目录开启服务，除非手动配置

    $ webpack-dev-server --content-base build/

使用这个配置将会server build文件夹的静态文件.
它会watch你的源文件，当文件发生改变时，将重新编译bundle（不会改变硬盘中的bundle，而是内存中的）

    module.exports = {
        entry: "./app.js",
        output: {
            path: path.resolve(__dirname,'dist'),
            publicPath: "/assets/",
            filename: "app.bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" }
            ]
        },
        plugins:[new webpack.BannerPlugin('This file is created by wj')]
    };

e.g.  上面配置，内存中的bundle可以在`localhost:8080/assets/app.bundle.js`访问到

# 自动刷新
webpack-dev-server 提供了两种模式来自动刷新页面

* iframe 模式，页面嵌入在一个iframe里面，只会刷新iframe

使用iframe模式不需要进行额外的配置，只需要进入`http://<host>:<port>/webpack-dev-server/<path>`就可以了

 - 不需要配置
 - 页面顶部有一个提示条
 - url的改变不会再浏览器工具条展示出来。

---

* inline模式
使用inline模式，必须要在终端指定`--inline`(无法在config文件指定);
inline模式无需指定特别的url，以上面的配置为例，直接进入`localhost:8080/`就可看到页面

* 使用node.js的inline模式

在根目录新建文件`webpack.dev.js`

    const config = require("./webpack.config.js");
    const WebpackDevServer = require("webpack-dev-server");
    const webpack=require('webpack');
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
         hot: true,
         publicPath: "/dist/"
    });
    server.listen(8080);

    commond:
        node webpack.dev.js

这样在8080端口也开启了一个服务器。
这里也需要在

    new WebpackDevServer(compiler, {
             hot: true,
             publicPath: "/dist/"
        });
加上publicPath，而无法直接读取config的output配置

# Hot Module Replacement热模块更新

webpac-dev-server支持Hot Module Replacement，即模块热替换，
在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。
使用HMR功能也有两种方式：命令行方式和Node.js API。

命令行方式同样比较简单，只需加入--inline --hot选项。
--hot这个选项干了一件事情，它把webpack/hot/dev-server入口点加入到了webpack配置文件中。
这时访问浏览器，你会看见控制台的log信息：

    [HMR] Waiting for update signal from WDS...
    [WDS] Hot Module Replacement enabled.
