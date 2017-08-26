
<!-- 导出模板 -->
<template>
  	<div class="home_container">

        <itemcontainer father-component="home"></itemcontainer>
    </div>
</template>

<script>

// 引用子组件
import itemcontainer from '../../components/itemcontainer'

// 导出一个对象，实例配置
export default {
    // 允许组件模板递归地调用自身。
    // 注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。
    // 指定 name 选项的另一个好处是便于调试。
    // 提供 name 选项，可以获得更有语义信息的组件树。
    name: 'home',
    // 包含 Vue 实例可用组件的哈希表。
    components: {
    	 itemcontainer
    },
    // 实例已经创建完成之后被调用。
    created(){
        
    }
}
</script>

<!-- scoped -->
<style lang="less" scoped>
    .home_container{
      /*局部样式*/
      color: red;
    }
</style>
