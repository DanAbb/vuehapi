import Vue from 'vue'
import Router from 'vue-router'
const Login = (r) => require(['@/components/Login'], r)
const Signup = (r) => require(['@/components/Signup'], r)
const Dashboard = (r) => require(['@/components/Dashboard'], r)
const AllRestaurants = (r) => require(['@/components/restaurants/AllRestaurants'], r)
const NewRestaurant = (r) => require(['@/components/restaurants/NewRestaurant'], r)
const Restaurant = (r) => require(['@/components/restaurants/Restaurant'], r)

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
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/myrestaurants',
          name: 'AllRestaurants',
          component: AllRestaurants
        },
        {
          path: '/newrestaurant',
          name: 'NewRestaurant',
          component: NewRestaurant
        },
        {
          path: '/restaurant/:id',
          name: 'Restaurant',
          component: Restaurant,
          props: true
        }
      ]
    }
  ]
})
