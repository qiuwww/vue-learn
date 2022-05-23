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
