import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueLocalStorage from 'vue-localstorage'
// 这样之后就可以在Vue对象上调用VueLocalStorage对象了
Vue.use(VueLocalStorage)

const STORAGE_KEY = 'todos-vuejs'
const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}
const getters = {
  todos: state => state.todos
}
const mutations = {
  addTodo (state, text) {
    state.todos.push({
      text,
      done: false
    })
  },
  deleteTodo (state, index) {
    state.todos.splice(index, 1)
  },
  toggleTodo (state, index) {
    state.todos[index].done = !state.todos[index].done
  }
}
const localStoragePlugin = store => {
  // 在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化。
  // 通过提交 mutation，插件可以用来同步数据源到 store。
  store.subscribe((mutation, { todos }) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}
// Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
// 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
// Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。
// Vuex 插件就是一个函数，它接收 store 作为唯一参数：
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})
