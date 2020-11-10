<template>
  <div></div>
</template>

<script>
// 如果你发现自己不得不在单个组件里做很多建立和清理的工作，最好的方式通常还是创建更多的模块化组件。
export default {
  mounted() {
    this.creatInterval('hello');
    this.creatInterval('world');
  },
  methods: {
    creatInterval(msg) {
      // 在当前的函数周期内清除，不需要在beforeDestroy生命周期内再单独操作
      let timer = setInterval(() => {
        console.log(msg);
      }, 1000);

      this.$once('hook:beforeDestroy', function() {
        clearInterval(timer);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
