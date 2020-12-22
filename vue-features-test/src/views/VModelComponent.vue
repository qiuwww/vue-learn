<!-- 组件的v-model -->
<template>
  <div class="v-model-component">
    <p>父组件的默认状态：{{ commonStatus }}</p>
    ChildrenCom:
    <ChildrenCom />
    ChildrenCom2:
    <ChildrenCom2 v-model="commonStatus" />
  </div>
</template>

<script>
var ChildrenCom = {
  data: function() {
    return {
      msg: '哈哈哈😄'
    };
  },
  template:
    '<div><input v-model="msg" type="text"><input v-bind:value="msg" v-on:input="msg=$event.target.value" type="text"></div>'
};
var ChildrenCom2 = {
  // 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。model 选项可以用来避免这样的冲突。
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String
  },
  template: `<div><input v-bind:value="value" v-on:change="$emit('change', $event.target.value)" type="text"></div>`
};

export default {
  components: {
    ChildrenCom,
    ChildrenCom2
  },

  data() {
    return {
      commonStatus: '▶︎'
    };
  }
};
</script>
