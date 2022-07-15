import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明token
    // user: JSON.parse(localStorage.getItem('TOUTIAO_TOKEN')) || {}
    user: getToken() || {}
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      // localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(payload))
      // storeage.set('TOUTIAO_TOKEN', payload)s
      setToken(payload)
    }
  }
})
