/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import {
  getUserConfigObject,
  getBrandObject,
  execCommand,
} from '../api/sysPage'

Vue.use(VueRouter)
let lang = window.top.myExtension.getlanguage()
let i18
if (lang == 'zh_CN') {
  i18 = require('@/assets/languages/zh_CN')
} else if (lang == 'Jan_JPN') {
  i18 = require('@/assets/languages/Jan_JPN')
} else if (lang == 'en_US') {
  i18 = require('@/assets/languages/en_US')
} else if (lang == 'Fr_fr') {
  i18 = require('@/assets/languages/Fr_fr')
} else if (lang == 'vi') {
  i18 = require('@/assets/languages/vi')
}
export const constantRoutes = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    name: 'Home',
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: i18.router.title_1, // 首页
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/personnel',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Personnel',
    alwaysShow: true,
    meta: { title: i18.router.title_4, icon: 'user-friends' }, //人员管理
    children: [
      {
        path: 'personnelIndex',
        name: 'PersonnelIndex',
        component: () => import('@/views/personnel/index'),
        meta: { title: i18.router.title_5, permissions: ['admin'] }, //人员列表
      },
      {
        path: 'visitor',
        name: 'Visitor',
        component: () => import('@/views/personnel/visitor'),
        meta: { title: i18.router.title_6, permissions: ['admin'] }, //访客管理
      },
      {
        path: 'issue',
        name: 'Issue',
        component: () => import('@/views/personnel/issue'),
        meta: { title: i18.router.title_7, permissions: ['admin'] }, //下发记录
      },
      {
        path: 'dataSync',
        name: 'DataSync',
        component: () => import('@/views/personnel/dataSync'),
        meta: { title: i18.router.title_19, permissions: ['admin'] }, //数据同步
      },
    ],
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Device',
    alwaysShow: true,
    meta: { title: i18.router.title_8, icon: 'video' }, //设备管理
    children: [
      {
        path: 'deviceIndex',
        name: 'DeviceIndex',
        component: () => import('@/views/device/index'),
        meta: { title: i18.router.title_9, permissions: ['admin'] }, //设备列表
      },
      {
        path: 'online',
        name: 'Online',
        component: () => import('@/views/device/online'),
        meta: { title: i18.router.title_10, permissions: ['admin'] }, //在线视频
      },
    ],
  },
  {
    path: '/snapshot',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Snapshot',
    alwaysShow: true,
    meta: { title: i18.router.title_11, icon: 'clipboard-list' }, //抓拍管理
    children: [
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/snapshot/record'),
        meta: { title: i18.router.title_12, permissions: ['admin'] }, //抓拍记录
      },
    ],
  },
  {
    path: '/attendance',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Attendance',
    alwaysShow: true,
    meta: { title: i18.router.title_16, icon: 'history' }, //考勤管理
    children: [
      {
        path: 'everyday',
        name: 'Everyday',
        component: () => import('@/views/attendance/everyday'),
        meta: { title: i18.router.title_17, permissions: ['admin'] }, //每日考勤
      },
      {
        path: 'monthly',
        name: 'Monthly',
        component: () => import('@/views/attendance/monthly'),
        meta: { title: i18.router.title_18, permissions: ['admin'] }, //月度考勤
      },
    ],
  },
  {
    path: '/attendanceSet',
    component: Layout,
    redirect: 'noRedirect',
    name: 'AttendanceSet',
    alwaysShow: true,
    meta: { title: i18.router.title_13, icon: 'cogs' }, //考勤设置
    children: [
      {
        path: 'classes',
        name: 'Classes',
        component: () => import('@/views/attendanceSet/classes'),
        meta: { title: i18.router.title_14, permissions: ['admin'] }, //考勤班次
      },
      {
        path: 'group',
        name: 'Group',
        component: () => import('@/views/attendanceSet/group'),
        meta: { title: i18.router.title_15, permissions: ['admin'] }, //考勤组
      },
    ],
  },
  {
    path: '/accesscontrol',
    component: Layout,
    redirect: 'noRedirect',
    name: 'AccessControl',
    alwaysShow: true,
    meta: { title: i18.router.title_23, icon: 'door-open' }, //门禁规则
    children: [
      {
        path: 'rules',
        name: 'Rules',
        component: () => import('@/views/accesscontrol/index'),
        meta: { title: i18.router.title_rule_edit, permissions: ['admin'] },
      },
      {
        path: 'distribute',
        name: 'Distribute',
        component: () => import('@/views/accesscontrol/distribute'),
        meta: { title: i18.router.title_24, permissions: ['admin'] },
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('@/views/accesscontrol/tasks'),
        meta: {
          title: i18.router.title_rule_deploy_tasks,
          permissions: ['admin'],
        },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    name: 'System',
    alwaysShow: true,
    meta: { title: i18.router.title_2, icon: 'cog' }, //系统设置
    children: [
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/system/department'),
        meta: { title: i18.router.title_3, permissions: ['admin'] }, //部门设置
      },
      {
        path: 'classification',
        name: 'Classification',
        component: () => import('@/views/system/classification'),
        meta: { title: i18.router.title_22, permissions: ['admin'] }, //工作分类
      },
      {
        path: 'parameter',
        name: 'Parameter',
        component: () => import('@/views/system/parameter'),
        meta: { title: i18.router.title_20, permissions: ['admin'] }, //参数设置
      },
      {
        path: 'releasenotes',
        name: 'ReleaseNotes',
        component: () => import('@/views/system/releasenotes'),
        meta: { title: '关于', permissions: ['admin'] }, //参数设置
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
if (lang == 'Jan_JPN') {
  asyncRoutes[1].children.push({
    path: 'line',
    name: 'Line',
    component: () => import('@/views/system/line'),
    meta: { title: 'LINE設定', permissions: ['admin'] }, //LINE设置
  })
  asyncRoutes[1].children.push({
    path: 'pdf',
    name: 'Pdf',
    component: () => import('@/views/system/pdf'),
    meta: { title: 'PDF設定', permissions: ['admin'] }, //PDF设置
  })
  asyncRoutes[1].children.push({
    path: 'lineQR',
    name: 'LineQR',
    component: () => import('@/views/system/lineQR'),
    meta: { title: 'LINE QRコー', permissions: ['admin'] }, //LINE QR编码
  })
  asyncRoutes[1].children.push({
    path: 'edit',
    name: 'Edit',
    component: () => import('@/views/system/edit'),
    meta: { title: 'Edit QRcode For Email', permissions: ['admin'] }, //编辑电子邮件的QRcode
  })
  asyncRoutes[4].children.push({
    path: 'lineRecord',
    name: 'LineRecord',
    component: () => import('@/views/personnel/lineRecord'),
    meta: { title: 'LINE送信記録', permissions: ['admin'] }, //LINE发送记录
  })
} else if (lang == 'zh_CN') {
  // asyncRoutes.splice(7, 0, {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'Documentation',
  //   children: [
  //     {
  //       path: 'documentationIndex',
  //       name: 'DocumentationIndex',
  //       component: () => import('@/views/documentation/index'),
  //       meta: {
  //         title: i18.router.title_21, // 说明文档
  //         icon: 'atlas',
  //         affix: true,
  //       },
  //     },
  //   ],
  // })
}
const router = new VueRouter({
  routes: asyncRoutes,
})

//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    routes: asyncRoutes,
  }).matcher
}

const cfg = getUserConfigObject()
if (
  cfg.HideAttendanceManagementPage &&
  cfg.HideAttendanceManagementPage === true
) {
  let idx = asyncRoutes.findIndex(
    (e) => e.meta && e.meta.title === i18.router.title_16
  )
  if (idx !== -1) {
    asyncRoutes.splice(idx, 1)
  }
}

const brandObj = getBrandObject()
if (brandObj.command) {
  //iterate command array
  for (var i = 0; i < brandObj.command.length; i++) {
    var command = brandObj.command[i]
    if (command.path && command.visible) {
      asyncRoutes.push({
        path: '/external_command/' + command.title,
        meta: {
          title: command.title,
          permissions: ['admin'],
          icon: 'toolbox',
        },
      })
    }
  }
}

//定制菜单
function removeChild(parentName, childName) {
  let idx = asyncRoutes.findIndex((e) => e.name === parentName)
  if (idx !== -1) {
    let childIdx = asyncRoutes[idx].children.findIndex(
      (e) => e.name === childName
    )
    if (childIdx !== -1) {
      asyncRoutes[idx].children.splice(childIdx, 1)
    }
  }
}

function removeRoute(routeName) {
  let idx = asyncRoutes.findIndex((e) => e.name === routeName)
  if (idx !== -1) {
    asyncRoutes.splice(idx, 1)
  }
}

const menus = brandObj.menus
Object.entries(menus).forEach(([key, value]) => {
  if (value.visible === false) {
    removeRoute(key)
  } else {
    if (value.children) {
      Object.entries(value.children).forEach(([subkey, value]) => {
        if (value === false) {
          removeChild(key, subkey)
        }
      })
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/external_command/')) {
    var title = to.path.replace('/external_command/', '')
    var cmd = brandObj.command.find((e) => e.title === title)
    if (cmd && cmd.path) {
      execCommand(cmd.path)
    }
  } else {
    next()
  }
})

if (cfg.HideAttendanceConfigPage && cfg.HideAttendanceConfigPage === true) {
  let idx = asyncRoutes.findIndex(
    (e) => e.meta && e.meta.title === i18.router.title_13
  )
  if (idx !== -1) {
    asyncRoutes.splice(idx, 1)
  }
}

if (lang !== 'zh_CN') {
  removeChild('System', 'ReleaseNotes')
}

export default router
