<!-- A.vue -->
<template>
  <div>
    <button @click="sendMsg()">A页面发送消息</button>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { EventBus } from './event-bus.js';
export default {
  name: 'ChildrenA',
  data() {
    return {
      msg: '',
    };
  },
  mounted() {
    // 接受消息
    EventBus.$on('childrenMsg', (msg) => {
      this.msg = msg;
    });
    EventBus.$on('parentMsg', (msg) => {
      this.msg = msg;
    });
  },
  methods: {
    name: 'ChildrenA',
    sendMsg() {
      EventBus.$emit('childrenMsg', '来自A页面的消息');
    },
  },
};
</script>
