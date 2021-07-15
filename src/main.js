import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'

import VueIntro from './utils/intro.js'
import './styles/intro.css'
Vue.prototype.$intro = VueIntro

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import 'element-ui/lib/theme-chalk/index.css'
import localeEn from '../node_modules/element-ui/lib/locale/lang/en'
import localeJa from '../node_modules/element-ui/lib/locale/lang/ja'
import localeCn from '../node_modules/element-ui/lib/locale/lang/zh-CN'
import localeFr from '../node_modules/element-ui/lib/locale/lang/fr'
import localeVi from '../node_modules/element-ui/lib/locale/lang/vi'

let lang = window.top.myExtension.getlanguage()
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: lang,
  messages: {
    zh_CN: require('@/assets/languages/zh_CN'),
    Jan_JPN: require('@/assets/languages/Jan_JPN'),
    en_US: require('@/assets/languages/en_US'),
    Fr_fr: require('@/assets/languages/Fr_fr'),
    vi: require('@/assets/languages/vi'),
  },
})
Vue.prototype.$lang = lang
let locale = localeCn
if (lang == 'Jan_JPN') {
  locale = localeJa
} else if (lang == 'en_US') {
  locale = localeEn
} else if (lang == 'Fr_fr') {
  locale = localeFr
} else if (lang == 'vi') {
  locale = localeVi
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
