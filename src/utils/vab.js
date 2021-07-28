import { loadingText, messageDuration, title } from '@/config'
import * as lodash from 'lodash'
import { Loading, Message, MessageBox, Notification } from 'element-ui'
import store from '@/store'
import { getAccessToken } from '@/utils/accessToken'

const layout = store.getters['settings/layout']

const install = (Vue, opts = {}) => {
  /* 全局标题 */
  Vue.prototype.$baseTitle = (() => {
    return title
  })()
  /* 全局加载层 */
  Vue.prototype.$baseLoading = (index, text) => {
    let loading
    if (!index) {
      loading = Loading.service({
        lock: true,
        text: text || loadingText,
        background: 'hsla(0,0%,100%,.8)',
      })
    } else {
      loading = Loading.service({
        lock: true,
        text: text || loadingText,
        spinner: 'vab-loading-type' + index,
        background: 'hsla(0,0%,100%,.8)',
      })
    }
    return loading
  }
  /* 全局多彩加载层 */
  Vue.prototype.$baseColorfullLoading = (index, text) => {
    let loading
    if (!index) {
      loading = Loading.service({
        lock: true,
        text: text || loadingText,
        spinner: 'dots-loader',
        background: 'hsla(0,0%,100%,.8)',
      })
    } else {
      switch (index) {
        case 1:
          index = 'dots'
          break
        case 2:
          index = 'gauge'
          break
        case 3:
          index = 'inner-circles'
          break
        case 4:
          index = 'plus'
          break
      }
      loading = Loading.service({
        lock: true,
        text: text || loadingText,
        spinner: index + '-loader',
        background: 'hsla(0,0%,100%,.8)',
      })
    }
    return loading
  }
  /* 全局Message */
  Vue.prototype.$baseMessage = (message, type, time) => {
    Message({
      offset: 60,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: time ? time * 1000 : messageDuration,
    })
  }

  /* 全局Alert */
  Vue.prototype.$baseAlert = (content, title, callback) => {
    let t = {
      zh_CN: '温馨提示',
      en_US: 'Reminder',
      Fr_fr: 'Rappel',
      vi: 'nhắc',
      Jan_JPN: 'ヒント',
    }
    let okText = {
      zh_CN: '确定',
      en_US: 'OK',
      Fr_fr: "C'est sûr.",
      vi: 'xác định',
      Jan_JPN: 'を選択します',
    }
    let lang = window.top.myExtension.getlanguage()
    MessageBox.alert(content, title || t[lang], {
      confirmButtonText: okText[lang],
      dangerouslyUseHTMLString: true,
      callback: (action) => {
        if (callback) {
          callback()
        }
      },
    })
  }

  /* 全局Confirm */
  Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
    let lang = window.top.myExtension.getlanguage()
    let t = {
      zh_CN: '温馨提示',
      en_US: 'Reminder',
      Fr_fr: 'Rappel',
      vi: 'nhắc',
      Jan_JPN: 'ヒント',
    }
    let okText = {
      zh_CN: '确定',
      en_US: 'OK',
      Fr_fr: "C'est sûr.",
      vi: 'xác định',
      Jan_JPN: 'を選択します',
    }
    let CancelText = {
      zh_CN: '取消',
      en_US: 'Cancel',
      Fr_fr: 'Annulation',
      vi: 'hủy',
      Jan_JPN: 'キャンセル',
    }
    MessageBox.confirm(content, title || t[lang], {
      confirmButtonText: okText[lang],
      cancelButtonText: CancelText[lang],
      closeOnClickModal: false,
      type: 'warning',
    })
      .then(() => {
        if (callback1) {
          callback1()
        }
      })
      .catch(() => {
        if (callback2) {
          callback2()
        }
      })
  }

  /* 全局Notification */
  Vue.prototype.$baseNotify = (message, title, type, position) => {
    Notification({
      title: title,
      message: message,
      position: position || 'top-right',
      type: type || 'success',
      duration: messageDuration,
    })
  }

  /* 全局TableHeight */
  Vue.prototype.$baseTableHeight = (formType) => {
    let height = window.innerHeight
    let paddingHeight = 400
    const formHeight = 50

    if (layout === 'vertical') {
      paddingHeight = 365
    }

    if ('number' == typeof formType) {
      height = height - paddingHeight - formHeight * formType
    } else {
      height = height - paddingHeight
    }
    return height
  }

  /* 全局map图层 */
  Vue.prototype.$baseMap = () => {
    return new maptalks.Map('map', {
      center: [116.41348403785, 39.910843952376],
      zoom: 12,
      minZoom: 1,
      maxZoom: 19,
      spatialReference: {
        projection: 'baidu',
      },
      attribution: {
        content: '&copy; vue-admin-beautiful',
      },
      baseLayer: new maptalks.TileLayer('base', {
        cssFilter: 'sepia(100%) invert(90%)',
        urlTemplate:
          'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        attribution:
          '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>',
      }),
    })
  }

  /* 全局lodash */
  Vue.prototype.$baseLodash = lodash
  /* 全局事件总线 */
  Vue.prototype.$baseEventBus = new Vue()
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
