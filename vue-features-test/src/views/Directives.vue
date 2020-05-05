<template>
  <div id="bind">
    指令功能测试：
    <div v-bind:id="dynamicId" class="bind">
      bind:
      <br />
      <button v-bind:disabled="isButtonDisabled" @click="changeDisabled">
        属性绑定测试
      </button>
      <br />
      <a v-bind:href="url" target="_blank">{{ url }}</a>
    </div>

    <div class="if-show">
      if-show指令测试：
      <button @click="ifShowChange">
        切换显示与隐藏
      </button>
      <p v-if="awesome">v-if，控制组件</p>
      <p v-show="awesome">v-show，控制css属性display</p>
    </div>

    <div class="for">
      for指令测试：
      <div v-for="item in items" :key="item.id" v-if="item.id !== 2">
        {{ item.text }}
      </div>
    </div>
    <div class="model">
      <input v-model="message" placeholder="edit me" />
      <p>Message is: {{ message }}</p>
    </div>

    <div class="slot">
      slot:
      <v-panel>
        panel:
        <div slot="title">
          slot title:
          <title-slot></title-slot>
        </div>
        <div slot="content">
          slot content:
          <content-slot></content-slot>
        </div>
      </v-panel>
    </div>

    <div class="directive">
      自定义指令，v-focus：
      <input v-focus />
      <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Panel from './slot/Panel.vue';
import TitleSlot from './slot/TitleSlot.vue';
import ContentSlot from './slot/ContentSlot.vue';
export default {
  name: 'Directives',
  data() {
    return {
      message: '😂哈哈哈',
      awesome: true,
      dynamicId: 'bindId',
      isButtonDisabled: false,
      url: `http://learn-blog.qiuww.site`,
      items: [
        {
          id: 1,
          text: '1',
        },
        {
          id: 2,
          text: '2',
        },
        {
          id: 3,
          text: '3',
        },
      ],
    };
  },
  components: {
    VPanel: Panel,
    TitleSlot,
    ContentSlot,
  },
  methods: {
    changeDisabled: function() {
      console.log('changeDisabled:', this);
      this.isButtonDisabled = !this.isButtonDisabled;
    },
    ifShowChange: function() {
      this.awesome = !this.awesome;
    },
  },
  directives: {
    // 使用v-focus

    focus: {
      // 指令的定义
      // 当页面加载时，该元素将获得焦点
      inserted: function(el) {
        el.focus();
      },
    },

    demo: {
      // bind，只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      bind: function(el, binding, vnode) {
        var s = JSON.stringify;
        el.innerHTML =
          'name: ' +
          s(binding.name) +
          '<br>' +
          'value: ' +
          s(binding.value) +
          '<br>' +
          'expression: ' +
          s(binding.expression) +
          '<br>' +
          'argument: ' +
          s(binding.arg) +
          '<br>' +
          'modifiers: ' +
          s(binding.modifiers) +
          '<br>' +
          'vnode keys: ' +
          Object.keys(vnode).join(', ');
      },
    },
  },
};
</script>

<style></style>
