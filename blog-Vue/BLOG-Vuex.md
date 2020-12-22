---
title: Vuex
tags:
  - Vue
  - Vuex
  - 状态管理器
categories:
  - [Vue, Vuex]
---

[TOC]

## Vuex 是什么

1. Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。
2. 它采用**集中式存储管理应用的所有组件的状态**，并以相应的规则保证状态以一种可预测的方式发生变化。
3. Vuex 类似 Redux 的状态管理器，用来管理 Vue 的所有组件状态。
4. Vuex 背后的基本思想，借鉴了 Flux、Redux 和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

## Vuex 主要接口/模块

### getter，延伸属性，，对应 redux 的 connect 的时候的操作

1. 有时候我们需要从 store 中的 state 中派生出一些状态。
2. Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
3. 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
4. Getter 会暴露为 store.getters 对象。
5. mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。

### mutation，纯函数修改状态，，对应 redux 的 reducer

1. 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
2. Vuex 中的 mutation 非常类**似于事件**：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
3. 与 reducer 基本一致。
4. Mutation 必须是同步函数。
5. 可以使用常量替代 Mutation 事件类型。
6. 在组件中使用 this.\$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用。
7. 会被合并到 methods 中。
8. 直接修改 state，并不是返回一个新的 state，常见的 save 如下：

```js
save(state,payload) {
  for (let key in payload) {
    state[key] = payload[key];
  }
}
```

### action，异步操作，对应 redux 的 action

Action 类似于 mutation，不同在于：

1. Action **提交的是 mutation，而不是直接变更状态**。
2. Action 可以包含任意异步操作。

通常的操作：

1. 在组件中使用 this.\$store.dispatch('xxx') 分发 action，
2. 或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用。
3. 会被合并到 methods。

### module

用于组合 store。

## Vuex 的数据流形式

这样是单向数据流了。

[vuex 数据流](./imgs/vuex.png)

1. 数据控制视图: state -> Vue Components
   1. 从 store 实例中读取状态最简单的方法就是**在计算属性中返回某个状态**。
   2. 获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余，可以使用 **mapState** 辅助函数帮助我们生成计算属性。
   3. getter，用于获取延伸参数，对应的辅助函数 mapGetter。
2. 视图事件改变状态: Vue Components -> Dispatch -> Actions -> Commit -> Mutations -> Mutate -> state。
   1. `this.\$store.commit('xxx')`，直接修改 Mutations；
   2. `this.\$store.dispatch('xxx')`， 分发 action，调用 action，修改 Mutations。

## Vuex 和单纯的全局对象有以下两点不同

1. Vuex 的**状态存储是响应式的**。当 Vue 组件从 store 中读取状态的时候，**若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新**。

2. **你不能直接改变 store 中的状态**。改变 store 中的状态的**唯一途径就是显式地提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## 为什么要用 Vuex ｜ Vuex 的优点

1. 跨组件状态共享；
2. 单向数据流；

当你打算开发大型单页应用（SPA），会出现多个视图组件依赖同一个状态，来自不同视图的行为需要变更同一个状态。

### 单向数据流结合双向数据绑定

1. 二者不是互斥的，可以结合使用，双向数据绑定，就像是一个手动的 change 事件回调，调用了 commit。
2. Vuex state 数据的双向绑定。

```js
// 在从组件的computed中
computed: {
  user: {
      get() {
        return this.$store.state.user
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit('USER', v)
      }
  } // 在组件中就可以使用
}
<input v-modle="user" />
```

## Redux 对比 Vuex

Redux： view——>actions——>reducer——>state 变化——>view 变化（同步异步一样）

Vuex： view——>commit——>mutations——>state 变化——>view 变化（同步操作） view——>dispatch——>actions——>mutations——>state 变化——>view 变化（异步操作）
