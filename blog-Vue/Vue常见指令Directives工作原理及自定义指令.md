---
title: 指令 (Directives)
tags:
  - Vue
categories:
  - [Vue, Directives]
---

指令 (Directives) 是**带有 v- 前缀的特殊 attribute**。指令 attribute 的值预期是单个 JavaScript 表达式，v-for 是例外情况。

## 常用指令

1. v-text
2. v-html
3. v-show
4. v-if
5. v-else
6. v-else-if
7. v-on，简写`@`
8. v-bind，简写`:`
9. v-model

## v-slot

就是我在当前组件，我需要组合两个子组件，让他们两个嵌套在一起。

1. slot 插槽可以在组件的内容预留一个位置。
2. 类似于 placeholder。
3. 与路由的子组件功能类似，但是这里明显不需要通过路由来控制，所以要设计出来插槽来控制局部位置的渲染。

具体操作：

1. 挖坑语法(**组件定义**): `<slot name='slotname'>`默认值</slot>
2. 填坑语法(**组件使用**): `<div slot='slotname'>`任意内容(字符串,数据,其他组件等)</div> .. 注意,使用的使用是里用 `<div slot>` 而不是 `<slot>`。

### Vue 插槽实现原理

1. Vue 内部对插槽的实现原理是**子组件渲染模板时发现是 slot 标签则转换为一个\_t 函数**，
2. 然后把 slot 标签里的内容也就是**子节点 VNode 的集合作为一个\_t 函数的参数，\_t 等于 Vue 全局的 renderSlot()函数**。

与react的children很类似了，渲染的时候，调用子组件的render方法生成VDom。

## 自定义指令的使用

区分全局与当前组件的指令。

[官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)

[主要的生命周期](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)：

1. bind
2. inserted
3. update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
4. componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
5. unbind

```js
Vue.directive('color-switch', function (el, binding) {
  el.style.backgroundColor = binding.value;
})
// bind
// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind: function (el, binding, vnode) {
  // el 绑定的元素
  // binding，指令的相关参数
  // vnode，Vue 编译生成的虚拟节点
}
```

## v-bind:class 和 v-bind:style，[class 与 style 绑定](https://cn.vuejs.org/v2/guide/class-and-style.html)

### v-bind:class

class 会与 v-bind:class 合并。

```html
<!-- 1.直接量，不使用变量 -->
<div class="bind"></div>
<!-- 2.对象变量形式 -->
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

<!-- 3.数组形式，变量替换 -->
<div v-bind:class="[activeClass, errorClass]"></div>
```

### v-bind:style

```html
<!-- 1.直接量的形式 -->
<div style="color: red;"></div>

<!-- 2.属性绑定 -->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<!-- 3.对象形式 -->
<div v-bind:style="styleObject"></div>

<!-- 4.数组语法 -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
<!-- 多重值 -->
```

## 请问 v-if 指令 和 v-show 指令 有什么区别

[官方介绍：v-if vs v-show](https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

- v-if, 会在条件第一次为真的时候进行渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被**销毁和重建**。
- v-if,在 `<template>` 元素上使用 v-if **条件渲染分组**，使用 template 并不会渲染出来真实的 dom。
- v-else, 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。
- v-show 的元素**始终会被渲染并保留在 DOM 中**。v-show 只是简单地切换元素的 CSS 属性 display。v-show 不支持 `<template>` 元素，也不支持 v-else。
- v-show 就简单得多——不管初始条件是什么，**元素总是会被渲染**，并且只是简单地基于 CSS 进行切换。
- **v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销**。

### 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。当然不推荐同时使用。

## v-if 与 v-show 的区别

[v-if vs v-show](https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

1. v-if 是“真正”的条件渲染，因为它会**确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建**。
2. v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
3. 相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
4. 一般来说，**v-if 有更高的切换开销**，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
