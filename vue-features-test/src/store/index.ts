import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // 定义状态
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'Vue', done: true },
      { id: 2, text: 'React', done: true },
      { id: 3, text: 'Java', done: false },
    ],
    quote: {},
  },
  mutations: {
    // 定义reducer，这里来修改state
    increment(state) {
      // 这里是直接修改，不像redux，是生成一个新的state来替换旧的
      state.count++;
    },
    save(state, payload) {
      console.log('save', state, payload);
      // 这里需要直接修改state
      for (let key in payload) {
        state[key] = payload[key];
      }
    },
  },
  getters: {
    // 通过getter，进行预处理
    doneTodosCount: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
  },
  // 异步操作
  actions: {
    getQuotes({ commit, state }) {
      fetch(`https://v1.hitokoto.cn/`)
        .then((res) => res.json())
        .then((quote) => {
          commit('save', { quote });
        });
    },
  },
  // 组合store
  modules: {},
});
