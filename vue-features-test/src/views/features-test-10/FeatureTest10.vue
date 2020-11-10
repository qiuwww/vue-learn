<template>
  <div class="function-test-10">
    <FunctionComponent :list="list" :itemClick="item => (currentItem = item)" />
    <RenderContent :slot="slot" />
    <ComponentBindTwoWay v-model="valBindTwoWay"></ComponentBindTwoWay>
    <ChildLifeCycle @hook:mounted="listenMounted" />
    <DestoryCycle />
  </div>
</template>

<script>
// 功能测试
import Vue from 'vue';
// 具体参考：https://juejin.im/post/6844904115949027336
import FunctionComponent from './components/FunctionComponent.vue';
import ComponentBindTwoWay from './components/ComponentBindTwoWay.vue';
import ChildLifeCycle from './components/ChildLifeCycle.vue';
import DestoryCycle from './components/DestoryCycle.vue';
import MountedByYourSelfPlugin from './MountedByYourSelfPlugin';

Vue.use(MountedByYourSelfPlugin);

export default {
  data() {
    return {
      slot: <button type='primary'>退款详情</button>,
      list: [
        {
          title: 'title',
          content: 'content'
        },
        {
          title: 'title2',
          content: 'content2'
        }
      ],
      currentItem: '',
      name: 'qiu',

      msg1: 'apple',
      msg2: 'banana',
      valBindTwoWay: false
    };
  },

  components: {
    // 2. 函数式组件
    // 外部function组件
    FunctionComponent,
    // 6. 组件数据绑定
    ComponentBindTwoWay,
    // 7. 监听组件的生命周期
    ChildLifeCycle,
    // 8. 程序化的事件侦听器
    DestoryCycle,
    // 组件内定义function组件
    RenderContent: {
      functional: true, // 函数式组件，无data和this上下文 => better render
      props: {
        slot: Object
      },
      /**
       * @param {Function} h - 原生创建dom元素的createElement方法，弃用，推荐使用jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(h, ctx) {
        console.log('RenderContent h, ctx');
        if (ctx.data) {
          const { slot = null } = ctx.data || {};
          return slot;
        } else {
          return null;
        }
      }
    }
  },
  // 1. 通过路由props获取传入的参数
  props: ['id', 'type'],

  computed: {
    // 组合属性，便于监听
    msgObj() {
      const { msg1, msg2, valBindTwoWay } = this;
      return {
        msg1,
        msg2,
        valBindTwoWay
      };
    }
  },
  watch: {
    name: [
      'sayName1',
      function(newVal, oldVal) {
        this.sayName2();
      },
      // 该回调将会在侦听开始之后被立即调用
      {
        handler: 'sayName3',
        immediate: true
      }
    ],

    // watch监听多个变量，watch本身无法监听多个变量。但我们可以将需要监听的多个变量通过计算属性返回对象，再监听这个对象来实现“监听多个变量”

    msgObj: {
      handler(newVal, oldVal) {
        if (newVal.msg1 != oldVal.msg1) {
          console.log('msg1 is change');
        }
        if (newVal.msg2 != oldVal.msg2) {
          console.log('msg2 is change');
        }
      },
      deep: true
    }
  },
  created() {
    console.log('this.route prama', this.id, this.type);
    // this.name = this.id + this.type;
    this.msg1 = 'apppple';
  },

  mounted() {
    // 10. 手动挂载组件
    this.$message({
      type: 'success',
      content: '成功信息提示',
      duration: 3000
    });

    
  },

  methods: {
    sayName1() {
      console.log('sayName1==>', this.name);
    },
    sayName2() {
      console.log('sayName2==>', this.name);
    },
    sayName3() {
      console.log('sayName3==>', this.name);
    },

    listenMounted(args) {
      console.log('父组件内监听子组件的挂载事件', args);
    }
  }
};
</script>

<style lang="scss" scoped></style>
