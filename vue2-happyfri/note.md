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



## 实例的生命周期

> 钩子，在实例生命周期的不同阶段调用，如 mounted、updated、destroyed。钩子的 this 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。

### 一个人（实例），在它的一生中，会有几个重要的时间节点，每个节点称为声明周期钩子函数，依次是：

beforeCreate：这个实例还没有创造出来，无法获取data、methods，可以理解为，这个人还没生出来。

created：这个实例被创造出来了,可以获取data、methods，可以理解为，这个人已经存在了。

beforeMount：(mount，安装，挂载;)挂载之前，实例刚刚渲染到 DOM 节点上，相关渲染函数刚执行。可以理解为，这个人到兵营去报了个到，其他啥都没干。

mounted ：挂载之后，实例的初始数据data在 DOM 上已经渲染完毕，注意：如果是异步的数据，这时候还没渲染。

beforeUpdate ：实例的data如果发生变化，beforeUpdate这个时候就是指在变化之前。

updated：实例的data变化完毕，异步数据也全部获取。

beforeDestory：实例销毁前。

destoryed：实例销毁完毕。

### updated、watch、$nextTick 异同：

相同点：都是数据发生变化后的钩子函数。

不同点：

update：所有数据的所有变化，如果做同一个的业务逻辑处理，在这里；
watch：监听具体数据的变化，并做相应处理。
$nextTick： 某个数据的某个变化，变化后立即更新DOM；


https://jingsam.github.io/2016/10/30/vue-components-naming.html
## Vue组件命名 1.0 

> 基于以上两点，可以总结出组件的命名规则为：组件名以字母开头，后面跟字母、数值或下划线，并且不与 HTML 元素或 Vue 保留标签重名。
> Vue 组件注册的名称是没有限制的。你可以用任何 JavaScript 能够表示的字符串，不管是数字、特殊符号、甚至汉字，都可以成功注册。

总体来说，模板解析分为两个过程：

首先，Vue 会将 template 中的内容插到 DOM 中，以方便解析标签。由于 HTML 标签不区分大小写，所以在生成的标签名都会转换为小写。例如，当你的 template 为 <MyComponent></MyComponent> 时，插入 DOM 后会被转换为 <mycomponent></mycomponent>。

然后，通过标签名寻找对应的自定义组件。匹配的优先顺序从高到低为：原标签名、camelCase化的标签名、PascalCase化的标签名。例如 <my-component> 会依次匹配 my-component、myComponent、MyComponent。

不可用的标签主要有三种情况：
一是完全不合法的标签名，例如 </>；二是与 HTML 元素重名会产生不确定的行为，例如使用 input 做组件名不会解析到自定义组件，使用 button 在 Chrome 上正常但在 IE 上不正常；三是与 Vue 保留的 slot、partial、component 重名，因为会优先以本身的意义解析，从而产生非预期的结果。


## Vue2.0 的模板解析与1.0 有所不同

前面提到，Vue 2.0 相对于 1.0 的最大改进就是引入了 Virtual DOM，使模板的解析不依赖于 DOM。
使用 Virtual DOM 解析模板时，不必像 DOM 方式那样将模板中的标签名转成小写，而是原汁原味地保留原始标签名。然后，使用原始的标签名进行匹配组件。例如，<MyComponent></MyComponent> 不会转为为小写形式，直接以 MyComponent 为基础开始匹配。当然，匹配的规则与 1.0 是一样的，即依次匹配：原标签名（可以使用原标签名）、camelCase化的标签名、PascalCase化的标签名。

在 Vue 1.0 和 2.0 中还有一种定义组件模板的方式，即使用 DOM 元素。在这种情况下，解析模板时仍然会将标签转为小写形式。


## 使用flex来实现垂直水平居中
`
	display: flex;
	justify-content: space-around;
	align-items: center;
`