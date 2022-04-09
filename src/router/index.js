import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: '/about',
    children: [
      { path: 'home', name: '主页', component: () => import('../views/Home') },
      { path: 'admin', name: '赛区管理员', component: () => import('../views/data/Admin') },
      { path: 'zjk', name: '专家库', component: () => import('../views/data/Zjk') },
      { path: 'psgl', name: '评审管理', component: () => import('../views/precontest/Psgl') },
      { path: 'pyzbgl', name: '评阅指标管理', component: () => import('../views/precontest/Pyzbgl') },
      { path: 'pyjdgl', name: '评阅进度管理', component: () => import('../views/precontest/Pyjdgl') },
      { path: 'pyjggl', name: '评阅结果管理', component: () => import('../views/precontest/Pyjggl') },
      { path: 'bmtdgl', name: '报名团队管理', component: () => import('../views/team/Bmtdgl') },
      { path: 'xtxxsh', name: '选题信息审核', component: () => import('../views/team/Xtxxsh') },
      { path: 'zpgl', name: '作品管理', component: () => import('../views/team/Zpgl') },
      { path: 'grmmxg', name: '个人密码修改', component: () => import('../views/user/Grmmxg') },
      { path: 'xggrxx', name: '修改个人信息', component: () => import('../views/user/Xggrxx') },
      { path: 'csdwjxsz', name: '参赛单位奖项设置', component: () => import('../views/award/Csdwjxsz') },
      { path: 'grjxsz', name: '个人奖项设置', component: () => import('../views/award/Grjxsz') },
      { path: 'jxgl', name: '奖项管理', component: () => import('../views/award/Jxgl') },
      { path: 'tdjxsz', name: '团队奖项设置', component: () => import('../views/award/Tdjxsz') },
      { path: 'grmmxg', name: '个人密码修改', component: () => import('../views/user/Grmmxg') },
      { path: 'xggrxx', name: '修改个人信息', component: () => import('../views/user/Xggrxx') }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  localStorage.setItem('currentPathName', to.name)// 设置当前的路由名称
  store.commit('setPath')
  next()
})

export default router
