---
title: Vue组件设计
date: 2017-3-6
tags:
  - Vue
  - 组件设计
categories:
  - [Vue, 组件设计]
---

## Vue 组件类型编写

组件类型分类：

查看`views/ComponentRegister`。

1. 全局组件`Vue.component('my-component-name', { /* ... */ })`；
   1. 全局组件定义方式，是直接给全局对象 Vue 注册了一个组件。
2. 局部组件`new Vue()`。
   1. 你不必把每个组件都注册到全局。
   2. 你可以通过某个 Vue 实例/组件的实例选项 components 注册仅在其作用域中可用的组件。

## Vue 组件间通信

1. 父子组件通信；
2. 兄弟组件通信；
3. 跨组件通信；

### Vue 组件间通信六种方式

[vue 组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626?utm_source=tag-newest)

vue 组件间通信的几种方式，如

1. `props/\$emit`，直接作为属性传递；
   1. 父组件向子组件传值，`props/@:event`；
   2. 子组件向父组件传值（通过事件形式）`$emit`，
2. `$emit/$on`，**发布订阅模式**；
   1. 这种方法通过一个**空的 Vue 实例作为中央事件总线（事件中心）**，用它来触发事件和监听事件，
   2. 巧妙而轻量地实现了**任何组件间的通信**，包括父子、兄弟、跨级。
3. vuex，全局状态管理，`this.$store`；
4. `$parent/$children`、**直接拿到组件的引用**，当然不太推荐；
   1. [vm-parent](https://cn.vuejs.org/v2/api/#vm-parent)
   2. [vm.\$children](https://cn.vuejs.org/v2/api/#vm-children)
5. `$attrs/$listeners`；
   1. [vm-attrs](https://cn.vuejs.org/v2/api/#vm-attrs)
   2. [vm-listeners](https://cn.vuejs.org/v2/api/#vm-listeners)
6. `provide/inject`，**允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深**，并在起上下游关系成立的时间里始终生效。
   1. 与 React 的 context 基本一致，不过更方便，不需要引用了；

## 组件接口设计 （比如设计一个表单组件/Picker) —— 基于 react 或 vue

1. 主要也就是**易用性与单一性**，处理好**组件的状态**，处理好**生命周期**的问题。
2. 组件的 prop 和 state（data），原则很简单：
   1. prop 是对外的接口，
   2. state（data）是组件的内部状态。
3. 组件的生命周期。

## 子组件懒加载，便于切割代码，按需加载

```vue
<!-- 1. vue异步组件实现懒加载 -->
<template>
  <div class="hello">
    <One-com></One-com>
  </div>
</template>

<script>
export default {
  components: {
    'One-com': (resolve) => (['./one'], resolve),
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- 2. ES的import()，这里是需要webpack支持的 -->
<template>
  <div class="hello">
    <One-com></One-com>
  </div>
</template>

<script>
const One = () => import('./one');
export default {
  components: {
    'One-com': One,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>
```

## Vue 内容分发技术

内容分发是一种为组件传递参数的方法。

## Vue 通用组件的设计和实现思路？？
