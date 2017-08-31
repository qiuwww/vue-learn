
// 异步操作
// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
// 因此你可以调用 context.commit 提交一个 mutation，
// 或者通过 context.state 和 context.getters 来获取 state 和 getters。
// 当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。

// 全局状态保存-用户名称，用户地址
import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		// 等待函数返回
		let res = await getUser();
		commit(GET_USERINFO, res)
	},
	async saveAddress({
		commit,
		state
	}) {

		if(state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);	
	},
}