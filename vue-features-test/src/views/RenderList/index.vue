<template>
  <div class="render-list">
    <h3>列表渲染：</h3>
    <ul>
      <!-- 结构item，使用index参数 -->
      <!-- template在循环内层会造成空li -->
      <!-- 所以循环外层使用template，这个时候，key要加载实际的元素上 -->
      <template v-for="({ name: { firstName, lastName }, age }, index) in list">
        <!-- 如果在for中添加if判断，需要使用渲染为空的template标签来判断 -->
        <li v-if="age < 110" :key="index">
          name: {{ (firstName, lastName) }}; age: {{ age }};
        </li>
      </template>
    </ul>
    <ul id="v-for-object" class="demo">
      <li v-for="(value, name, index) in obj" :key="value">
        {{ index }} - {{ value }} - {{ name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/**
 * 列表渲染
 * 1. list的解构渲染；
 * 2. 对象渲染；
 * 3. 接口不定参数声明；
 */
import { Vue } from "vue-property-decorator";

interface Name {
  firstName: string;
  lastName: string;
}
interface ListItem {
  id: number;
  age: number;
  name: Name;
}

interface Obj {
  title: string;
  author: string;
  publishedAt: string;
}

// nice
interface Obj2 {
  [propName: string]: string;
}

export default class RenderList extends Vue {
  list: ListItem[] = [
    {
      id: 1,
      age: 12,
      name: {
        firstName: "li",
        lastName: "ming"
      }
    },
    {
      id: 2,
      age: 15,
      name: {
        firstName: "wang",
        lastName: "peng"
      }
    },
    {
      id: 3,
      age: 120,
      name: {
        firstName: "zhang",
        lastName: "ke"
      }
    }
  ];

  obj: Obj2 = {
    title: "How to do lists in Vue",
    author: "Jane Doe",
    publishedAt: "2016-04-10"
  };
}
</script>

<style lang="less" scoped></style>
