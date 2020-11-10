<template>
  <div class="child1">
    child1 name: child1
    <button @click="postMsg">子组件调用父组件的方法</button>
    <p>msg: {{ JSON.stringify(msg) }}</p>
  </div>
</template>

<script>
export default {
  name: "ChildrenProps",
  props: ["msg"],
  inject: ["name"],
  mounted() {
    console.log("inject", this.name); // 浪里行舟
    console.log("ChildrenProps", this);
    console.log("ChildrenProps this.$parent:", this.$parent);
    console.log("ChildrenProps this.$listeners:", this.$listeners);
  },
  methods: {
    postMsg: function() {
      // postMsg是一个自定义事件，在react中也是被当作一个属性进行传递
      this.$emit("postMsg", { message: "子向父组件传值", from: this.name }); // 自定义事件，传递值“子向父组件传值”
    }
  }
};
</script>

<style>
.child1 {
  background-color: aquamarine;
}
</style>
