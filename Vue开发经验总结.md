---
title: Vue 学习/开发经验总结
---

## blog-vue，理论

md 文档类的总结。

## vue-features-test，实践

参照文档的功能测试 demo。

## 1. Vue 定义全局组件，如全局的 Loading

[参考文章](https://www.jianshu.com/p/b99a163a27f1)

### 单一定义，处处引用

这里的关键是要每次插入页面；

### 全局 use，插件注入

这里只用插入页面一次，后续可以直接使用。

## Vue 对比 React

1. template -> React.Fragement

## 风格指南

[官方文档：风格指南](https://cn.vuejs.org/v2/style-guide/#%E8%A7%84%E5%88%99%E5%BD%92%E7%B1%BB)

## [组件中使用 v-model](https://cn.vuejs.org/v2/guide/forms.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)

## 常见问题

### 直接组件上@click，如果组件内部没有定义点击事件，或者定义了点击事件，是否可以正常调用

### [Slots](https://cn.vuejs.org/v2/api/#v-slot)，v-solt

1. [webcomponents](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md)
2. 插件/插槽，也就是自组件，可以用来丰满应用；
3. 插件/插槽，坚持省略不必要的元素的目标，插件一般使用 template 来包裹，类似 React.Fragement；
4. `#header` 和 `v-solt:header` 的区别？
   1. 跟 v-on 和 v-bind 一样，v-slot 也有缩写，
   2. 即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header。
5. **插槽与组件的区别**？（这里可以进行深入的类比）
   1. 插槽用来对组件进行小的修整，**用于自定义一些功能，对于组件的定制**；
   2. 组件用于组合页面，是对于页面的定制；
   3. **插槽可以作为组件的属性**传入；
   4. 组件也可以作为**插槽的插件**；

```html
<!-- 一、如下定义组件，v-slot:header -->
<!-- 1.作用域插槽，给渲染的插槽上绑定数据，作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里 -->
<!-- 透传参数 -->
<!-- https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD -->
<template #sku-actions="props"></template>
<template #sku-header-price="props"></template>

<template #footer></template>
<template #header></template>

<!-- 2.匿名插件，一般用于默认值，使用default来获取 -->
<!-- 插槽名 (可选，默认值是 default) -->
<template></template>
<div>内容</div>

<!-- 二、如下引用组件 -->
<!-- 1.匿名插槽，一个不带 name 的 <slot> 出口会带有隐含的名字“default”。 -->
<slot></slot>
<!-- 2.具名插槽 -->
<slot name="header"></slot>
```
