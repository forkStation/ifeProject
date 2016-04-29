#   现有的几种模块加载机制

+ `<script>`标签
+ CommonJs
+ AMD
+ ES6 module

##  `<script>`标签

    <script src="module1.js"></script>
    <script src="module2.js"></script>
    <script src="libraryA.js"></script>
    <script src="module3.js"></script>

这些模块都会挂到全局对象上，浏览器端就是window

###  Common problems

- 变量污染全局
- 开发者必须处理模块间的依赖
- 会产生很多个请求
- 非常难以管理

---

##  CommonJs方式
这种方式使用同步的`require`方法来加载依赖，
采用exports对象或者设置module.exports的值来对外输出变量

    require("module");
    require("../file.js");
    exports.doStuff = function() {};
    module.exports = someValue;

这仅仅在node.js使用

### 优点

- server端的模组可以复用
- npm中绝大多数包都是这种风格
- 使用起来非常简单

### 糟粕

- 阻塞调用不适用于网络，基于浏览器端的依赖需要异步

### 实现

- [nodejs](http://nodejs.org/)
- [browserify](https://github.com/substack/node-browserify)
- [modules-webmake](https://github.com/medikoo/modules-webmake)-编译成单个文件
- [wreq](https://github.com/substack/wreq)-client-side

ps:seajs3.x也是commonjs规范的

## AMD：异步加载依赖
AMD的代码风格

    require(["module", "../file"], function(module, file) { /* ... */ });
    define("mymodule", ["dep1", "dep2"], function(d1, d2) {
      return someExportedValue;
    });

### 优点

- 基于网络的异步请求风格
- 同步加载多个模块

### 糟粕

- Coding overhead.难以读写；
- 看上去像是一种变通方案(不是那么优雅)

### 实现

- [require.js](http://requirejs.org/)-浏览器
- [curl](https://github.com/cujojs/curl)-浏览器

## ES6模组
ECMASCRIPT6 给js添加了很多语法糖，使用了一种新的模块系统

    import "jquery";
    export function doStuff() {}
    module "localModule" {}

### 优点
- 语法静态分析变得简单(有利于ide的代码补全)
- 拥抱未来，es6是事实的标准

### 不足
- 浏览器原生支持弱
- 这种风格的模块很少

##webpack提出的解决方案：让不同风格的模块能在一起工作，并且让用户能够更容易添加自己的模块

#TRANSFERRING：传输
modules将会在浏览器上运行，所以它们应该在server端编译。
现在有两种编译风格：

- 一个模块一个请求（只编译不合并，文件是散的）
- 所有的模块都在一个请求（合并了代码）

这两种方案应用广泛，却又都不完美

- 多文件
    - 优点：按需请求，不会传输多余的文件
    - 不足：每个请求都会占据一定的资源
    - 不足2：应用启动很慢

- 单文件
    - 优点：仅需要请求一次，延迟小
    - 不足：(当前)不需要的模块也被传输过来

