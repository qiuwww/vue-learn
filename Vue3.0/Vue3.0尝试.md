---
title: Vue3.0 尝试
typora-copy-images-to: upload
---

总的感觉 Vue3.0 不好用，还不如用 React17。

## WHY，为什么要有 3.0？

## WHAT，具体有哪些改变？相对应于 Vue2.0 的语法的改变？

### 1. Composition API 主要就是为了解决上面的问题，将零散分布的逻辑组合在一起来维护，并且还可以将单独的功能逻辑拆分成单独的文件

为了处理随着状态增加而增加的各种 data、methods、computed 以及 mounted 等，vue2.0 给出的解决方案就是 **Mixin**。

1. [setup 官方文档；](https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0)
    1. 执行 setup 时，组件实例尚未被创建；
    2. setup 接受的 props，还是需要声明一下接受参数的；
    3. setup 是 Vue3.x 新增的一个选项， 他是组件内使用 Composition API 的入口。
    4. setup 中接受的 props 是响应式的， 当传入新的 props 时，会及时被更新。**由于是响应式的， 所以不可以使用 ES6 解构，解构会消除它的响应式**。
        1. 如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作。
2. [context 是一个普通 JavaScript 对象](https://v3.cn.vuejs.org/guide/composition-api-setup.html#context)，暴露了其它可能在 setup 中有用的值。
    1. `{ attrs, slots, emit, expose }`；
    2. attrs 和 slots 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 attrs.x 或 slots.x 的方式引用 property。
3. 在 vue2.x 中， 定义数据都是在 data 中， 但是 Vue3.x 可以使用 reactive 和 ref 来进行数据定义。
4. 如果 setup 返回一个对象，那么该对象的 property 以及传递给 setup 的 props 参数中的 property 就都可以在模板中访问到。

### Vue3.0 的生命周期

1. Vue3.0 **新增了 setup**，这个在前面我们也详细说了，
2. 然后是将 Vue2.x 中的 beforeDestroy 名称变更成 beforeUnmount; destroyed 表更为 unmounted，作者说这么变更纯粹是为了更加语义化，因为一个组件是一个 mount 和 unmount 的过程。
3. 我们可以看到 beforeCreate 和 created 被 setup 替换了（但是 **Vue3 中你仍然可以使用， 因为 Vue3 是向下兼容的， 也就是你实际使用的是 vue2 的**）。
4. 其次，钩子命名都增加了 on。

### watch 与 watchEffect 的用法

## HAW，优缺点？未来怎么选择？

### 3.0 的做出的一些改变

**1.[Composition API](<[](https://v3.vuejs.org/guide/composition-api-introduction.html)>)**

_出现的原因：随着组件变得更大，代码的维护变得越来越困难，可读性也越来也差。_

_使用方式：`setup`选项 (取代`beforeCreate`，`created`生命周期钩子，调用时机为`beforeCreate` 之后 `created` 之前)，可选参数`props`、`context`。_

_基本使用：_

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glx592jigfj30q20x4dj6.jpg)

从上面一段简短的代码中可以看出`Composition API`的最大的一个特点，**灵活**，在 vue2.0 中我们需要遵循下面的编码形式

-   在`props` 里面设置接收参数
-   在`data` 里面设置变量
-   在 `computed` 里面设置计算属性
-   在 `watch` 里面设置监听属性
-   在`methods` 里面设置事件方法

现在使用 `Composition API`，不再这么约定了，代码组织变的非常灵活，我们的控制代码写在 `setup` 里面即可。那么这种方式可以解决现有模式的什么问题呢？借用官网的一张图和描述

![62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2](https://tva1.sinaimg.cn/large/0081Kckwly1glx4o6skhjj307a0s83zh.jpg)

其中处理同一逻辑的代码按颜色分组。当我们的组件变得更大时，逻辑列表也会增加。这可能导致组件的难以阅读和理解，特别是对于那些最初没有参与编写它们的人。而`Composition API`使我们能够将处理同一逻辑的代码归并在一块。当代码趋于复杂时，我们可以使用`Composition API` 来分离代码，用来切割成各种模块导出，如下图。

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glx4znj9ldj30t20s477j.jpg)

这样就算`setup`随着组件的变大代码量越来越多时，代码也不会因此变得混乱。

**2.[Teleport 组件](https://v3.vuejs.org/guide/teleport.html#using-with-vue-components)**

_出现的原因：解决组件多重嵌套的定位问题。_

_使用方式：<teleport to="#id"></teleport>`to`属性的值可以为有效的样式选择器_

_基本使用_：

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glx4uh0vrlj30nu0f40uj.jpg)

如果 `<teleport>` 包含 `Vue` 组件，则它仍将是 `<teleport>` 父组件的逻辑子组件,可以通过正常的数据流渲染。

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glx5eioiwzj30q20u4782.jpg)

`teleport`指定的`dom`元素必须是真实存在的。（在 teleport 组件解析前生成）

**3.[Fragments](https://v3.vuejs.org/guide/migration/fragments.html#overview)**

_出现的原因：避免渲染额外或无效的 html 标签。_

_使用方式：`template`拥有多个根结点时不需要额外包装_

_基本使用：_![code](https://tva1.sinaimg.cn/large/0081Kckwly1gly27dvgspj30q20e4myo.jpg)

Vue3.0 之前只有函数式组件支持多根节点，但是由于函数式组件无状态，使用场景较少，最大的优势就是组件初始化速度快。vue3.0 对性能提升后，有状态和无状态组件之间的差异可以忽略不计。

**4.[createRenderer API](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core)**

在 vue2.0 中通过 **`render()`**和**`patch()`**完成虚拟 dom 的和真实 dom 的生成,这个过程我们是无法去控制的。在整个 patch 过程中有一个**_`nodeOps`_**对象， 对象上的函数属性都是对原生 DOM 操作的封装，在 vue2.0 的解析渲染过程中强依赖于这些方法，所以 vue 项目本身只能运行在浏览器中。

于是在 3.0 的**`@vue/runtime-core`**包中提供了这样一个方法**`createRenderer` **，可以让我们自定义渲染器。下面看下如何使用

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glyanzkpg6j31bz0u0dmv.jpg)

其中**_`nodeOps`_**包含所有操作`DOM`的方法，**`patchProp`**则是用 DOM 属性的操作，我们只需要将相关的的抽象方法用对应平台的代码逻辑实现后就完成跨平台的操作。

**5.[Global API](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp)和[Tree-shakabel](https://v3.vuejs.org/guide/migration/global-api-treeshaking.html#_2-x-syntax)**

对比一下 2.0 和 3.0 创建一个 Vue 实例看看有什么不同

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glzacouqesj30wy0g476t.jpg)

一个是通过构造函数创建实例，一个是通过函数创建实例。这两者其实没有什么本质的区别。但是在 3.0 中`createApp`创建出的实例上开放了全局 API 的子集。查看以下列表

|         Vue.config         |         app.config          |
| :------------------------: | :-------------------------: |
| Vue.config.ignoredElements | app.config.isCustomElement  |
|       Vue.component        |        app.component        |
|       Vue.directive        |        app.directive        |
|         Vue.mixin          |          app.mixin          |
|          Vue.use           |           app.use           |
|       Vue.prototype        | app.config.globalProperties |

这意味着我们创建的每一个 vue 实例都可以享有自己的配置。

**Tree-shakable**：在 webpack 中支持摇树优化，消除死代码。vue3 中采用 es 模块构建的方式访问 API,使用前必须显示导入。

**6.模版指令的改变**

**v-model**:2.0 中`v-model`的灵活性差强人意。看看以下代码

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glzeous4ngj319u0j4n1i.jpg)

在 3.0 中`v-model`默认绑定组件`props`的`modelValue`属性和监听`update:modelValue`事件

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glzf0t3qqaj31fw0d4wh2.jpg)

