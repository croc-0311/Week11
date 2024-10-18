import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberView from '../views/MemberView.vue'
import DeniedPage from '../views/DeniedPage.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AdminView from '../views/AdminView.vue'
import LogoutView from '../views/FirebaseLogoutView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/countBookAPI',
      name: 'CountBookAPI',
      component: CountBookAPI
    },
    {
      path: '/weatherView',
      name: 'WeatherView',
      component: WeatherView
    },
    {
      path: '/getBookCount',
      name: 'GetBookCount',
      component: GetBookCountView
    },
    {
      path: '/addBook',
      name: 'AddBook',
      component: AddBookView
    },
    {
      path: '/member',
      name: 'Member',
      component: MemberView,
      beforeEnter: (to, from, next) => {
              if (localStorage.getItem('isAuthenticated') === 'true') {
                  if (localStorage.getItem('role') === 'user'){
                    next();
                  } else {
                    next({name: 'Admin'});
                  }
                } else {
                  next({ name: 'Denied'});
                }
              }
          
    },
    {
      path: '/denied',
      name: 'Denied',
      component: DeniedPage
    },
    {
      path: '/firebaseSignin',
      name: 'FirebaseSignin',
      component: FirebaseSigninView
    },
    {
      path: '/firebaseRegister',
      name: 'FirebaseRegister',
      component: FirebaseRegisterView
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView
    }
  ]
})


export default router