import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'components/Login'
import Home from 'components/home'
import Role from 'views/system/role'
import User from 'views/system/user'
import Menu from 'views/system/menu'
import Dept from 'views/system/dept'
import Dict from 'views/system/dict'
import Quartz from 'views/quartz'
import Dataanalytics from 'views/dataanalytics'
import Bagging from 'views/bagging'
import Metalcheck from 'views/metalcheck'
import PO from 'views/po'
import localStore from 'storejs'
import ObjUtil from "../util/ObjUtil";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/user',
                component: User
            },
            {
                path: '/role',
                component: Role
            },
            {
              path: '/menu',
              component: Menu
            },
            {
                path: '/dept',
                component: Dept
            },
            {
                path: '/dict',
                component: Dict
            },
            {
                path: '/quartz',
                component: Quartz
            },
            {
                path: '/dataanalytics',
                component: Dataanalytics
            },
            {
                path: '/bagging',
                component: Bagging
            },
            {
                path: '/metalcheck',
                component: Metalcheck
            },
            {
                path: '/po',
                component: PO
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let info = localStore.get('loginInfo')
    if (ObjUtil.isEmpty(info) && to.path !== '/login') {
        next('/login')
    }
    next()
})

export default router
