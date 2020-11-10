<!-- A.vue -->
<template>
  <div>
    <button @click="sendMsg()">B页面发送消息</button>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { EventBus } from "./event-bus.js";
export default {
  name: "ChildrenB",
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    sendMsg() {
      EventBus.$emit("childrenMsg", "来自B页面的消息");
    }
  },
  mounted() {
    // 接受消息
    EventBus.$on("childrenMsg", msg => {
      this.msg = msg;
    });
    EventBus.$on("parentMsg", msg => {
      this.msg = msg;
    });
  }
};
</script>
