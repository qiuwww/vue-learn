// 定义一个名为 button-counter 的新组件
import Vue, { VNode } from 'vue';

// 这里是什么类型的
// 这里是类型推断，不需要主动声明
// 这样的是全局注册的组件
const ButtonCounter = Vue.component('button-counter', {
  data: function() {
    return {
      count: 0,
    };
  },
  // 字符串模板
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});

// 局部组件注册
const ComponentHello = Vue.extend({
  name: 'ComponentHello',
  data() {
    return {
      msg: 'Hello',
    };
  },
  methods: {
    // 需要标注有 `this` 参与运算的返回值类型
    greet(): string {
      return this.msg + ' world';
    },
  },
  computed: {
    // 需要标注
    greeting(): string {
      return this.greet() + '!';
    },
  },
  // render函数返回值作为模板
  // `createElement` 是可推导的，但是 `render` 需要返回值类型
  render(createElement): VNode {
    return createElement('div', this.greeting);
  },
});

// 这里如果是多个v-model怎么操作
// 多个v-model，不就是多个prop对应传递多个changeValue事件吗？v-model的好处就是不用自己添加事件，其实也没太大的意义
const customInput = Vue.extend({
  // 这里的属性接受的是value（input），操作的事件是input
  //
  props: ['value', 'placeholder'],
  // v-on:input="$emit('input', $event.target.value)"
  template: `
    <div class="custom-input">
    custom-input:
    <input
      :placeholder="placeholder"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value.concat('#'))"
    >
    {{value}}
    </div>
  `,
  methods: {},
});

const BaseCheckbox = Vue.extend({
  // 这里是关键，解构model的事件和对应的属性
  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    checked: Boolean,
  },

  methods: {
    changeHandle($event: any) {
      this.$emit('change', $event.target.checked);
    },
  },

  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="changeHandle"
    >
  `,
});

export { ButtonCounter, ComponentHello, customInput, BaseCheckbox };
