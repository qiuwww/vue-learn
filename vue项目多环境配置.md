# vue 项目多环境配置

1. 通过命令的`--mode qa`参数来控制加载的配置文件；
   1. `NODE_ENV`这个变量是给内部控制打包还是本地开发的配置的变量，不能修改，只有`production`、`test`和`development`的区别；
2. 加载配置文件`.env.qa`，在其中设置变量，需要以`VUE_APP`开头才可以，添加`VUE_APP_ENV=dev`；
   1. 只有 `NODE_ENV`，`BASE_URL` 和以 `VUE_APP_` 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中。这是为了避免意外公开机器上可能具有相同名称的私钥。
      1. BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。
   2. [dotenv](https://github.com/motdotla/dotenv#rules)；
3. 然后在项目中可以直接使用`process.env.VUE_APP_ENV`，获取到前面设置的变量值`dev`，然后通过字典`config.js`进行变量输出；
   1. 这里不写在`.env.qa`文件的好处是，直接修改`config.js`可以不需要手动重启；

## uniapp 项目的两种方式

1. 通过 HbuilderX 编辑器创建，通过 Hbuilderx 进行开发运行发布没有对外暴露配置文件，区分多环境想到的办法只能是手动切换变量去加载不同的 api；
2. 通过 vue-cli 创建，可以通过切换 mode，切换运行的指令来切换不同的 api；
   1. 这里也只做基础的区分，还是写到一个文件内进行区分；

## [vue.config.js 的完整配置](https://juejin.cn/post/6886698055685373965)
