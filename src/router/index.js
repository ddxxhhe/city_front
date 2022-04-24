import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: '/home',
    meta: {
      roles: ['255']
    },
    children: [
      {
        path: 'home',
        name: '主页',
        meta: {
          roles: ['255']
        },
        component: () => import('../views/Home')
      },
      {
        path: 'admin',
        name: '赛区管理员',
        meta: {
          roles: ['255']
        },
        component: () => import('../views/data/Admin')
      },
      { path: 'zjk', name: '专家库', meta: { roles: ['255'] }, component: () => import('../views/data/Zjk') },
      { path: 'contacts', name: '研究生培养单位联系人', meta: { roles: ['255'] }, component: () => import('../views/data/Contacts') },
      { path: 'psgl', name: '评审管理', meta: { roles: ['255'] }, component: () => import('../views/precontest/Psgl') },
      { path: 'pyzbgl', name: '评阅指标管理', meta: { roles: ['255'] }, component: () => import('../views/precontest/Pyzbgl') },
      { path: 'pyjdgl', name: '评阅进度管理', meta: { roles: ['255'] }, component: () => import('../views/precontest/Pyjdgl') },
      { path: 'pyjggl', name: '评阅结果管理', meta: { roles: ['255'] }, component: () => import('../views/precontest/Pyjggl') },
      { path: 'bmtdgl', name: '报名团队管理', meta: { roles: ['255'] }, component: () => import('../views/team/Bmtdgl') },
      { path: 'xtxxsh', name: '选题信息审核', meta: { roles: ['255'] }, component: () => import('../views/team/Xtxxsh') },
      { path: 'zpgl', name: '作品管理', meta: { roles: ['255'] }, component: () => import('../views/team/Zpgl') },
      { path: 'grmmxg', name: '个人密码修改', meta: { roles: ['255'] }, component: () => import('../views/user/Grmmxg') },
      { path: 'xggrxx', name: '修改个人信息', meta: { roles: ['255'] }, component: () => import('../views/user/Xggrxx') },
      { path: 'csdwjxsz', name: '参赛单位奖项设置', meta: { roles: ['255'] }, component: () => import('../views/award/Csdwjxsz') },
      { path: 'grjxsz', name: '个人奖项设置', meta: { roles: ['255'] }, component: () => import('../views/award/Grjxsz') },
      { path: 'tdjxsz', name: '团队奖项设置', meta: { roles: ['255'] }, component: () => import('../views/award/Tdjxsz') },
      { path: 'front_page', name: '首页管理', meta: { roles: ['255'] }, component: () => import('../views/frontpage/Frontpage') },
      { path: 'new_contest', name: '发起赛事', meta: { roles: ['255'] }, component: () => import('../views/contest/NewContest') },
      { path: 'contest_manage', name: '赛事管理', meta: { roles: ['255'] }, component: () => import('../views/contest/ContestManage') }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      roles: ['0', '1', '2', '255']
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/reg',
    name: 'ManageStu',
    component: () => import('../views/ManageStu'),
    meta: {
      roles: ['0'] //学生
    },
    // redirect: '/reg/ques',
    children: [
      { path: 'ques', name: '我的赛事', meta: { roles: ['0'] }, component: () => import('../views/stu/Ques') },
      // { path: 'test', name: '我的赛事', meta: { roles: ['0'] }, component: () => import('../views/stu/test') },
      { path: 'awards', name: '我的奖项', meta: { roles: ['0'] }, component: () => import('../views/stu/Awards') },
      { path: 'password', name: '个人密码修改', meta: { roles: ['0'] }, component: () => import('../views/stu/Password') },
      { path: 'info', name: '修改个人信息', meta: { roles: ['0'] }, component: () => import('../views/stu/Info') }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      roles: ['0', '1', '2', '255']
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/null',
    name: 'Not Found',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      roles: ['0', '1', '2', '255']
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Notfound.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  localStorage.setItem('currentPathName', to.name)// 设置当前的路由名称
  store.commit('setPath')
  if (to.path === '/login' || to.path === '/about' || to.path === '/null') {
    next()
  } else {
    // 不是去登录页面:判断登录 判断token是否存在即可
    const token = localStorage.getItem('Authorization')
    if (token) {
      console.log("test")
      console.log(to)
      console.log(to.meta)
      console.log(to.meta.roles)
      console.log(window.localStorage.getItem('role'))
      console.log(to.meta !== null && to.meta.roles !== null && to.meta.roles.includes(window.localStorage.getItem('role')) === true)
      if (to.meta !== null && to.meta.roles !== null && to.meta.roles.includes(window.localStorage.getItem('role')) === true) {
        console.log('access')
        next()
      } else {
        console.log('deny')
        next('/null')
      }
    } else {
      Vue.prototype.$message.error('请先登录')
      next('/login')
    }
  }
})

export default router
