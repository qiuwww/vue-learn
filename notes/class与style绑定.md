## Class 与 Style 绑定

### 使用增强的v-bind来实现
```
数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是属性 ，我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在 v-bind 用于 class 和 style 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。
```

### 动态的绑定语法
```
<div v-bind:class="{ active: isActive }"></div>
```
### 组合使用
```
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
data: {
  isActive: true,
  hasError: false
}
渲染结果
<div class="static active"></div>

你也可以直接绑定数据里的一个对象：
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
渲染的结果和上面一样。
```

### 数组语法
```
我们可以把一个数组传给 v-bind:class ，以应用一个 class 列表：
<div v-bind:class="[activeClass, errorClass]">
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
渲染为:
<div class="active text-danger"></div>
```
### 绑定内联样式
```
对象语法

v-bind:style 的对象语法十分直观——看着非常像 CSS ，其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
直接绑定到一个样式对象通常更好，让模板更清晰：
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
同样的，对象语法常常结合返回对象的计算属性使用。
数组语法

v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：
<div v-bind:style="[baseStyles, overridingStyles]">
```

### 自动添加前缀
```
当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。
```