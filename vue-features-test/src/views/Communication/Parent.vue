<template>
  <div class="parent">
    parent:
    <br />
    props和$emit形式：
    <children-props-emit :msg="msg" @postMsg="postMsg"></children-props-emit>
    <br />
    事件总线的形式：
    <button @click="postMsg2AB">发送消息给子组件</button>
    <p>childrenMsg: {{ childrenMsg }}</p>
    <children-a></children-a>
    <children-b></children-b>
  </div>
</template>

<script>
import ChildrenProps from './ChildrenProps.vue';
import { EventBus } from './event-bus/event-bus.js';

import ChildrenA from './event-bus/ChildrenA.vue';
import ChildrenB from './event-bus/ChildrenB.vue';

export default {
  provide: {
    name: '浪里行舟',
  },
  data() {
    return {
      msg: [],
      childrenMsg: '',
    };
  },
  components: {
    'children-props-emit': ChildrenProps,
    ChildrenA,
    ChildrenB,
  },
  mounted() {
    EventBus.$on('childrenMsg', (msg) => {
      this.childrenMsg = msg;
    });
  },

  methods: {
    // 调用父组件的事件来处理响应
    postMsg: function(msg) {
      console.log('父组件事件被调用，父组件接受到响应信息', msg);
      this.msg.push(msg);
    },
    // 事件总线调用
    postMsg2AB: function() {
      EventBus.$emit('parentMsg', '来自Parent组件的消息');
    },
  },
};
</script>

<style></style>
