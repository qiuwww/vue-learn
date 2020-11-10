<template>
  <div>子组件ChildLifeCycle</div>
</template>

<script>
// 监听组件生命周期
export default {
  mounted() {
    console.log('子组件的挂载', this);
  }
};
</script>

<style lang="scss" scoped></style>
