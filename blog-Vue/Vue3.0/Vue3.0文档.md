# Vue3.0 文档

1. [nextTick()](https://cn.vuejs.org/api/general.html#nexttick)；
2. expose 函数用于显式地限制该组件暴露出的属性；
3. readonly()​：接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。
4. watchEffect()：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。
   1. 这个有点类似 computed，但是执行的是副作用；
5. watch()：侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。
6. toRef()：可以将值、refs 或 getters 规范化为 refs (3.3+)。
   1. 也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。
7. toRaw()​：根据一个 Vue 创建的代理返回其原始对象。
8. 组合式 API：依赖注入，不需要明确的指定数据的流向关系，可以跨域层级来传递 props：
   1. provide()​：提供一个值，可以被后代组件注入。
   2. inject()​：注入一个由祖先组件或整个应用 (通过 app.provide()) 提供的值。
9. `<Teleport>`​：将其插槽内容渲染到 DOM 中的另一个位置，[文档](https://cn.vuejs.org/guide/built-ins/teleport.html)；
   1. 这里的目标节点，不限定在 body 里边，这样其实，完全没必要显式的指定节点了；
      1. 但是还是需要组件被加载进去；
   2. 可以实现组件内的渲染位置的变化；
10. [<script setup>](https://cn.vuejs.org/api/sfc-script-setup.html)；
11. CSS 中的 v-bind()：单文件组件的 <style> 标签支持使用 v-bind CSS 函数将 CSS 的值链接到动态的组件状态；

## Composition API 可以说是 Vue3 的最大特点，那么为什么要推出 Composition Api，解决了什么问题

通常使用 Vue2 开发的项目，普遍会存在以下问题：

1. 代码的**可读性随着组件变大而变差**；
2. 每一种**代码复用的方式**，都存在缺点；
3. TypeScript 支持有限；

以上通过使用 Composition Api 都能迎刃而解。

Composition API 中，**组件根据逻辑功能来组织的**，一个功能所定义的所有 API 会放在一起（ 更加的 高内聚，低耦合 ）。 => 这里将 data、computed、mounted、watch 这些都进行了组装，确实更加清楚。

### 代码复用

1. 在 vue2.0 中，**当混入多个 mixin 会存在两个非常明显的问题：命名冲突、数据来源不清晰**。
2. 而 Composition Api 可以通过编写多个 hooks 函数就很好的解决了。
   1. Composition API 对 tree-shaking 友好，**代码也更容易压缩**。

## 实际上，选项式 API 是在组合式 API 的基础上实现的。它们只是同一个底层系统所提供的两套不同的接口

## ref

从概念上讲，你可以将 ref 看作是一个像这样的对象：

```js
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track();
    return this._value;
  },
  set value(newValue) {
    this._value = newValue;
    trigger();
  },
};
```

## reactive() 的局限性

1. 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。
2. 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，**因此我们必须始终保持对响应式对象的相同引用**。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失。
3. 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接。

## 组合式函数，hooks

在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。

## <Teleport> 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。
