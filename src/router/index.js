import { createRouter, createWebHistory } from 'vue-router'

import Cookies from 'js-cookie'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Main from '../views/Main.vue'
import Dashboard from '../views/Dashboard.vue'
import Categories from '../views/Categories.vue'
import Transactions from '../views/Transactions.vue'
import Income from '../views/Income.vue'
import Budgets from '../views/Budgets.vue'
import Settings from '../views/Settings.vue'


const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/dashboard',
    component: Main,
    children: [
      { path: '/dashboard', component: Dashboard, name: 'Home' },
      { path: '/categories', component: Categories, name: 'Categories' },
      { path: '/transactions', component: Transactions, name: 'Transactions' },
      { path: '/income', component: Income, name: 'Income' },
      { path: '/budgets', component: Budgets, name: 'Budgets' },
      { path: '/settings', component: Settings, name: 'Settings' },
    ]
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  // { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword }, 
  // { path: '/reset-password', name: 'ResetPassword', component: ResetPassword }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/forgot-password', '/reset-password'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Cookies.get('token');
  // const loggedIn = localStorage.getItem('token');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

export default router
