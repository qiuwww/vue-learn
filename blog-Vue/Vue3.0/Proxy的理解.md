# Proxy 的理解

## [介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

1. Proxy 对象用于创建一个**对象的代理**，**从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）**。
2. **其实就是将一些方法代理到一个对象上边**，相当于修改上下文了；
3. handler 需要设置 set、get 方法；

```js
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};
const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37

// demo2
let target = {};
// 将target的操作，都代理到p上边，所以p修改了，target也就修改了
let p = new Proxy(target, {});

p.a = 37; // 操作转发到目标

console.log(target.a); // 37. 操作已经被正确地转发
```

## Proxy 的 polyfill

[chrome 的源码](https://github.com/GoogleChrome/proxy-polyfill/blob/master/src/proxy.js)。

1. apply 用来修改上下文环境；
2. defineProperty 用于对属性的观察；
3. 对 Proxy 支持的拦截操作 apply 与 construct 进行兼容处理。
