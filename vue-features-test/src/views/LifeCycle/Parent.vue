<template>
  <div class="parent">
    parent:
    <p>message: {{ message }}</p>
    <v-children :message="message"></v-children>
  </div>
</template>

<script>
import Children from "./Children.vue";
export default {
  data() {
    return {
      message: "hello"
    };
  },
  components: {
    VChildren: Children
  },
  beforeCreate() {
    console.log("Parent beforeCreate");
  },
  created() {
    console.log("Parent created");
    // 这里定时改变message
    setTimeout(() => {
      this.message = this.message
        .split("")
        .reverse()
        .join("");
    }, 1000);
  },
  beforeMount() {
    console.log("Parent beforeMount");
  },
  mounted() {
    console.log("Parent mounted");
  },
  beforeUpdate() {
    console.log("Parent beforeUpdate");
  },
  updated() {
    console.log("Parent updated");
  },
  beforeDestroy() {
    console.log("Parent beforeDestroy");
  },
  destroyed() {
    console.log("Parent destroyed");
  }
};
</script>

<style></style>
