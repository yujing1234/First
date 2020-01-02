import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    username:''
  },
  mutations: {
    setIsLogin(state,cs){
      state.isLogin = cs;
    },
    setuname(state,cs){
      state.username = cs;
    }
  },
  actions: {
    setIsLoginAction({commit},cs){
      commit('setIsLogin',cs)
    },
    setunameAction({commit},cs){
      commit('setuname',cs)
    }
  },
  modules: {
  }
})


