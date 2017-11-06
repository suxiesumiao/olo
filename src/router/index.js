/*eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
// 外卖页面
import Msite from '@/components/msite/Msite'
import search_poi_nearby from '@/components/msite/search_poi_nearby'
// 发现页面
import Discover from '@/components/discover/Discover'
import discount from '@/components/discover/discount'
import nearby from '@/components/discover/nearby'
import hotfood from '@/components/discover/hotfood'
// 订单页面
import Order from '@/components/order/Order'
import login from '@/components/order/login'
// 个人页面
import Profile from '@/components/profile/Profile'
import balance from '@/components/profile/balance'
import favorable from '@/components/profile/favorable'
import integral from '@/components/profile/integral'
import integral_shop from '@/components/profile/integral_shop'
import vip from '@/components/profile/vip'
import help from '@/components/profile/help'
import ontimeCaption from '@/components/profile/question/ontimeCaption'
import paymentCaption from '@/components/profile/question/paymentCaption'
import balanceCaption from '@/components/profile/question/balanceCaption'
import hongbaoCaption from '@/components/profile/question/hongbaoCaption'
import pointtextCaption from '@/components/profile/question/pointtextCaption'
import memberCaption from '@/components/profile/question/memberCaption'
import activityCaption from '@/components/profile/question/activityCaption'
import otherCaption from '@/components/profile/question/otherCaption'
// 店家页面
import Shop from '@/components/shop/Shop'
// 主题店家页面
import Restaurants from '@/components/common/restaurants/restaurants'
// 主题组件
import Theme from '@/components/common/theme/theme'
Vue.use(Router)
/*eslint-disable */
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'msite',
    component: Msite
  },
  {
    path: '/search_poi_nearby',
    name: 'search_poi_nearby',
    component: search_poi_nearby
  },
  {
    path: '/discover',
    name: 'discover',
    component: Discover,
    children: [
      {
        path: 'discount',
        name: 'discount',
        component: discount
      },
      {
        path: 'nearby',
        name: 'nearby',
        component: nearby
      },
      {
        path: 'hotfood',
        name: 'hotfood',
        component: hotfood
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/balance',
    name: 'balance',
    component: balance
  },
  {
    path: '/favorable',
    name: 'favorable',
    component: favorable
  },
  {
    path: '/integral',
    name: 'integral',
    component: integral
  },
  {
    path: '/integral_shop',
    name: 'integral_shop',
    component: integral_shop
  },
  {
    path: '/vip',
    name: 'vip',
    component: vip
  },
  {
    path: '/help',
    name: 'help',
    component: help
  },
  {
    path: '/help/ontimeCaption',
    name: 'ontimeCaption',
    component: ontimeCaption
  },
  {
    path: '/help/paymentCaption',
    name: 'paymentCaption',
    component: paymentCaption
  },
  {
    path: '/help/balanceCaption',
    name: 'balanceCaption',
    component: balanceCaption
  },
  {
    path: '/help/hongbaoCaption',
    name: 'hongbaoCaption',
    component: hongbaoCaption
  },
  {
    path: '/help/pointtextCaption',
    name: 'pointtextCaption',
    component: pointtextCaption
  },
  {
    path: '/help/memberCaption',
    name: 'memberCaption',
    component: memberCaption
  },
  {
    path: '/help/activityCaption',
    name: 'activityCaption',
    component: activityCaption
  },
  {
    path: '/help/otherCaption',
    name: 'otherCaption',
    component: otherCaption
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/restaurants',
    name: 'Restaurants',
    component: Restaurants
  },
  {
    path: '/Theme',
    name: 'Theme',
    component: Theme
  }]
})
