<template>
  <div>
    <h3>VueTsStandard</h3>
    <p>count: {{ count }}</p>
    <!-- 前面是 on -> emit，后边是函数作为方法调用，但是这种方式很不好 -->
    <project @add-to-count="addCount" :reset-count="resetCount" />
    <vuex-comp />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Project from './components/Project.vue';
import ProjectMixin from './mixins/ProjectMixin';
import VuexComp from './components/VuexComp.vue';

@Component({
  // 1. 指定了类名，会默认使用类名作为 name，当然我们也可以显式地使用 name 属性来命名组件。
  name: 'AliasName',
  components: {
    // 2. 引入组件
    Project,
    VuexComp
  },
  mixins: [ProjectMixin]
})
export default class VueTsStandard extends Vue {
  // 3. data直接声明
  // Type string trivially inferred from a string literal, remove type annotation.
  // private不允许外部访问
  private msg = 'welcome to my app';
  private list: Array<object> = [
    {
      name: 'Preetish',
      age: '26'
    },
    {
      name: 'John',
      age: '30'
    }
  ];
  private count = 0;
  // 允许使用类名直接访问
  public first = 'hahaha';
  public last = 'hahaha';

  // 4. props承接声明
  // 切记这里如果传递的参数可能为undefined，需要添加！说明，表示非空
  @Prop() readonly msgProp!: string;
  @Prop({ default: 'John doe' }) readonly name!: string;
  @Prop({ required: true }) readonly age!: number;
  @Prop(String) readonly address!: string;
  @Prop({ required: false, type: String, default: 'Developer' }) readonly job!: string;

  // 5. 计算属性，计算属性用于编写简单的模板逻辑，例如操作、添加或连接数据。在 TypeScript 中，一个普通的计算属性也以 get 关键字作为前缀。
  get fullName(): string {
    return this.first + ' ' + this.last;
  }
  set fullName(newValue: string) {
    const names = newValue.split(' ');
    this.first = names[0];
    this.last = names[names.length - 1];
  }

  // 6. method
  public clickMe(): void {
    console.log('clicked');
    console.log(this.addNum(4, 2));
  }
  public addNum(num1: number, num2: number): number {
    return num1 + num2;
  }

  // 7. watch
  // 需要监听project的改变，然后调用副作用函数projectChanged
  @Watch('msg', {
    immediate: true,
    deep: true
  })
  // 这里的回调函数名是没什么用的
  projectChanged(newVal: string, oldVal: string) {
    // do something
    // callback
  }

  // 8. 父组件传递子组件的方法
  addCount() {
    this.count += 1;
  }

  resetCount() {
    this.count = 0;
  }

  // 生命周期函数
  mounted() {
    //do something
  }
  beforeUpdate() {
    // do something
  }
}
</script>

<style scoped></style>
