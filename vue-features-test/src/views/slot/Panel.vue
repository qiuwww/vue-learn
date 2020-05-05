<!-- 这里定义模板，挖坑 -->
<template id="panel-tpl">
  <div class="panel">
    panel：
    <div class="title">
      <!-- 要插入的位置 -->
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="content">
      <!-- 要插入的位置 -->
      <slot name="content">{{ content }}</slot>
    </div>
    <div class="bottom">
      <!-- 要插入的位置 -->
      <slot name="bottom"> {{ bottom }}</slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'PanelTpl',
  props: ['title', 'content', 'bottom'],
};
</script>

<style scoped></style>
