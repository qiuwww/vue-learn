<template>
  <div class="component-test">
    component-test:
    <br />
    global-component:
    <global-component message="global component"></global-component>
    <br />
    local-component:
    <local-component></local-component>
  </div>
</template>

<script>
var LocalComponent = {
  name: 'LocalComponent',
  props: ['message'],
  template:
    "<div><h1>{{message}}</h1><input type='text' v-model='message'></input></div>",
};

export default {
  name: 'CompoentTest',
  component: {
    LocalComponent,
  },
};
</script>

<style></style>
