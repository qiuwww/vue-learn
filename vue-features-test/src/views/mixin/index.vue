<template>
  <div class="mixin">
    <p>
      混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue
      组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
    </p>
    <p>混入主要分为全局混入和组件混入</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import logMixin from '@/mixins/logMixin';

@Component({
  mixins: [logMixin],
})
export default class Mixin extends Vue {
  haha: string = 'haha';

  log() {
    console.log('$$$$', this.$data);
  }
}
</script>

<style lang="less" scoped></style>
