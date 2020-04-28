---
title: Vue
date: 2017-6-6
tags:
  - Vue
  - 前端框架
  - Vue的双向数据绑定
categories:
  - [Vue, Vue的双向数据绑定]
---

## 数据双向绑定

### vue 双向数据绑定原理，依赖收集是在什么时候收集的

是在 created 生命周期之前，render 生成虚拟 dom 的时候。
