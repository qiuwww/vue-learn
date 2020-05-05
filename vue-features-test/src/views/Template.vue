<template>
  <div class="template">
    模板功能测试：
    <div class="text">
      text:
      <p>Message: {{ msg }}</p>
      <p v-once>只执行一次，不绑定数据: {{ msg }}</p>
    </div>
    <div class="html">
      html:
      <p>Using mustaches: {{ rawHtml }}</p>
      <p>
        为了输出真正的 HTML，你需要使用 v-html 指令:
        <span v-html="rawHtml"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Template',
  data: () => ({
    msg: 'hello world!',
    rawHtml: `<span style="color: red">This should be red.</span>`,
  }),
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
