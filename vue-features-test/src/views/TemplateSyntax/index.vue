<template>
  <div class="template">
    <h3>模板语法测试：</h3>
    <div v-once>v-once： {{ count }}</div>
    <div>默认的渲染：{{ count }}</div>
    <div v-html="rawHtml"></div>

    <div class="white-space">{{ whiteSpaceText }}</div>
  </div>
</template>

<script lang="ts">
/**
 * 模板语法
 * 1. v-html
 * 2. v-once
 */
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class TemplateSyntax extends Vue {
  count = 1;

  rawHtml = '<b>rawHtml</b>';

  whiteSpaceText = `hahaha
  hhh`;

  mounted() {
    this.count = 2;
  }
}
</script>

<style lang="less" scoped>
.white-space {
  // 这里影响换行的展示
  white-space: pre-wrap;
}
</style>
