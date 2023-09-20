# Vue源码分析

## Vue的响应收集阶段？

1. **在初始化 data 和 props option 时我们注意 initProps 和 initData 方法中都调用了 observe 方法。通过 observe (value)，就可以将数据变成响应式**。
   1. 观察者模式，观察数据变化，响应页面改变；
2. 当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去更新(派发更新)。
3. **通常一个绑定一个数据就需要一个 Watcher**。

## 响应式原理

1. vue2的数据代理劫持：**在vue中，响应式的原理就是对数据进行了劫持**，当对数据进行取值操作的时候，就会对这个数据进行依赖收集，**当这个数据发生改变的时候，就会触发视图更新，刷新页面**。
2. vue2的依赖收集：依赖收集的核心是两个类，Dep和Watcher,Dep，**Dep的作用是记录Watcher**,**Watcher中也记录着Dep**，两者是双向记忆的，**Watcher的作用是记录更新视图的函数**。
   1. Dep的作用就是利用闭包，记录属性和对象收集到的Watcher。
   2. Watcher有三种，**computed中用到的Watcher，刷新页面的Watcher**，watchr api的Watcher。

## [双向绑定](https://juejin.cn/post/7080562890628923423#heading-30)

1. 单向数据流，如React。**用户在页面作出更新，需要用户手动收集(双向绑定是自动收集)**，在合并到原有的数据中；
2. Vue.js中的v-model主要用在表单的input输入框，完成视图和数据的双向绑定；
3. 响应式的思路：mvvm Model，View，View-Model；
4. **Vue 数据双向绑定原理是通过 数据劫持 + 发布者-订阅者模式 的方式来实现的，首先是通过 ES5 提供的 Object.defineProperty() 方法来劫持（监听）各属性的 getter、setter，并在当监听的属性发生变动时通知订阅者，是否需要更新，若更新就会执行对应的更新函数**。
5. 四个重要对象：
   1. 模板编译(Compile)
      1. 用来解析模板页面的对象的构造函数；
      2. **每解析一个表达式(非事件指令)都会创建一个对应的watcher对象**, **并建立watcher 与 dep 的关系**；
      3. compile 与 watcher 关系: 一对多的关系；
      4. 这块其实就是类似于以前使用的渲染模板，比如ejs这些的render函数；
         1. 拿到数据渲染出来页面这个简单的动作；
   2. 数据劫持(Observer)，接触数据，**通过set的回调进行发布**；
      1. **用来对 data 所有属性数据进行劫持的构造函数**；
         1. 给 data 中所有属性重新定义属性描述(get/set)；
      2. **为 data 中的每个属性创建对应的 dep 对象**；
         1. 这里的一个data对应一个dep对象，dep对象记录需要调用的render方法（影响到不同的区域）；
   3. 发布的订阅(Dep = Depend)（subscribes，订阅数据的变化这个过程，订阅的最终结果就是在subs下存放对应的watcher函数）
      1. **存放watcher的数组**，即subscribes——subs；
      2. data 中的每个属性(所有层次)都对应一个 dep 对象；
      3. 创建的时机：
         1. 在初始化 define data 中各个属性时创建对应的 dep 对象；
         2. **在 data 中的某个属性值被设置为新的对象时**；
      4. subs 属性说明：
         1. 当 watcher 被创建时, 内部将当前 watcher对象添加到对应的 dep对象的 subs中；
         2. 当此 data 属性的值发生改变时,subs 中所有的 watcher 都会收到更新的通知,从而最终更新对应的界面；
   4. 观察者(Watcher)，更新显示内容的，应该就是模板编译得到的产物：
      1. 三类：一般的watch、computed（如果不被模板引用，不需要双向绑定）、v-model指令之类的解析；
         1. 模板中**每个非事件指令或表达式都对应一个 watcher 对象**；
         2. 监视当前表达式数据的变化；
         3. 创建的时机: 在初始化编译模板时；
         4. 对象的组成：
            1. vm, //vm 对象；
            2. exp, //对应指令的表达式；
            3. depIds //表达式中各级属性所对应的 dep 对象的集合对象 //属性名为 dep 的 > id, 属性值为 dep；
      2. dep 与 watcher 的关系：
         1. 多对多；
6. MVVM：
   1. 要实现mvvm的双向绑定，就必须要实现以下几点：
      1. **实现一个数据监听器Observer**，能够对数据对象的**所有属性进行监听**，如有变动可拿到最新值并通知订阅者（这里的订阅者就是dep）；
         1. 数据劫持+发布；
         2. 每个数据data属性，对应一个dep对象（订阅者），里边记录多个watcher；
      2. **实现一个指令解析器Compile**，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及**绑定相应的更新函数**；
         1. 这里会得到一些watcher；
         2. 这里解析模板和watch/compute方法，得到一些watcher，会被存到dep中；
         3. 这里会生成用于更新页面的render函数，需要的时候调用，来更新页面；
      3. **实现一个Watcher，作为连接Observer和Compile的桥梁**，**能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图**；
         1. watcher就是订阅者，订阅
         2. dep是记录Observer和Compile（）的关系的，data => compile解析得到的多个watcher；
   2. 所以总的路线：
      1. 数据到页面：data => observer => dep => watcher => updater => template更新;
      2. 页面到数据：watcher => 事件 => model
   3. 双向数据绑定：双向数据绑定=单向数据绑定+input 监听
      1. 在解析 v-model 指令时, 给当前元素添加 input 监听 （从View==>model）；
      2. 当 input 的 value 发生改变时, 将最新的值赋值给当前表达式所对应的 data 属性；
      3. 如果需要双向数据绑定，需要事件监听。即，是如何解析v-model="msg"这一指令的;
         1. 这里的v-model是一个复合的执行 = v-bind：value + @input事件；
