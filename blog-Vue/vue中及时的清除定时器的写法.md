# vue 中及时的清除定时器的写法

```vue
<script>
export default {
  mounted() {
    const timer = setInterval(() => {
      this.getList();
    }, 1000);

    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer);
    });
  },
};
</script>
```
