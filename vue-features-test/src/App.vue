<template>
  <div id="app">
    <h2>查看相关部分的功能：</h2>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/test/template">/test/template</router-link>
      <router-link to="/directives">指令测试</router-link>
      <router-link to="/test/computed-watch">/test/computed-watch</router-link>
      <router-link to="/test/vuex-test">/test/vuex-test</router-link>
      <router-link to="/test/life-cycle">/test/life-cycle</router-link>
      <router-link to="/test/component-regist">/test/component-regist</router-link>
      <router-link to="/test/communication">组件通信：/test/communication</router-link>
      <router-link to="/vue-instance">Vue实例</router-link>
      <router-link to="/template-syntax">模板语法</router-link>
      <router-link to="/computed-watch">计算属性和监听器</router-link>
      <router-link to="/render-list">列表渲染</router-link>
      <router-link to="/component-base">组件基础</router-link>
      <router-link to="/mixin">混入</router-link>
      <router-link to="/Vue-Ts-Standard">Vue-Ts-Standard</router-link>
      <router-link to="/vue-features-test-10/测试id/测试type">10个Vue开发技巧助力成为更好的工程师</router-link>
      <router-link to="/VModelComponent">
        v-model作用于元素与组件
      </router-link>
      <router-link to="/JSXComponent">
        jsx-demo
      </router-link>
    </div>
    <h2>这里展示具体的页面内容:</h2>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  h2 {
    margin: 10px 0;
    color: #42b983;
  }
}
#nav {
  // padding: 10px;
  display: flex;
  flex-direction: column;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
    width: 33%;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
