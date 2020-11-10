<template>
  <div class="vue-instance">
    <h3>Vue实例测试：</h3>
    <div class="vm1" id="vm1"></div>
    <div class="vm1" id="vm2"></div>
    <span>当前操作: {{ operateLog }}</span>
    <br />
    <button @click="changeVm1">changeVm1</button>
    <button @click="changeData1">changeData1</button>
    <button @click="changeVm2">changeVm2</button>
    <button @click="removeVm2">destoryVm2</button>
  </div>
</template>

<script lang="ts">
/**
 * 本例主要测试了
 * 1. 实例的挂载和销毁
 * 2. 不可变对象作为data的问题
 * 3. 计算属性的set
 */
import { Vue, Component } from "vue-property-decorator";

// 我们的数据对象
const data1 = { a: 1 };

// 该对象被加入到一个 Vue 实例中
const vm1 = new Vue({
  data: data1,
  mounted() {
    console.log("%cvm1挂载完成", "color: #0f0;");
  },

  computed: {
    b: {
      // setter
      set: function(newValue: string) {
        console.log("###", newValue);
        this.b = newValue
          .split("")
          .reverse()
          .join("#");
      }
    }
  }
});

// $watch 是一个实例方法
vm1.$watch("a", function(newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
  console.log("实例vm1的属性a被修改了，这里可以进行一些有副作用的操作");
});

// 测试冻结对象的属性
const data2 = {
  foo: "bar"
};

// read only property
Object.freeze(data2);

const vm2 = new Vue({
  data: data2,
  destroyed() {
    console.log("%cvm2被销毁了", "color: #0f0;");
  }
});

// 这里@Component不能少，不然不能找到this
@Component({})
export default class VueInstance extends Vue {
  operateLog = "";

  // 当前页面挂载之后，挂载下边两个实例
  mounted() {
    vm1.$mount("#vm1");
    vm2.$mount("#vm2");
  }

  // 修改vm1上的参数
  changeVm1() {
    // 设置 property 也会影响到原始数据
    vm1.a = 2;
    // setter 会被调用
    vm1.b = "hello world";
    console.log(data1.a, vm1); // => 2
    this.operateLog = "修改vm1上的参数";
  }

  // 修改data1
  changeData1() {
    // 修改data的参数
    // ……反之亦然
    data1.a = 3;
    console.log(vm1.a, vm1); // => 3
    this.operateLog = "修改data1";
  }
  // 修改data2
  changeVm2() {
    // "TypeError: Cannot assign to read only property 'foo' of object '#<Object>'"
    // vm2.foo = 'hahaha';
    this.operateLog = "修改data2";
    data2.foo = "lalala";
    console.log(vm2.foo, vm2);
  }

  removeVm2() {
    vm2.$destroy();
  }
}

console.log("VueInstance:", VueInstance.prototype);
</script>

<style lang="less" scoped></style>
