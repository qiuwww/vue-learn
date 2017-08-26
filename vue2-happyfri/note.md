# note.md

## .babelrc
`
{
	"presets": ["es2015", "stage-2"],
	"plugins": ["transform-runtime"],
	"comments": false
}
`

这个配置文件是针对babel 6的。
Babel 6做了一系列模块化，不像Babel 5一样把所有的内容都加载。
比如需要编译ES6，我们需要设置presets为"es2015"，也就是预先加载es6编译的相关模块，如果需要编译jsx，需要预先加载"react"这个模块。

## "stage-0"

是对ES7一些提案的支持。
为什么说“stage-0” 法力无边呢，因为它包含stage-1, stage-2以及stage-3的所有功能，同时还另外支持如下两个功能插件：
transform-do-expressions
transform-function-bind

1. 如果需要编译es6，我们需要设置presets包含es2015，也就是预先加载es6编译的模块。

2. 如果需要编译es7，我们需要设置presets包含stage-0，也就是预先加载es7编译的模块。


## babel-polyfill 使用场景

Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。



## babel-runtime 使用场景

编译过程需要生成的帮助函数，会生成在文件内，使用该插件，会使用内部的函数代替生成的帮助函数。



