# vue-features-test

这个项目以vue2为基础，示例vue2的相关特性。

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## TS+Vue

### 主要关注点

1. 基于类的组件；
2. Data, props, computed 属性, methods, watchers, and emit
3. 生命周期
4. Mixins
5. Vuex

### TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected

1. public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的；
2. private 修饰的属性或方法是私有的，不能在声明它的类的外部访问；
3. protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的。

## 2020-7-28，再看 Vue2+的文档

### 脚手架不能热更新的问题

1. 如果控制台出错，就不会热更新了；

### [框架对比](https://cn.vuejs.org/v2/guide/comparison.html)

1. 例如 React 庞大的生态系统，或者像是 Knockout 对浏览器的支持覆盖到了 IE6。
2. [运行时性能](https://cn.vuejs.org/v2/guide/comparison.html#%E8%BF%90%E8%A1%8C%E6%97%B6%E6%80%A7%E8%83%BD)
   1. 在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。
   2. 在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，**所以系统能精确知晓哪个组件确实需要被重渲染**。你可以理解为每一个组件都已经自动获得了 shouldComponentUpdate，并且没有上述的子树问题限制。
3. JSX vs Templates
   1. 我们可以把组件区分为两类：
      1. 一类是偏视图表现的 (presentational)，
      2. 一类则是偏逻辑的 (logical)。
      3. 我们推荐在前者中使用模板，在**后者中使用 JSX 或渲染函数**。
   2. 这两类组件的比例会根据应用类型的不同有所变化，但**整体来说我们发现表现类的组件远远多于逻辑类组件**。
4. 管理模式甚至 Redux 本身也可以非常容易的集成在 Vue 应用中。实际上，Vue 更进一步地采用了这种模式 (Vuex)。
5. 在有限程度上，React + Mobx 也可以被认为是更繁琐的 Vue，所以如果你习惯组合使用它们，那么选择 Vue 会更合理。
6. AngularJS 使用双向绑定，Vue 在不同组件间强制使用单向数据流。这使应用中的数据流更加清晰易懂。--> **双向数据流更方便，单向数据流更清晰**。

### Vue 实例

1. 如果你知道你会在晚些时候需要一个 property，但是一开始它为空或不存在，**那么你仅需要设置一些初始值**（响应式初始化）。
   1. 这里唯一的例外是使用 Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化。
2. 除了数据 property，Vue 实例还暴露了一些有用的**实例 property 与方法**。**它们都有前缀 \$**，以便与用户定义的 property 区分开来。
   1. `$mount`
   2. `$watch`
3. 不要在选项 property 或回调上使用箭头函数，因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止。

### 模板语法

1. 通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。
2. 如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled attribute 甚至不会被包含在渲染出来的 `<button>` 元素中。？？？什么意思
3. 每个绑定都只能包含单个表达式。`a=1`，是一个语句。
4. 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。
5. [动态参数](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8A%A8%E6%80%81%E5%8F%82%E6%95%B0)，`<a v-on:[eventName]="doSomething"> ... </a>`。
6. 在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写。

### 计算属性和侦听器

1. 对于任何复杂逻辑，你都应当使用**计算属性**，对数据的基本处理，**依赖别的变量的合成变量结果**。
   1. 计算属性会缓存，相对于方法需要每次都重新计算。
   2. 计算属性是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值。
   3. 使用 setter 方法也可以进行一些副作用操作，这里倒是更适合使用 watch。
2. Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性 watch**。
   1. 当你有一些数据需要随着其它数据变动而变动时；
   2. 也就是属性的变动引起的副作用，**属性名就是被观测的对象**；
   3. 多个属性改变合成新的属性，更好的是使用计算属性；

### 条件渲染

1. v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
2. [用 key 管理可复用的元素](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)；
   1. 默认同类型的、同位置的元素，默认会缓存；
   2. 添加 key 就不会被缓存，查看 input 的输入内容；
3. v-show 只是简单地切换元素的 CSS property display。
4. 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute；
5. [检测变化的注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

### 表单输入绑定

1. **但 v-model 本质上不过是语法糖**。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。
2. 对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 **v-model 不会在输入法组合文字过程中得到更新**(**input 事件修改参数**)。如果你也想处理这个过程，请使用 input 事件。
3. v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件；
   1. text 和 textarea 元素使用 value property 和 input 事件；
   2. checkbox 和 radio 使用 checked property 和 change 事件；
   3. select 字段将 value 作为 prop 并将 change 作为事件。
4. 多选 select(multiple)和 checkbox 的 model 是一个数组；
5. true-value="yes" / false-value="no"；
6. v-model 可以对应于一个对象类型；
7. 修饰符
   1. .lazy，在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件*之后*进行同步。
8. [组件中使用 v-model](https://cn.vuejs.org/v2/guide/forms.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)。

### 组件基础

1. 因为**组件是可复用的 Vue 实例**，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样**根实例**特有的选项。
2. 每个组件都会各自独立维护它的 state。**因为你每用一次组件，就会有一个它的新实例被创建**。
   1. 取而代之的是，**一个组件的 data 选项必须是一个函数**，因此**每个实例可以维护一份被返回对象的独立的拷贝**。
      1. 这里到底是原型上的运行函数，还是直接 copy 的对象属性；
3. 两种组件的注册类型：[全局注册和局部注册](https://www.cnblogs.com/edwardwzw/p/12245198.html)。
   1. **全局注册**的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
   2. **局部注册**你可以通过一个普通的 JavaScript 对象来定义局部组件。
4. Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。
5. 在父级组件监听这个事件的时候，我们可以通过 **\$event** 访问到被抛出的这个值；
6. [在组件上使用 v-model](https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)；
7. :is 动态组件：currentTabComponent 可以包括
   1. 已注册组件的名字，或
   2. 一个组件的选项对象
8. 模板类型：需要注意的是如果我们从以下来源使用模板的话，这条限制是不存在的
   1. 字符串 (例如：template: '...')；
   2. 单文件组件 (.vue)
   3. `<script type="text/x-template">`，这个是嵌入在 template 内的。

### 组件注册

1. 组件名大小写，使用的时候，最好都适用**kebab-cas**e 这种形式；
   1. kebab-case：小写连字符；
   2. PascalCase：类命名规则；
2. 范围：
   1. 全局注册：`Vue.component('my-component-name', {})`，使用 Vue 对象方法来添加，所有自组件都可以使用；
      1. **全局添加公共基础组件**：require.context [只全局注册这些非常通用的基础组件](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)。
   2. 局部注册：
      1. 普通的 JavaScript 对象来定义组件；
      2. `Vue.extend({})`

### Prop，Prop 的大小写 (camelCase vs kebab-case)

**HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符**。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名。

1. 在 HTML 中是 kebab-case 的`post-title`；
2. 在 JavaScript 中是 camelCase 的`postTitle`。
3. 传递静态或者动态 props；

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 传入一个对象的所有 property -->
<blog-post v-bind="post"></blog-post>
<!-- 等价于： -->
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```

4. [单向数据流](https://cn.vuejs.org/v2/guide/components-props.html#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81)
   1. 额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。
   2. 这里有两种常见的试图变更一个 prop 的情形：
      1. 最好定义一个本地的 data property 并将这个 prop 用作其**初始值**；
      2. 这个 prop 以一种原始的值传入且需要进行转换。
      3. 注意在 JavaScript 中对象和数组是通过**引用传入**的，所以**对于一个数组或对象类型的 prop 来说**，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。
5. Prop 验证
   1. 我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。**这在开发一个会被别人用到的组件时尤其有帮助**。
   2. 这里使用 ts，好像不能提示出来？**确实没有在 vsc 中提示出来**。
   3. 有了 inheritAttrs: false 和 \$attrs，你就可以**手动决定这些 attribute 会被赋予哪个元素**。

### 自定义事件

1. 不同于组件和 prop，**事件名不存在任何自动化的大小写转换**。举个例子，如果触发一个 camelCase 名字的事件，则监听这个名字的 kebab-case 版本是不会有任何效果的。
   1. 要对应起来，这里不会自动转换：
      1. kebab-case -> kebab-case；
      2. camelCase -> camelCase；
   2. 并且 v-on **事件监听器在 DOM 模板中会被自动转换为全小写** (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。
   3. 因此，我们推荐你**始终使用 kebab-case 的自定义事件名**。
   4. 但是这里就是这样用了，好像也没有什么不一样，**并且很多组件库也这样写**？
2. [自定义组件的 v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
   1. model 选项可以用来避免这样的冲突；
3. [.sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)，一种父传子，子调父的简写形式；
   1. 在有些情况下，我们可能需要对一个 prop 进行“**双向绑定**”。
   2. 参考实例`/Users/qiuww/code/ks/minses/src/pages/Login/components/LoginForm.vue`

### 插槽

1. 将 `<slot>` 元素作为承载分发内容的出口；
2. 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
3. `<slot>Submit</slot>`，[后备内容](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%90%8E%E5%A4%87%E5%86%85%E5%AE%B9)，插槽的默认值；
4. 注意 v-slot 只能添加在 `<template>` 上 (只有一种例外情况)。
5. 绑定在 `<slot>` 元素上的 attribute 被称为插槽 prop。

### 动态组件 & 异步组件

1. 在动态组件上使用 keep-alive；
   1. 这个 `<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。
2. [异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)：在大型应用中，**我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。**为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，**且会把结果缓存起来供未来重渲染**。

### 处理边界情况

1. 强制更新: **由于 JavaScript 的限制，Vue 不能检测数组和对象的变化**。
   1. 你可能还没有留意到数组或对象的变更检测注意事项，或者你可能依赖了一个未被 Vue 的响应式系统追踪的状态。
   2. 然而，如果你已经做到了上述的事项仍然发现在极少数的情况下需要手动强制更新，那么你可以通过 \$forceUpdate 来做这件事。
2. 通过 v-once 创建低开销的静态组件: 这个组件包含了大量静态内容。

### 进入/离开 & 列表过渡

主要就是动画和过渡。

### 可复用性 & 组合

1. 混入：混入 (mixin) 提供了一种**非常灵活的方式**，**来分发 Vue 组件中的可复用功能**。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

   1. 当组件和混入对象含有同名选项时，这些选项将以**恰当的方式**进行“合并”。
   2. 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
   3. **同名钩子函数将合并为一个数组，因此都将被调用**。另外，混入对象的钩子将在组件自身钩子之前调用。
   4. Vue.extend() 也使用同样的**策略进行合并**。
   5. 混入也可以进行**全局注册**。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。

2. 自定义指令：用于操作 template，操作 html 元素，也可以设置样式之类的；
   1. 除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。
3. 插件：插件通常用来为 Vue 添加全局功能。
   1. 通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成，所以**基本都在 main.js 中使用**；
   2. 插件通常用来为 Vue 添加全局功能。插件都是全局的。
   3. Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
4. 过滤器
   1. 过滤器可以用在两个地方：双花括号插值和 v-bind 表达式。

### TS 支持

[声明额外的 property 和组件选项](https://cn.vuejs.org/v2/guide/typescript.html#%E5%A2%9E%E5%BC%BA%E7%B1%BB%E5%9E%8B%E4%BB%A5%E9%85%8D%E5%90%88%E6%8F%92%E4%BB%B6%E4%BD%BF%E7%94%A8)

插件可以增加 Vue 的全局/实例 property 和组件选项。在这些情况下，在 TypeScript 中制作插件需要类型声明。庆幸的是，**TypeScript 有一个特性来补充现有的类型**，叫做**模块补充 (module augmentation)**。

```ts
// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue';

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $myProperty: string;
  }
}
```

### 函数式组件

### [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

现在是时候深入一下了！Vue 最独特的特性之一，是其非侵入性的响应式系统。**数据模型仅仅是普通的 JavaScript 对象**。

1. 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。
2. Object.defineProperty 是 ES5 中一个**无法 shim 的特性**，**这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因**。
3. 这些 getter/setter 对用户来说是不可见的，但是**在内部它们让 Vue 能够追踪依赖**，在 property 被访问和修改时通知变更。
   1. 对于对象：**Vue 无法检测 property 的添加或移除**。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，**所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的**。也就是只能操作存在的属性。
      1. 对于嵌套的对象呢？

## 工具

### 单文件组件

[怎么看待关注点分离？](https://cn.vuejs.org/v2/guide/single-file-components.html#%E6%80%8E%E4%B9%88%E7%9C%8B%E5%BE%85%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB%EF%BC%9F)

1. 一个重要的事情值得注意，关注点分离不等于文件类型分离。

```html
<!-- 组件html、css、js切分 -->
<!-- my-component.vue -->
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```

### @Emit 修饰符

[@Emit(event?: string) decorator](https://www.npmjs.com/package/vue-property-decorator#emitevent-string-decorator)

```ts
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class YourComponent extends Vue {
  count = 0;

  @Emit()
  addToCount(n: number) {
    this.count += n;
  }

  @Emit('reset')
  resetCount() {
    this.count = 0;
  }

  @Emit()
  returnValue() {
    return 10;
  }

  @Emit()
  onInputChange(e) {
    return e.target.value;
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20);
      }, 0);
    });
  }
}

// is equivalent to
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    addToCount(n) {
      this.count += n;
      this.$emit('add-to-count', n);
    },
    resetCount() {
      this.count = 0;
      this.$emit('reset');
    },
    returnValue() {
      this.$emit('return-value', 10);
    },
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e);
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20);
        }, 0);
      });

      promise.then(value => {
        this.$emit('promise', value);
      });
    }
  }
};
```

## jsx 支持

安装依赖：

`@vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props`

配置 .babelrc ：

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@vue/babel-preset-jsx',
      {
        injectH: false
      }
    ]
  ]
};
```

## [配置环境变量](https://segmentfault.com/a/1190000015133974)

在项目中，也就是 src 中使用环境变量的话，必须以 VUE*APP*开头。

cli-3.0 总共提供了四种方式来制定环境变量：

1. 在根目录添加.env 文件，配置所有情况下都会用到的配置（不知道这个存在的意义，所有的都需要的也就不需要配置了吧）。
2. 在根目录添加.env.local 文件，**配置所有情况下都会用到的配置，与.env 的区别是只会在本地，该文件不会被 git 跟踪**。
3. 在根目录添加.env.[mode] 文件，配置对应某个模式下的配置,比如：.env.development 来配置开发环境的配置。
4. 在根目录添加.env.[mode].local 文件，配置对应某个模式下的配置,与.env.[mode]的区别也只是会在本地生效，该文件不会被 git 跟踪。

模式是 Vue CLI 项目中的一个重要概念。默认情况下，Vue CLI 项目中有三种模式：

1. development：在 vue-cli-service serve 下，即开发环境使用
2. production：在 vue-cli-service build 和 vue-cli-service test:e2e 下，即正式环境使用
3. test： 在 vue-cli-service test:unit 下使用

如果你想要修改模式下默认的环境变量的话可以通过`--mode mode`来实现
