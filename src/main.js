import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import VueI18n from 'vue-i18n'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import localeEn from '../node_modules/element-ui/lib/locale/lang/en'
import localeJa from '../node_modules/element-ui/lib/locale/lang/ja'
import localeCn from '../node_modules/element-ui/lib/locale/lang/zh-CN'

// import IntroJs from 'intro.js'
// import 'intro.js/introjs.css'
// Vue.use(IntroJs)
import VueIntro from 'vue-introjs'
import 'intro.js/introjs.css'
Vue.use(VueIntro)

let lang = window.top.myExtension.getlanguage()
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
let locale = localeCn
if (lang == 'Jan_JPN') {
  locale = localeJa
} else if (lang == 'en_US') {
  locale = localeEn
}

Vue.use(ElementUI, { locale, size: 'small' })

Vue.config.productionTip = false

new Vue({
  el: '#vue-admin-beautiful',
  i18n,
  router,
  store,
  render: (h) => h(App),
})
