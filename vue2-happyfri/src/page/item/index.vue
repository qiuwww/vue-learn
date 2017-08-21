

<template>
  	<div>
    	<itemcontainer father-component="item"></itemcontainer>
  	</div>
</template>

<script>

import itemcontainer from '../../components/itemcontainer'

export default {
	name: 'item',
  	components: {
   		itemcontainer
  	},
  	created(){
      // 实例创建完成后，执行的语句
      // 进入题目页面，开始计时
  		// console.log('page-item-index.vue的this: ', this);
      // 保存状态
      this.$store.commit('REMBER_TIME');
  	}
}

</script>

<style lang="less">
    

</style>
