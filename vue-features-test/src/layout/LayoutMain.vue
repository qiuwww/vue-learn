<template>
  <div class="layout-main">
    <!-- out-in: 当前元素先进行过渡，完成之后新元素过渡进入。 -->
    <!-- 该组件将被缓存！ -->
    <transition name="router-fade" mode="out-in">
      <!-- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染。 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- 如下渲染组建将不会被缓存 -->
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LayoutMain",
  components: {}
};
</script>

<style scoped>
.layout-main {
  border: 1px solid goldenrod;
}
</style>
