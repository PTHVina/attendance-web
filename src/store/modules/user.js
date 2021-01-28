/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { title, tokenName } from '@/config'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  permissions: [],
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const data = {
      username: 'admin',
      accessToken: 'test',
      avatar: '',
      permissions: ['admin'],
    }
    const accessToken = data[tokenName]
    let lang = myExtension.getlanguage()
    let a = '早上好'
    let b = '上午好'
    let c = '中午好'
    let d = '下午好'
    let e = '晚上好'
    let tip1 = '欢迎登录人脸门禁系统'
    let tip2 = '登录接口异常，未正确返回'
    if (lang == 'en_US') {
      a = 'good morning'
      b = 'Good morning'
      c = 'Good noon'
      d = 'Good afternoon'
      e = 'Good evening'
      tip1 = 'Welcome to login Face Recognition System'
      tip2 = 'Login interface exception, not returned correctly'
    } else if (lang == 'Jan_JPN') {
      a = 'おはよう'
      b = 'おはようございます'
      c = 'こんにちは'
      d = 'こんにちは'
      e = 'こんばんは'
      tip1 = '知恵人の顔の勤務評定の門限システムに登録することを歓迎します。'
      tip2 = 'ログインインターフェースが異常で、正しく戻りませんでした。'
    }
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8 ? a : hour <= 11 ? b : hour <= 13 ? c : hour < 18 ? d : e
      Vue.prototype.$baseNotify(tip1, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(tip2 + `${tokenName}...`, 'error')
    }
  },
  async getUserInfo({ commit, state }) {
    const data = {
      username: 'admin',
      accessToken: 'test',
      avatar: '',
      permissions: ['admin'],
    }
    if (!data) {
      Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      return false
    }
    let { permissions, username, avatar } = data
    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await dispatch('resetAccessToken')
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
