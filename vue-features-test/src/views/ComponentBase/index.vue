<template>
  <div class="component-base">
    <h3>组件基础：</h3>
    <h4>button-counter：</h4>
    <button-counter></button-counter>
    <h4>component-hello：</h4>
    <component-hello></component-hello>

    <com-three></com-three>
    <com-four></com-four>

    <h4>在组件上使用 v-model:</h4>
    <div>
      默认的v-model：
      <input v-model="defaultInput" placeholder="defaultInput" />
      {{ defaultInput }}
    </div>
    <div>
      解构操作：
      <input
        v-bind:value="searchText"
        v-on:input="searchText = $event.target.value"
        placeholder="解构v-model操作"
      />
      {{ searchText }}
    </div>
    <div>
      空间被封装在组件内了：
      <!-- 这里添加lazy，是延迟了修改value的时间 -->
      <!-- 这里隐形的有input事件，可以被触发emit -->
      <custom-input
        v-model="customInput"
        placeholder="v-model封装在组件内"
      ></custom-input>
    </div>
    <h4>动态组件：</h4>
    <button @click="switchComponent">切换组件</button>
    <component v-bind:is="currentTabComponent"></component>

    <!-- template内嵌入模板，其实就是一个vue文件内写了多个组件，这样子肯定不好，但是，对于需要渲染较短的组件，又是可以的 -->
    <script type="text/x-template" id="my-component">
      <div>这是组件的内容</div>
    </script>
    <h1>v-model:checkbox：</h1>
    <base-checkbox v-model="lovingVue"></base-checkbox>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  ButtonCounter,
  ComponentHello,
  customInput,
  BaseCheckbox,
} from './components';
import ComFourTemplate from './ComFourTemplate.vue';

console.log('ComFourTemplate: ', ComFourTemplate);

@Component({
  components: {
    ButtonCounter,
    ComponentHello,
    BaseCheckbox,
    // 局部注册的组件1，组件的内容就一个template，没有别的参数
    'com-three': {
      template: `<h2>this is com-three</h2>`,
    },
    // 注册局部组件2，组件的模板指向id为comFour的元素
    'com-four': ComFourTemplate,
    customInput,
    'x-template': {
      template: 'my-component',
    },
  },
})
export default class ComponentBase extends Vue {
  // 局部注册的组件
  defaultInput = '';

  searchText = '';

  customInput = '';

  lovingVue = false;

  // 当前组件的组件名
  currentTabComponent: any = ButtonCounter;

  switchComponent() {
    // 切换的是组件的引用
    this.currentTabComponent = ComponentHello;
  }
}

console.log(
  'components: ',
  ButtonCounter.prototype,
  ComponentHello.prototype,
  ComponentBase.prototype
);
</script>

<style lang="less" scoped></style>
