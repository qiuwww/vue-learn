<template>
  <div id="app">
    <h4>查看相关部分的功能：</h4>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/test/template">/test/template</router-link>
      <router-link to="/test/directives">/test/directives</router-link>
      <router-link to="/test/computed-watch">/test/computed-watch</router-link>
      <router-link to="/test/vuex-test">/test/vuex-test</router-link>
      <router-link to="/test/life-cycle">/test/life-cycle</router-link>
      <router-link to="/test/component-regist">/test/component-regist</router-link>
      <router-link to="/test/communication">组件通信：/test/communication</router-link>
    </div>
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
  h4 {
    margin: 10px 0;
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
  }
}
</style>
