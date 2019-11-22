### vue 双向数据绑定原理，依赖收集是在什么时候收集的

是在 created 生命周期之前，render 生成虚拟 dom 的时候。