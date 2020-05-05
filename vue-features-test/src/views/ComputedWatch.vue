<template>
  <div id="ComputedWatch">
    计算属性：
    <p>Original message: "{{ message }}"</p>
    <button @click="changeMsg">修改message属性</button>
    <p>
      直接计算: "{{
        message
          .split('')
          .reverse()
          .join('')
      }}"
    </p>
    <p>使用计算属性: "{{ reversedMessage }}"</p>
    watch：
    <button v-on:click="changeName">修改name</button>
    <div id="demo">{{ fullName }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: 'Hello World!',

    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar',
  }),
  created: function() {
    this.reversedMessage = 'hahahha';
  },
  methods: {
    changeMsg: function() {
      // 这里表明计算属性与直接表但是完全一样，都会监听message的变化
      this.message = this.message + 'a';
    },
    changeName: function() {
      this.firstName = 'qiu';
    },
  },
  computed: {
    // 这个时候，reversedMessage属性可以当作data内的，可以直接设置
    // 计算属性的 getter
    reversedMessage: {
      get: function() {
        // `this` 指向 vm 实例
        return this.message
          .split('')
          .reverse()
          .join('');
      },
      set: function() {
        console.log('reversedMessage setter:', this.$data);
      },
    },
  },
  watch: {
    firstName: function(val) {
      this.fullName = val + ' ' + this.lastName;
      console.log('firstName 改变了，得到当前的fullName', this.fullName);
    },
    lastName: function(val) {
      this.fullName = this.firstName + ' ' + val;
      console.log('lastName 改变了，得到当前的fullName', this.fullName);
    },
  },
};
</script>
