import { apiLogin, apiLogout } from '@/api/user'

export default {
  namespaced: true,
  state: {
    userInfo: {
      userId: '',
      name: '',
      avatar: '',
      date: '',
      type: ''
    }
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo.userId = data.userId
      state.userInfo.name = data.name
      state.userInfo.avatar = data.avatar
      state.userInfo.date = data.date
      state.userInfo.type = data.type
    }
  },
  actions: {
    login({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        apiLogin(data)
          .then(async (res) => {
            commit('SET_USER_INFO', res.body)
            await dispatch('permission/handleRoutes', null, { root: true })
            resolve('success')
          })
          .catch(() => {
            reject()
          })
      })
    },
    logout({ commit, dispatch }) {
      return new Promise((resolve) => {
        apiLogout().then(async () => {
          commit('SET_USER_INFO', {
            name: '',
            avatar: ''
          })
          await dispatch('permission/resetRoute', null, { root: true })
          commit('tagsView/CLEAR_CACHE_VIEW', null, {
            root: true
          })
          commit('tagsView/CLEAR_VISITED_VIEW', null, {
            root: true
          })
          commit('tagsView/CLEAR_FIXED_VISITED_VIEW', null, {
            root: true
          })
          resolve('success')
        })
      })
    }
  },
  modules: {}
}
