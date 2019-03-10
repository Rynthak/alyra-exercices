import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/views/Profile'
import List from '@/views/List'
import Buy from '@/views/Buy'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'List',
            component: List
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/buymonster',
            name: 'Buy',
            component: Buy
        },
    ],
    linkActiveClass: 'active'
})