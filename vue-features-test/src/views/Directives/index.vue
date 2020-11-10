<template>
  <div id="directive">
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
      <div id="hook-arguments-example" v-directiveDemo:foo.a.b="message"></div>
    </div>

    <div class="ell">
      <p v-ell>
        这里超过一行省略：“中国梦”的核心目标也可以概括为“两个一百年”的目标，也就是：到2021年中国共产党成立100周年和2049年中华人民共和国成立100周年时，逐步并最终顺利实现中华民族的伟大复兴，具体表现是国家富强、民族振兴、人民幸福，实现途径是走中国特色的社会主义道路、坚持中国特色社会主义理论体系、弘扬民族精神、凝聚中国力量，实施手段是政治、经济、文化、社会、生态文明五位一体建设。
      </p>
      <p v-ell="5">
        这里超过两行省略：“中国梦”的核心目标也可以概括为“两个一百年”的目标，也就是：到2021年中国共产党成立100周年和2049年中华人民共和国成立100周年时，逐步并最终顺利实现中华民族的伟大复兴，具体表现是国家富强、民族振兴、人民幸福，实现途径是走中国特色的社会主义道路、坚持中国特色社会主义理论体系、弘扬民族精神、凝聚中国力量，实施手段是政治、经济、文化、社会、生态文明五位一体建设。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Panel from '@/components/Panel.vue';
import TitleSlot from '@/components/TitleSlot.vue';
import ContentSlot from '@/components/ContentSlot.vue';
import { directiveDemo, ell } from '@/directives';

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
    // 使用v-focus，这个是全局的
    // 局部的指令
    directiveDemo,
    ell,
  },
};
</script>

<style></style>
