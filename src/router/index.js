import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import ForgetPassword from '@/components/ForgetPassword'
import JobList from '@/components/JobList'
import Resume from '@/components/Resume'
import JobSchedule from '@/components/JobSchedule'
import Collection from '@/components/Collection'
import JobListDetails from '../pages/JobListDetails';
import AddResume from '../pages/AddResume';

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/reg',
      name: 'Register',
      component: Register
    },
    {
      path: '/forget',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/joblist',
      name: 'JobList',
      component: JobList,
      meta: {
        keepAlive: true, //此组件需要被缓存 
      }
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/Jld',
      name: 'JobListDetails',
      component: JobListDetails
    },
    {
      path: '/JobSchedule',
      name: 'JobSchedule',
      component: JobSchedule,
      meta: {
        keepAlive: true, //此组件需要被缓存

      }
    },
    {
      path: '/AddResume',
      name: 'AddResume',
      component: AddResume
    },
    {
      path: '/Collection',
      name: 'Collection',
      component: Collection,
      meta: {
        keepAlive: true, //此组件需要被缓存

      }
    }

  ]
})
