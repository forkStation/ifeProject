# loaders
loaders是应用资源的加载器。

这是一些运行在nodejs上的函数
example:你可以使用loaders告诉webpack来加载CoffeeScript or JSX

## loaders的特性

- loaders可以被链式调用，类似gulp的pipe风格。
- loaders可以配置同步和异步
- loaders运行在nodejs上
- loaders接受查询参数，This can be used to pass configuration to the loader.（？）
- loaders配置可以使用表达式或是正则
- loaders可以通过npm发布和安装
- etc..


## 使用loaders

loaders的命名一般为XXX-loader，(e.g. json-loader)

引用loaders时，可以是全名(e.h. json-loader)，也可以是缩写 e.g. json

- 安装loaders `npm install xxx-loader --save`

---

使用在`require`中
>Note: Avoid using this, if at all possible, if you intend your scripts to be environment agnostic (node.js and browser). Use the configuration convention for specifying loaders (see next section).

>避免这样使用，尽可能的使用configuration 用法。

    require("./loader!./dir/file.txt");
    // => uses the file "loader.js" in the current directory to transform
    //    "file.txt" in the folder "dir".

    require("jade!./template.jade");
    // => uses the "jade-loader" (that is installed from npm to "node_modules")
    //    to transform the file "template.jade"
    //    If configuration has some transforms bound to the file, they will still be applied.

    require("!style!css!less!bootstrap/less/bootstrap.less");
    // => the file "bootstrap.less" in the folder "less" in the "bootstrap"
    //    module (that is installed from github to "node_modules") is
    //    transformed by the "less-loader". The result is transformed by the
    //    "css-loader" and then by the "style-loader".
    //    If configuration has some transforms bound to the file, they will not be applied.

---

使用在Configuration中

    {
        module: {
            loaders: [
                { test: /\.jade$/, loader: "jade" },
                // => "jade" loader is used for ".jade" files
                //匹配.jade结尾的文件并加载

                { test: /\.css$/, loader: "style!css" },
                // => "style" and "css" loader is used for ".css" files
                //使用style和css的loader，用!进行分割
                // Alternative syntax:
                { test: /\.css$/, loaders: ["style", "css"] },
            ]
        }
    }

使用在CLI中

    $ webpack --module-bind jade --module-bind 'css=style!css'
    This uses the loader “jade” for “.jade” files and the loaders “style” and “css” for “.css” files.

## 查询参数

loaders能够直接读取查询参数，i.e. url-loader?mimetype=image/png.

in require

    require("url-loader?mimetype=image/png!./file.png");

Configuration

    { test: /\.png$/, loader: "url-loader?mimetype=image/png" }

or

    {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
    }

CLI

    webpack --module-bind "png=url-loader?mimetype=image/png"


# example
## install
全局安装webpack

    npm isntall webpack -g

## 创建一个js模块
使用commonjs语法建立一个模块

src/cats.js

    var cats = ['dave', 'henry', 'martha'];
    module.exports = cats;

app.js

    cats = require('./cats.js');
    console.log(cats);

## 编译js
给webpack一个入口，以及一个输出文件

    webpack ./app.js ./dist/app.bundle.js

## 添加index.html，并引用app.bundle.js

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <script src="dist/app.bundle.js"></script>
    </body>
    </html>

浏览器运行该文件，可以看到控制台输出cats

##使用第一个loader
现在想要添加一个css到项目中。
webpack只能够处理原生js，处理css文件需要css-loader;当然也需要style-loader载入style

打开控制台

    cd /demo
    npm install css-loader style-loader --save

现在创建文件

    css/style.css

    body {
        background: yellow;
    }

更新app.js文件

    +require('!style!css!./style.css');

重新运行`webpack ./app.js ./dist/app.bundle.js`,控制台输出：

    Hash: 1147fc76fcb3b33c8c0b
    Version: webpack 1.13.0
    Time: 792ms
            Asset   Size  Chunks             Chunk Names
    app.bundle.js  12 kB       0  [emitted]  main
       [0] ./app.js 149 bytes {0} [built]
       [5] ./src/cat.js 114 bytes {0} [built]
        + 4 hidden modules

此时再打开./index.html，发现背景变黄了;


## BINDING LOADERS
我们不想写一句很长的require，类似`require("!style!css!./style.css")`
将./app.js修改回来

    -require('!style!css!./style.css');
    +require("./style.css");

控制台运行：

    webpack ./app.js ./dist/app.bundle.js --module-bind 'css=style!css'
    //也就是上面描述的cli方法

## 配置文件运行
demo根目录新建文件webpack.config.js

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
        }
    };

然后控制台直接运行`webpack`即可

## 加点好玩的东西

    webpack --progress --colors 颜色以及进度条
    webpack --progress --colors --watch开启watch模式，每次修改文件都会自动编译

## 插件

插件可以完成更多 loader 不能完成的功能。
安装webpack至项目文件;

    npm install webpack --save

插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。

Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。

接下来，我们利用一个最简单的 BannerPlugin 内置插件来实践插件的配置和运行，这个插件的作用是给输出的文件头部添加注释信息。

修改 webpack.config.js，添加 plugins：

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

    webpack

此时在app.bundle.js最顶部就能看到`This file is created by wj`