/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
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
    meta: { title: '系统设置', icon: 'cog' },
    children: [
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/system/department'),
        meta: { title: '部门设置' },
      },
    ],
  },
  {
    path: '/personnel',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Personnel',
    alwaysShow: true,
    meta: { title: '人员管理', icon: 'user-friends' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/personnel/index'),
        meta: { title: '人员列表' },
      },
      {
        path: 'visitor',
        name: 'Visitor',
        component: () => import('@/views/personnel/visitor'),
        meta: { title: '访客管理' },
      },
      {
        path: 'issue',
        name: 'Issue',
        component: () => import('@/views/personnel/issue'),
        meta: { title: '下发记录' },
      },
    ],
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Device',
    alwaysShow: true,
    meta: { title: '设备管理', icon: 'video' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/device/index'),
        meta: { title: '设备列表' },
      },
      {
        path: 'online',
        name: 'Online',
        component: () => import('@/views/device/online'),
        meta: { title: '在线视频' },
      },
    ],
  },
  {
    path: '/snapshot',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Snapshot',
    alwaysShow: true,
    meta: { title: '抓拍管理', icon: 'clipboard-list' },
    children: [
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/snapshot/record'),
        meta: { title: '抓拍记录' },
      },
    ],
  },
  {
    path: '/attendanceSet',
    component: Layout,
    redirect: 'noRedirect',
    name: 'AttendanceSet',
    alwaysShow: true,
    meta: { title: '考勤设置', icon: 'cogs' },
    children: [
      {
        path: 'classes',
        name: 'Classes',
        component: () => import('@/views/attendanceSet/classes'),
        meta: { title: '考勤班次' },
      },
      {
        path: 'group',
        name: 'Group',
        component: () => import('@/views/attendanceSet/group'),
        meta: { title: '考勤组' },
      },
    ],
  },
  {
    path: '/attendance',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Attendance',
    alwaysShow: true,
    meta: { title: '考勤管理', icon: 'history' },
    children: [
      {
        path: 'everyday',
        name: 'Everyday',
        component: () => import('@/views/attendance/everyday'),
        meta: { title: '每日考勤' },
      },
      {
        path: 'monthly',
        name: 'monthly',
        component: () => import('@/views/attendance/monthly'),
        meta: { title: '月度考勤' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  routes: constantRoutes,
})

export default router
