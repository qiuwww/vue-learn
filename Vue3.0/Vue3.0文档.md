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
