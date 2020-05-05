<template>
  <div class="childre">
    childre:
    <p>message: {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Children',
  props: ['message'],
  beforeCreate() {
    console.log('Children beforeCreate');
  },
  created() {
    console.log('Children created');
  },
  beforeMount() {
    console.log('Children beforeMount');
  },
  mounted() {
    console.log('Children mounted');
  },
  beforeUpdate() {
    console.log('Children beforeUpdate');
  },
  updated() {
    console.log('Children updated');
  },
  beforeDestroy() {
    console.log('Children beforeDestroy');
  },
  destroyed() {
    console.log('Children destroyed');
  },
};
</script>

<style></style>
