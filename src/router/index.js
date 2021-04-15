import Vue from 'vue'
import Router from 'vue-router'
import memberHome from '@/components/memberHome'
import searchPage from '@/components/member/search/searchPage'
import mine from '@/components/member/mine/mine'
import history from '@/components/member/mine/history'
import call from '@/components/member/mine/call'
import setting from '@/components/member/mine/setting'
import updatePassword from '@/components/member/mine/updatePassword'
import login from '@/components/member/login/login'
import register from '@/components/member/login/register'
import detail from '@/components/member/search/detail'
import personal from '@/views/personal/index'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: __dirname,
  //路由映射map
  routes: [
    {path: '/', redirect: '/memberHome/searchPage'},
    {path: '*', redirect: '/memberHome/searchPage'},
    {
      path: '/memberHome',
      name: 'memberHome',
      component: memberHome,
      children: [
        {
          path: '/memberHome/searchPage',
          name: 'searchPage',
          component: searchPage
        },

        {
          path: '/memberHome/mine',
          name: 'mine',
          component: mine
        }

      ],
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
    }
    ,
    {
      path: '/history',
      name: 'history',
      component: history,
    },
    {
      path: '/call',
      name: 'call',
      component: call,
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,
    },
    {
      path: '/updatePassword',
      name: 'updatePassword',
      component: updatePassword,
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal,
    }
  ]
})


export default router
