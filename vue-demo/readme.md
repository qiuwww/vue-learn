<!-- readme.md -->
## 慕课网视频
vue.js入门基础：http://www.imooc.com/learn/694
官方网站：https://cn.vuejs.org/
keyword: vue ES6 template + controller

vue-cli模块：vue项目构建脚手架,确实很方便
https://cn.vuejs.org/v2/guide/installation.html#命令行工具

app.js || vendor.js || manifest.js
```
app.js是入口js，vendor则是通过提取   公共模块插件   来提取的代码块（webpack本身带的模块化代码部分），而manifest则是在vendor的基础上，再抽取出要经常变动的部分，比如关于异步加载js模块部分的内容。

从截图上看也看出，vendor的文件大小最大，因为其包含了vue整一个框架的代码，以及webpack的模块化代码。

至于manifest的话，主要是一些异步加载的实现方法（通过建立script方式动态引入js），内容上包含异步js的文件名和路径。

之前查过一些资料，主要是js的改动会改变异步加载里面的js文件名，频繁的变动，而相对来说vue库之类的代码，实际上只要编译打包一次就够了，如果只是打包成一个vendor的话，经常变动js会导致vendor重复编译，有点浪费，所以把会重复跟随变动的部分抽离出来作为manifest文件。
```