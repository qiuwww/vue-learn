import { DirectiveOptions } from 'vue';

// name: options
// v-directiveDemo:foo.a.b="message"
export const directiveDemo: DirectiveOptions = {
  bind: function(el, binding, vnode) {
    var s = JSON.stringify;
    el.innerHTML =
      'name: ' +
      s(binding.name) +
      '<br>' +
      'value: ' +
      s(binding.value) +
      '<br>' +
      'expression: ' +
      s(binding.expression) +
      '<br>' +
      'argument: ' +
      s(binding.arg) +
      '<br>' +
      'modifiers: ' +
      s(binding.modifiers) +
      '<br>' +
      'vnode keys: ' +
      Object.keys(vnode).join(', ');
  },
};

// 文本省略
// v-ell="2"
// v-ell，默认为1

export const ell: DirectiveOptions = {
  // 这里可以明显的看到el真实节点与虚拟节点vnode的区别，属性多少的差异
  bind: function(el, binding, vnode) {
    const baseStyle = {
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': binding.value || 1,
      overflow: 'hidden',
    };
    for (let attr in baseStyle) {
      el.style[attr] = baseStyle[attr];
    }
  },
};
