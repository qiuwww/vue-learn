<template>
  <div class="vuex-text">
    count:
    <p>
      {{ count1 }} - {{ count2 }} - {{ count3 }} -
      {{ countPlusLocalState }}
    </p>
    <button @click="increment">修改vuex的count</button>
    <br />

    todos:
    <ul v-for="item in doneCounts" :key="item.id">
      <li>{{ item.text }}</li>
    </ul>

    getQuotes:
    <button @click="getQuotes">刷新下边的内容</button>
    <ul v-for="(val, key) in quote" :key="key">
      <li>🥬{{ key }}: {{ val }}</li>
    </ul>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      localCount: 10
    };
  },
  created() {
    console.log("created", this);
    this.getQuotes();
  },
  computed: {
    // 方便使用state
    ...mapState({
      // 箭头函数可使代码更简练
      count2: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      count3: "count",
      quote: "quote",
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState(state) {
        return state.count + this.localCount;
      }
    }),
    ...mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCounts: "doneTodosCount"
      // ...
    }),
    // 通过$store直接返回
    count1() {
      return this.$store.state.count;
    }
  },
  methods: {
    // 定义事件，调用Vuex
    increment: function() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    },
    ...mapMutations({
      add: "increment" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    ...mapActions({
      getQuotes: "getQuotes"
    })
  }
};
</script>

<style lang="less"></style>
