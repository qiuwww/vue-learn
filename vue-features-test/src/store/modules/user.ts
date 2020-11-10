import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
// 一个简单的模块，它存储用户名，并通过一个 mutation 和一个 action 去更新用户名的操作
// 这里可能有坑，具体可以看：https://github.com/championswimmer/vuex-module-decorators/issues/86
// 原文中 name: 'test' 需要去掉
@Module({ namespaced: true })
class User extends VuexModule {
  public myName: string = '';
  @Mutation
  public setName(newName: string): void {
    console.log('setName----', newName);
    this.myName = newName;
  }

  get nameUpperCase() {
    return this.myName.toUpperCase();
  }

  @Action({ rawError: true })
  public updateName(newName: string): void {
    console.log('updateName---', newName);
    this.context.commit('setName', newName);
  }
}
export default User;

// vuex-module-decorators 库为 Module, Mutation 和 Action 提供了装饰器。状态变量是直接声明的，就像类变量一样。这是一个简单的模块，它存储用户名，并通过一个 mutation 和一个 action 去更新用户名的操作。
// 我们不需要将 state 作为 Mutations 和 Actions 中的第一个参数，这个库已经考虑到这一点。它已经被注入到那些方法中。
