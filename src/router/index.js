import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')

Vue.use(VueRouter)
//重复请求取消报错
const [routerPush, routerReplace] = [VueRouter.prototype.push, VueRouter.prototype.replace];
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error);
};


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
