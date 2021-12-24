<template>
    <div>
        <p>index</p>
        <button @click="toHome">toHome</button>

        <ComponentTest :name="name" />
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import ComponentTest from '../components/ComponentTest.vue';

export default {
    components: {
        ComponentTest,
    },
    data() {
        return { name: 1 };
    },

    // setup 执行时机是在 beforeCreate 之前执行
    setup(props, context) {
        console.log('----setup----');
        // 引入的useRoute,useRouter 相当于vue2的 this.$route()，this.$router()
        const route = useRoute();
        const router = useRouter();
        const toHome = () => {
            router.push({
                name: 'home',
            });
        };
        return {
            toHome,
        };
    },

    beforeCreate() {
        console.log('----beforeCreate----');
    },
    created() {
        console.log('----created----');
        setInterval(() => {
            this.name = this.name + 1;
        }, 2000);
    },
};
</script>

<style lang="scss" scoped></style>
