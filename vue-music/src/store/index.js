import Vue from 'vue'
import Vuex from 'vuex'
import Sidebar from './modules/sidebar.js'
import AudioInfo from './modules/audio.js'
import MenuList from './modules/menulist.js'
import MusicList from './modules/musiclist.js'
import Reconmmed from './modules/reconmmend.js'

// 分部保存状态
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    allInfo: []
  },

  getters: {
    // 改了返回值
    getAllInfo: state => state.allInfo,
    // 获取推荐歌单信息
    getFindMusic: state => state.musicAllList.findmusic
  },
  mutations: {
    setAllInfo (state, obj) {
      state.allInfo = obj
    }
  },

  actions: {
    set_AllInfo ({ commit }, obj) {
      commit('setAllInfo', obj)
    }
  },
  // 拼接模块
  modules: {
    sideBar: Sidebar,
    audioInfo: AudioInfo,
    menuList: MenuList,
    musiclist: MusicList,
    reconmmed: Reconmmed
  }
})

export default store
