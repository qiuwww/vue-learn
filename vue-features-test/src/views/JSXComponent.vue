<script>
const MyComponent = {
  props: ['msg'],
  render() {
    return (
      <div>
        <p>hahaha，{this.msg}</p>
        <p>这里是插槽的展示位置：</p>
        {this.$slots.header}
        {this.$slots.content}
        {this.$slots.footer}
      </div>
    );
  }
};
export default {
  components: { MyComponent },
  data() {
    return {
      inputValue: ''
    };
  },
  render() {
    return (
      <div>
        <h3>内容</h3>
        {/* 纯文本 */}
        <p>hello, I am Gopal</p>
        {/* 动态内容 */}
        <p>hello {this.msg}</p>
        {/* 输入框，这里即能使用jsx，也能使用vue的语法 */}
        <input placeholder='请输入' v-model={this.inputValue} />
        {/* 自定义组件 */}
        <MyComponent msg={this.inputValue}></MyComponent>
        {/* 插槽 */}
        <header slot='header'>header</header>
        <header slot='content'>content</header>
        <footer slot='footer'>footer</footer>
      </div>
    );
  }
};
</script>
