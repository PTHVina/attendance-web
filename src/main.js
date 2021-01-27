import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import VueI18n from 'vue-i18n'

let lang = myExtension.getlanguage()
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: lang,
  messages: {
    zh_CN: require('@/assets/languages/zh_CN'),
    Jan_JPN: require('@/assets/languages/Jan_JPN'),
    en_US: require('@/assets/languages/en_US'),
  },
})
Vue.prototype.$lang = lang

Vue.config.productionTip = false

new Vue({
  el: '#vue-admin-beautiful',
  i18n,
  router,
  store,
  render: (h) => h(App),
})
