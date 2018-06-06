# Vue-Learn

## 关于vue文件夹，内包含在官网下载的vue资源文件
地址：http://vuejs.org
## 对照官网，把实例都写一遍，以后用到了查询方便

## 一些接口与方法

### extend扩展对象方法
```
可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器：
var MyComponent = Vue.extend({
  // 扩展选项
})
// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```
**只有被代理的属性在对象实例化之前添加的才是响应的。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。**

### Vue实例的其他对象和方法
```
除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分。
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
注意，不要在实例属性或者回调函数中（如 vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为箭头函数绑定父上下文，所以 this 不会像预想的一样是 Vue 实例，而是 this.myMethod 未被定义。
```
### 实例的生命周期，也就是执行中的不同阶段，与XHR对象比较像
```
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```
**生命周期示意图**https://cn.vuejs.org/images/lifecycle.png
