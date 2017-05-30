<!-- 标准的vue组件，包含三个部分，一个是模板，一个是script，一个是样式 -->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- components引用 -->
    <!-- <router-view></router-view> -->
    <h2>hello world</h2>
    <h1 v-text = 'title'></h1>
    <input v-model = 'newItem' v-on:keyup.enter='addNew'>
    <ul>
        <li v-for='item in items' v-bind:class = '{finished: item.isFinished}' v-on:click = 'toggleFinish(item)'></li>
        {{item.label}}      
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      title: 'this is a test of todoList',
      items: [{
        label: '整个牛项目'
      }],
      newItem: ''
    }
  },
  methods: {
    toggleFinish: function (item) {
      item.isFinished = !item.isFinished
    },
    addNew: function () {
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem = ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
