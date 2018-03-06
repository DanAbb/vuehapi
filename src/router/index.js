import Vue from 'vue'
import Router from 'vue-router'
const Login = (r) => require(['@/components/Login'], r)
const Dashboard = (r) => require(['@/components/Dashboard'], r)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
