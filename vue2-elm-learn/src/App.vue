<template>
	<div>
		<!-- Vue 提供了 transition 的封装组件
		https://cn.vuejs.org/v2/guide/transitions.html? -->
		<!-- out-in: 当前元素先进行过渡，完成之后新元素过渡进入。 -->
		<transition name="router-fade" mode="out-in">
			<!-- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。 -->
			<keep-alive>
				<!-- 该组件将被缓存！ -->
				<!-- $route.meta.keepAlive -->
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>	
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
    	components:{
            svgIcon
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
  	/*添加的是name = "router-fade" 的组件的样式，后便直接添加后缀表示状态*/
	.router-fade-enter-active, 
	.router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, 
	.router-fade-leave-active {
	  	opacity: 0;
	}
</style>
