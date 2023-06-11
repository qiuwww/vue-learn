# Vue的数据双向绑定

## 从数据双向绑定去理解MVVM

1. 这里的data就是Model，M；
2. 这里的视图就是View，V；
3. 这里的watcher就是VM，用来处理以上两部分的关联关系；

## 双向绑定的步骤<vue-learn/blog-vue/data-two-way-binding/双向数据绑定——数据驱动视图.png>

1. 实现一个监听器Observer，**劫持并监听所有属性**（数据变化监听）：
   1. Proxy或者Object.defineProperty；
2. 实现一个解析器compile，**用来订阅数据的变化**（渲染数据到页面，监听模板变化）：
   1. 解析Vue模板指令，**将模板中的变量，替换成数据，然后初始化渲染页面视图**；
      1. 实现数据到页面的路径，需要的时候运行方法，将新的变量渲染到页面；
   2. **并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者**，一旦数据有变动，收到通知，调用更新函数进行数据更新；
      1. 实现指令映射到dom方法，dom节点的变化会触发订阅者；
3. 实现一个订阅者Watcher，（关联数据和模板）：
   1. Watcher订阅者是Observer和Compile之间通信的桥梁；
      1. 主要任务是**订阅Observe中的属性值变化的消息**，
      2. 当收到属性值变化的消息的时候，**触发解析器Compile中对应的更新函数**；
4. 实现一个订阅器Dep（统一管理订阅者Watcher）：
   1. 订阅器采用发布-订阅模式，**用来收集订阅者Watcher**，对监听器Observer和订阅者Watcher进行**统一管理**；

## Proxy和Object.defineProperty区别

1. Proxy监听对象，会首先把对象克隆一份给Proxy，原对象没有变化；
2. Proxy是对整个对象的劫持，defineProperty是对逐个属性进行劫持；

```js
// Proxy和Object.defineProperty区别

// 1. Object.defineProperty只能监听到属性的读写，而Proxy除读写外还可以监听属性的删除，方法的调用等。
// 2. 通常情况下我们想要监视数组的变化，基本要依靠重写数组方法的方式实现，这也是Vue的实现方式，而Proxy可以直接监视数组的变化。
// 3. Proxy是以非入侵的方式监管了对象的读写，而defineProperty需要按特定的方式定义对象的属性。

/**
 * Proxy，纬度是对象
 */

let target = {
    arr: [1, 2, 3],
};

const handler = {
    get: function (obj, prop) {
        console.log('get', obj, prop);
        return prop in obj ? obj[prop] : 37;
    },
    set: function (obj, prop, value) {
        console.log('set', obj, prop, value);
        obj[prop] = value;
    },
};

const p = new Proxy(target, handler);

p.a = 1;
p.b = undefined;
p.arr = p.arr.push(3333);

console.log('target', target);
console.log('p', p);

/**
 * Object.defineProperty，纬度是属性
 */

function Archiver() {
    var temperature = null;
    var archive = [];

    Object.defineProperty(this, 'temperature', {
        get: function () {
            console.log('get!');
            return temperature;
        },
        set: function (value) {
            console.log('set!');
            temperature = value;
            archive.push({ val: temperature });
        },
    });

    this.getArchive = function () {
        return archive;
    };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]

// 总结：

// 1. Proxy使用上比Object.defineProperty方便的多，Object.defineProperty只能遍历对象属性进行劫持，Proxy直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式目的。
// 2. Proxy代理整个对象，Object.defineProperty只代理对象上的某个属性。
// 3. 如果对象内部要全部递归代理，则Proxy可以只在调用时递归，而Object.defineProperty需要在一开始就全部递归，Proxy性能优于Object.defineProperty。
// 4. 对象上定义新属性时，Proxy可以监听到，Object.defineProperty监听不到。
// 5. 数组新增删除修改时，Proxy可以监听到，Object.defineProperty监听不到，Proxy可以直接监听数组的变化（push、shift、splice）。
// 6. Proxy不兼容IE，Object.defineProperty不兼容IE8及以下，Proxy 不兼容IE，也没有 polyfill, defineProperty 能支持到IE9。
```
