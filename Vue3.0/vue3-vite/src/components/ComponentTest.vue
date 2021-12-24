<template>
    <div>
        <h2>ComponentTest</h2>

        <div>name: {{ name }}</div>
    </div>
</template>

<script>
import { toRefs, h, reactive, ref } from 'vue';

export default {
    props: ['name'],

    setup(props, context) {
        const { name: name1 } = props;
        const { name: name2 } = toRefs(props);

        // 这里可以明显的看出来直接使用props的问题
        setInterval(() => {
            console.log('props name', name1);
            console.log('toRefs', name2.value);
        }, 2000);

        console.log('Attribute (非响应式对象，等同于 $attrs):', context.attrs);

        console.log('插槽 (非响应式对象，等同于 $slots)', context.slots);

        console.log('触发事件 (方法，等同于 $emit)', context.emit);

        console.log('暴露公共 property (函数)', context.expose);

        const readersNumber = ref(0);
        const book = reactive({ title: 'Vue 3 Guide' });
        // 请注意这里我们需要显式使用 ref 的 value
        return () => h('div', [readersNumber.value, book.title]);
    },
};
</script>

<style lang="scss" scoped></style>
