<template>
  <div>
    <h2>深入响应式原理</h2>
    <p>
      当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue
      将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property
      全部转为 getter/setter。Object.defineProperty 是 ES5 中一个无法 shim
      的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
