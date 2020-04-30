<template>
  <div id="app">
    <h2>Simply todolist - vuejs</h2>
    <!-- v-on: 可以简写为 @ ；v-bind: 可以简写为 ： ，动态地绑定一个或多个特性，或一个组件 prop 到表达式。-->
    <!-- v-model ：在表单控件或者组件上创建双向绑定。 -->
    <input
      id="add-input"
      v-model="todoText"
      @keyup.enter="addTodo"
      placeholder="do what?"
    />
    <ul>
      <!-- (todoItem, index)，前一个参数元素，后一个参数是索引 -->
      <VTodo
        v-for="(todoItem, index) in todoList"
        :todoItem="todoItem"
        :index="index"
        :key="index"
      ></VTodo>
    </ul>
  </div>
</template>

<script>
import Todo from "./components/todo";
import Loading from "./Loading";
export default {
  // 只是一个名字，没有指定的话会有默认值。
  // name只有作为组件选项时起作用。
  // 允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。
  name: "todoList",
  /**
   * 组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。
   * 在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。
   * 在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。
   */
  components: {
    VTodo: Todo,
  },
  /**
   * Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，
   * 从而让 data 的属性能够响应数据变化。
   * 对象必须是纯粹的对象(含有零个或多个的key/value对)：
   * 浏览器 API 创建的原生对象，原型上的属性会被忽略。
   */
  data() {
    return {
      todoText: "",
    };
  },
  // 计算属性将被混入到 Vue 实例中。
  // 所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
  computed: {
    // todoList : function(){return ...}
    todoList() {
      // 获取所有状态
      return this.$store.getters.todos;
    },
  },
  // 事件注册
  methods: {
    addTodo() {
      this.$store.commit("addTodo", this.todoText);
      this.todoText = "";
    },
    deleteTodo(index) {
      this.$store.commit("deleteTodo", index);
    },
  },
};
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
#app {
  width: 800px;
  margin: 30px auto;
}
#add-input {
  width: 750px;
  height: 35px;
  padding: 0 5px;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
