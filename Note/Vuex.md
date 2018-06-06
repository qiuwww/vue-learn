# Vuex.md

> 对于vuex的理解

## 是什么

Vuex 类似 Redux 的状态管理器，用来管理Vue的所有组件状态。

## 为什么要用

当你打算开发大型单页应用（SPA），会出现多个视图组件依赖同一个状态，来自不同视图的行为需要变更同一个状态。

## 基本实例

`
import Vue from 'vue';
import Vuex form 'vuex';
Vuex 通过 store 选项，提供了一种机制将状态从根组件『注入』到每一个子组件中（需调用 Vue.use(Vuex)）：
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
`
以上就是一个最简单的Vuex，每一个Vuex应用就是一个store，在store中包含组件中的共享状态state和改变状态的方法（暂且称作方法）mutations。

需要注意的是只能通过mutations改变store的state的状态，不能通过store.state.count = 5;直接更改（其实可以更改，不建议这么做，不通过mutations改变state，状态不会被同步）。
使用store.commit方法触发mutations改变state:
`
store.commit('increment');
console.log(store.state.count)  // 1
`
一个简简单单的Vuex应用就实现了。

## 在Vue组件使用Vuex

如果希望Vuex状态更新，相应的Vue组件也得到更新，最简单的方法就是在Vue的computed（计算属性）获取state


`
import { mapState } from 'vuex';
export default {
    computed: mapState ({
        count: state => state.count,
        countAlias: 'count',    // 别名 `count` 等价于 state => state.count
    })
}

还有更简单的使用方法：

computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

`

mutations也有映射函数mapMutations，帮助我们简化代码，使用mapMutations辅助函数将组件中的methods映射为store.commit调用。



## state

https://vuex.vuejs.org/zh-cn/state.html

Vuex 使用 单一状态树 —— 是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。

## mapState辅助函数，混入到computed中

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键。
mapState 函数返回的是一个对象。使用对象展开得到对应的属性；
在其内部每个传入的属性得到的结果都相当于直接返回这个属性：
`
computed: {
    count () {
        return this.$store.state.count
    },
    number () {
        return this.$store.state.number
    }
}
等价如下：

computed: {
// mapState获取组件对应的state值, 获取对象属性然后展开为computed的值
...mapState([
    'count', 'number'
]),

`

## getters 有时候我们需要从 store 中的 state 中派生出一些状态，如过滤某个属性值

Vuex 允许我们在 store 中定义『getters』（可以认为是 store 的计算属性）。就像计算属性一样，getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

## mutations 一般放在methods中，用于操作之后改变store属性, 混入到methods中
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
`
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
`
你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
`
store.commit('increment')
`

使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然，也就是方法名。

mutation 必须是同步函数
`
...mapMutations([
      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
    ]),


store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。    
`

## modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

## actions 混入到methods，类似于mapMutations


https://vuex.vuejs.org/zh-cn/actions.html

Action 类似于 mutation，不同在于：
Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。

`
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
  // 第一个参数是context
  // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    increment (context) {
      context.commit('increment')
    }
  }
})
`

分发 Action
Action 通过 store.dispatch 方法触发：
store.dispatch('increment')

`
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    })
  }
}
`

最后，如果我们利用 async / await 这个 JavaScript 即将到来的新特性，我们可以像这样组合 action：

// 假设 getData() 和 getOtherData() 返回的是 Promise
`
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
`