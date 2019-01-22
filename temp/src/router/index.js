import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import box from '@/pages/box'
Vue.use(Router)
export const constRouterMap=[
    {
        path: '/angular',
        component: () => import('@/pages/angular'),
        name: 'angular',
        meta: { title: 'title.angular' , icon:'el-icon-document'}
    },
    {
        path: '/vues',
        // component: () => import('@/pages/vues'),
        name: 'vues',
        meta: { title: 'title.vues',icon:'el-icon-location' },
        children:[
            {
                path: '/vues1111',
                component: () => import('@/pages/vues/vues1111'),
                name: 'vues1111',
                meta: { title: 'title.vues1111' , }
            },
            {
                path: '/vues2222',
                component: () => import('@/pages/vues/vues2222'),
                name: 'vues2222',
                meta: { title: 'title.vues2222' , }
            },
            {
                path: '/vues3333',
                component: () => import('@/pages/vues/vues3333'),
                name: 'vues3333',
                meta: { title: 'title.vues3333' , }
            },
        ]
    },
    {
        path: '/jquery',
        // component: () => import('@/pages/jquery'),
        name: 'jquery',
        meta: { title: 'title.jquery',icon:'el-icon-tickets'},
        children:[
            {
                path: '/jquery1111',
                component: () => import('@/pages/jquery/jquery1111'),
                name: 'jquery1111',
                meta: { title: 'title.jquery1111' , }
            },
            {
                path: '/jquery2222',
                component: () => import('@/pages/jquery/jquery2222'),
                name: 'jquery2222',
                meta: { title: 'title.jquery2222' , }
            },
        ]
    },
    {
        path: '/react',
        // component: () => import('@/pages/react'),
        name: 'react',
        meta: { title: 'title.react',icon:'el-icon-message'},
        children:[
            {
                path: '/react1111',
                component: () => import('@/pages/react/react1111'),
                name: 'react1111',
                meta: { title: 'title.react1111' , }
            },
            {
                path: '/react2222',
                component: () => import('@/pages/react/react2222'),
                name: 'react2222',
                meta: { title: 'title.react2222' , }
            },
            {
                path: '/react3333',
                component: () => import('@/pages/react/react3333'),
                name: 'react3333',
                meta: { title: 'title.react3333' , }
            },
        ]
    },
    {
        path: '/button',
        component: () => import('@/pages/button'),
        name: 'button',
        meta: { title: 'title.button' , icon:'el-icon-document'}
    },
]
export const constRouters=[
    {
        path: '/',
        name: 'home',
        meta:{title:'测试页'},
        component: home
    },
    {
        path: '/box',
        name: 'box',
        component: box,
        meta:{title:'首页'},
        // children:constRouterMap
    },
]

export default new Router({
    // linkExactActiveClass: 'active',
    routes: constRouters
})
