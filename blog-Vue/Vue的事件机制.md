---
title: Vue的事件机制
tags:
  - Vue
  - 事件处理
categories:
  - [Vue, 事件处理]
---

1. 可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码；
2. 除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法，可以传递参数；
3. 有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 \$event 把它传入方法。

## [v-on 指令修饰符](https://cn.vuejs.org/v2/api/#v-on)

[事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

1. .stop
2. .prevent
3. .capture 使用事件捕获模式
4. .self 是当前元素自身时触发处理函数
5. .once
6. .passive 滚动事件的默认行为 (即滚动行为) 将会立即触发。修饰符尤其能够提升移动端的性能。
7. .exact 修饰符允许你控制**由精确的系统修饰符组合触发**的事件

使用修饰符时，顺序很重要；例如用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

### 按键修饰符 @keyup | v-on:keyup

[官方文档](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

全部的按键别名：

1. .enter
2. .tab
3. .delete (捕获“删除”和“退格”键)
4. .esc
5. .space
6. .up
7. .down
8. .left
9. .right
10. .middle

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112;
```

## 模拟触发事件

### 方式一（分发实践，通过别的函数来触发）

在组件中，可以使用 `$emit`, `$on`, `$off` 分别来分发、监听、取消监听事件。

一般用在自定义事件，比如父组件传递过来的事件。

```js
vm.$on('test', function (msg) {
  console.log(msg);
});
// 用于触发当前组件的时间，或者父实例定义的事件（回调）
vm.$emit('test', 'hi');
// => "hi"
```

### 方式二（与原生 dom 操作类似，明显更低级一点），最好是使用 el 来获取元素

```js
methods:  {
  handleBtnClick: function(){
    document.getElementById("text").click();
  },
  handleTextClick: function(){
    alert("hello");
  }
}
```