**v-for、v-if**

3.0 中包含`v-if`、`v-else`、`v-else-if`的元素上不需要添加 key 属性。（2.0 之前不知道条件语句也需要加 key 标识，某一次在视图更新的时候遇到一个 bug，找了半天最后才定位到某个 div 元素被复用了,最后加了一个 key 搞定！）

另外我在 2.0 经常试图在渲染列表的时候往`template`中添加 key，总是得到提示不允许这样做，现在 3.0 建议我们这样做。

优先级：开发时`v-for`和`v-if`经常会有同时使用的情况，虽然不建议这样写，推荐使用计算属性。2.0 中`v-for`优先级更高，3.0 则`v-if`优先级更高。

**v-bind**

2.0 中元素的属性优先级最高，不会被覆盖。3.0 中属性声明的顺序影响渲染的结果。

![code](https://tva1.sinaimg.cn/large/0081Kckwly1glzfviykvfj30wc0p4whr.jpg)

**v-on**

`native`修饰符被废弃，2.0 中组件的监听器只能监听被`emit`触发的事件因此`v-on`不能监听 DOM 事件，`native`修饰符可以为组件添加原生`DOM`的事件监听器。在 3.0 中 vue 会为所有没有定义在`emit`选项中的事件添加原生事件监听器。

**7.[Reactivity APIs]()**

`reactive`:生成一个响应式的对象，参数为复杂数据类型(Object,Array)

`ref`:生成一个响应式的对象，接受基本数据类型(Number,String,Boolean 等)

还有其他相关的`Reactivity APIs`有兴趣自行查看文档。

**8.值得注意的变动**

-   函数式组件和和普通组件的创建方式统一，废除`functional`选项。
-   异步组件需要通过`defineAsyncComponent`API 包装定义。
-   `Mixin`合并策略调整，不会合并额外的属性。
-   vue 实例挂载的时候只替换根元素的`innerHTML`。
-   `data`统一只能声明为函数
-   `$attr`现包含`class`和`style`
-   今天的分享就到这了，想知道更多请移步文档学习**[Vue](https://v3.vuejs.org/guide/introduction.html)**

    # 感谢！

## 参考

1. [Vue3.0 新特性以及使用经验总结](https://juejin.cn/post/6940454764421316644)
