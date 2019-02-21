import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import meetup from '@/components/main/meetup'
import Createmeetup from '@/components/main/Createmeetup'
import Adminmeetup from '@/components/main/Adminmeetup'
import Editmeetup from '@/components/main/Editmeetup'
import Meetupdetail from '@/components/main/Meetupdetail'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/meetups',
      name: 'meetup',
      component: meetup
    },
    {
      path: '/create-meetup',
      name: 'Createmeetup',
      component: Createmeetup
    },
    {
      path: '/admin-meetup/adminmeetup',
      name: 'Adminmeetup',
      component: Adminmeetup
    },
    {
      path: '/edit-meetup/:editmeetup_slug',
      name: 'Editmeetup',
      component: Editmeetup,
    },
    {
      path: '/meetup-detail/:meetupdetail_slug',
      name: 'Meetupdetail',
      component: Meetupdetail,
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
      // check auth state of user
      let user = firebase.auth().currentUser
      if (user) {
        //user signed in, proceed to route
        next()
      } else {
        // no user signed in, redirect to log-in
      } next({ name: 'Login' })
    } else {
      next()
    }
})

export default router