<template>
  <div class="child">
    <div>Child</div>
    <button @click="addToCount">增加</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component
export default class Project extends Vue {
  // 要从一个子组件 emit 一个方法到父组件，在 Typescript 中，我们将使用 @Emit 装饰器。
  // 在第一个示例中，函数名 addToCount 被转换为短横线分隔 (kebab-case)，这与 Vue emit 的工作方式非常类似。
  // @Emit()
  // addToCount(n: number) {
  //   this.count += n;
  // }
  // 如下等价
  // addToCount(n) {
  //   this.count += n
  //   this.$emit('add-to-count', n)
  // },
  // @Prop

  @Prop() readonly resetCount!: Function;

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToCount() {}

  // 在第二个示例中，我们传递方法的显式名称 resetData，并使用该名称。因为 addData 是驼峰式的，所以它再次被转换为短横线分隔 (kebab-case)。
  reset() {
    this.resetCount();
  }
}
</script>

<style scoped></style>
