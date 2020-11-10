<template>
  <div class="computed-watch">
    <button @click="changeName">修改name</button>
    <div>message: {{ message }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({})
export default class ComputedWatch extends Vue {
  name = "world";

  greetings = "hello";

  log = "";

  get message() {
    // 这里如果调用message，就会陷入回调地狱
    console.log("###Computed", this.name);
    return this.greetings + this.name;
  }

  changeName() {
    this.name = ["li li", "lao wang"][Math.round(Math.random())];
  }

  // name改变的时候，执行函数
  @Watch("name", { immediate: true, deep: true })
  // 具名回调
  onPersonChanged1(name: string, oldName: string) {
    // 初始化name的时候，就会执行一次
    console.log("###Watch", name, oldName);
  }
}
</script>

<style lang="less" scoped></style>
