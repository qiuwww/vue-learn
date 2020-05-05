---
title: Vue的虚拟Dom和Diff算法
tags:
  - Vue
  - 虚拟Dom
  - Diff算法
---

[节点、树以及虚拟 DOM](https://cn.vuejs.org/v2/guide/render-function.html#%E8%8A%82%E7%82%B9%E3%80%81%E6%A0%91%E4%BB%A5%E5%8F%8A%E8%99%9A%E6%8B%9F-DOM)

## Virtual DOM 是什么

1. Virtual DOM 就是用一个原生的 JS 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多；
   1. js 对象处理很快；
   2. 操作 dom 的速度很慢；
2. Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。
3. `return createElement('h1', this.blogTitle)`，
   1. 其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息**会告诉 Vue 页面上需要渲染什么样的节点**，包括及其子节点的描述信息。
   2. 我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。
4. 组件树中的所有 VNode 必须是唯一的。

## Virtual DOM 什么用

其实虚拟 DOM 在 Vue.js 中主要做了两件事：

1. 提供与真实 DOM 节点所对应的虚拟节点 vnode；
2. 将虚拟节点 vnode 和旧虚拟节点 oldVnode **进行比对**，然后更新视图
   对两个虚拟节点进行对比是虚拟 DOM 中最核心的算法即 patch，**patch 算法**的核心是 diff 算法，它可以判断出哪些节点发生了变化，从而只对发生了变化的节点进行更新操作。

## 既然 Vue 通过数据劫持可以精准探测数据变化,为什么还需要虚拟 DOM 进行 diff 检测差异

[参考文章](https://blog.csdn.net/qq_34629352/article/details/105016428)

1. 通常一个绑定一个数据就需要一个 Watcher,一但我们的绑定细粒度过高就会产生大量的 Watcher；这会带来内存以及依赖追踪的开销。
2. 而细粒度过低会无法精准侦测变化，**因此 Vue 的设计是选择中等细粒度的方案**；
   1. 在**组件级别进行 push 侦测的方式**，也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件，
   2. 然后在**组件内部进行 Virtual Dom Diff 获取更加具体的差异**，而 **Virtual Dom Diff** 则是 pull 操作,Vue 是 push+pull 结合的方式进行变化侦测的。

## vue 中 key 值的作用

[官方文档](https://cn.vuejs.org/v2/api/#key)

根本就是，相同的列表元素下，相同的 key，认为是不变的。

1. key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在**新旧 nodes 对比时辨识 VNodes**。
2. 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。
3. 使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
4. 有相同父元素的子元素**必须有独特的 key**。**重复的 key 会造成渲染错误**。
5. key 的作用主要是为了**高效的更新虚拟 DOM**。
6. 另外 vue 中在使用相同标签名元素的**过渡切换**时，也会使用到 key 属性，其目的也是为了让 vue 可以区分它们，否则 vue 只会替换其内部属性而不会触发过渡效果。

### [用 key 管理可复用的元素](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)

这里主要是用 key 来区别不同的节点，强制重新渲染。

1. Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
2. Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key attribute 即可。

## diff 算法

[参考文章](https://juejin.im/post/5ad6182df265da23906c8627)

vue 和 react 的虚拟 DOM 的 Diff **算法大致相同**，其核心是基于两个简单的假设：

1. 两个相同的组件产生类似的 DOM 结构，不同的组件产生不同的 DOM 结构。
2. 同一层级的一组节点，他们可以通过唯一的 id 进行区分。

基于以上这两点假设，使得虚拟 DOM 的 Diff 算法的复杂度从 O(n^3)降到了 O(n)。

## vm.\$nextTick( [callback] )

1. 将回调延迟到**下次 DOM 更新循环之后执行**。也就是在更新数据之后，dom 还没有被刷新的时候，后续的操作无法进行，需要等待 dom 更新之后再操作。
2. 在修改数据之后立即使用它，**然后等待 DOM 更新**。**它跟全局方法 Vue.nextTick 一样**，不同的是回调的 this 自动绑定到调用它的实例上。
3. 应该会用在，加载 map，可视化图表库的时候用到，更新 dom 节点，拿到之后进行初始化。

```vue
<transition> <span :key="text" ref="text">{{ text }}</span> </transition>

<script>
public text: string = 'text';
nextTickHandler($event): void {
  console.log("$event:", $event);
  // 修改数据
  this.text = 'changed';
  console.log(this.$refs.text);
  // <span>text</span>
  debugger
  // DOM 还没有更新
  this.$nextTick(function() {
    // DOM 现在更新了
    // `this` 绑定到当前实例
    console.log(this.$refs.text);
    // <span>changed</span>
  })
}
</script>
```
