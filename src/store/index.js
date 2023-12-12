import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import setting from './modules/setting'
import tagsView from './modules/tagsView'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters,
  modules: {
    user,
    permission,
    setting,
    tagsView,
    task
  }
})
