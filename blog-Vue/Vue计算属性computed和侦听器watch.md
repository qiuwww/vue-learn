---
title: Vue计算属性computed和侦听器watch
tags:
  - Vue
  - computed
  - watch
categories:
  - Vue
---

[TOC]

[计算属性和侦听器](https://cn.vuejs.org/v2/guide/computed.html)

## 计算属性-computed

1. 在模板中放入**太多的逻辑**会让模板过重且难以维护。
2. 对于任何复杂逻辑，你都应当使用计算属性。
3. 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter。
4. 计算属性可以在双向数据绑定之间添加一层，也就是可以让用户自己控制双向绑定的数据，执行一些格式化操作，或者是一些副作用。

### 计算属性对比 methods

1. 我们可以将同一函数定义为一个**方法**而不是一个计算属性。
2. **两种方式的最终结果确实是完全相同的**。
3. 然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。
   1. 只在**相关响应式依赖发生改变时它们才会重新求值**。
   2. 这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

## 属性侦听-watch

1. Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。
2. 当你有一些数据需要随着其它数据变动而变动时。
   1. 这个 computed 也是可以做到的，使用 computed.set 方法响应。
3. 虽然**计算属性在大多数情况下更合适**，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个**更通用的方法，来响应数据的变化**。
4. 专门是为了处理数据合成和副作用的。
5. 使用 watch 选项**允许我们执行异步操作 (访问一个 API)**，**限制我们执行该操作的频率**，并在我们得到最终结果前，设置中间状态。**这些都是计算属性无法做到的**。

## 对比 computed 与 watch

1. computed，计算属性
   1. 得到一个**新的值**，这个值不能与 data 中返回的值重名，这个值可以直接使用。
   2. 当前的值，在依赖的可观察的数据更改的时候触发。
2. watch，观察值，key/value，数据对组成
   1. 观察 data 中的数据，有变动的时候，调用对应的回调函数，**就像是专门做的副作用操作**。

总结二者的使用场景：

1. 当我们要进行**数值计算**，而且**依赖于其他数据**，那么把这个数据设计为 computed；
2. 如果你需要在某个数据变化时**做一些事情（副作用）**，使用 watch 来观察这个数据变化。

## 输入框的值的格式化问题

控制输入框的输入格式：

1. `type="number"` 来控制，但是不能过滤掉 e 这个字母，标示自然底数；
2. **number 修饰符 可以控制只输入数字**；v-model.number，与 type="number"操作一致；
3. 使用 computed 来控制，操作比较麻烦，但是逻辑比较正常；
4. 还要对后续数据的操作进行响应。

```html
<div id="demo">
  <input v-model="inpNum" />
  <p>{{inpNum}}</p>
</div>
<script>
  new Vue({
    el: '#demo',
    data: {
      oldNum: 0,
    },
    computed: {
      // v-model指向于一个计算属性，就需要添加set方法，且一般的set方法需要依赖外部变量来保存状态传递给get方法。
      inpNum: {
        get: function () {
          return this.oldNum;
        },
        // 使用计算属性，设置的时候，添加过滤操作
        set: function (newValue) {
          this.oldNum = newValue.replace(/[^\d]/g, '');
        },
      },
    },
  });
</script>
```

### 最终的解决方案

1. 首先对`v-model`，添加`input`替换为`change`事件的 `.lazy` 的修饰符；
2. 使用指令来绑定`input`事件，这个时候`input`在`change`事件前面触发，所以可以先对数据进行格式化，然后映射到 model 上；
3. 输入框的事件触发流程 `focus->keydown->input（这个时候可以拿到value）->keyup->change->blur`。

```html
<input
  type="text"
  v-model.lazy="form.amount"
  v-number-only
  placeholder="请输入借款金额"
/>
<script>
  Vue.directive('numberOnly', {
    bind: function (el) {
      el.handler = function () {
        el.value = el.value.replace(/[^\d]/g, '');
      };
      el.addEventListener('input', el.handler);
    },
    unbind: function (el) {
      el.removeEventListener('input', el.handler);
    },
  });
</script>
```
