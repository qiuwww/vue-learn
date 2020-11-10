// 定义一个混入对象，也就是一个组件
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class logMixin extends Vue {
  from: string = 'logMixin';

  created() {
    this.log();
    this.hello();
  }

  log() {
    console.log('####', this);
  }

  hello() {
    console.log('####', 'hello');
  }
}
