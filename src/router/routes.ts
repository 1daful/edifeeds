import { RouteRecordRaw } from 'vue-router';
import { authGuard } from '../api/auth/authGuard'
//import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
//import Home from '../pages/Home.vue'
import SignIn from "../pages/SignIn.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/password-recovery',
        name: 'PasswordRecovery',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/PasswordRecovery.vue'),
        meta:{
          navigational: true
        },
        props: true
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
        meta:{
          navigational: true
        },
        props: true
      },
      {
        path: '/media/:id',
        name: 'Media',
        component: () => import('../pages/SingleMediaPage.vue'),
        //props: (route: {params: {media: any}}) => ({media: route.params})
        props: (route: { query: { mediaType: any } }) => ({mediaType: route.query.mediaType}),
      },
      {
        path: '/profile',
        name: 'Profile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/Profile.vue'),
        meta: {
          navigational: true
        },
        props: true,
        beforeEnter: authGuard,
        children: [
          {
              path: '/profile:',
              name: 'About',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
              meta: {
                navigational: true
              },
              props: true
          },
          {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
            meta: {
              navigational: true
            },
            props: true
          }
        ]
      },
      {
        props: (route: { params: { myUrl: any } }) => ({myUrl: route.params.myUrl}),
        path: '/access_token=:myUrl',
        component: () => import(/* webpackChunkName: "about" */ '../pages/Auth.vue'),
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      }
    ]
  },
  /*{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    navigational: true,
  },
  props: true
},*/
{
  path: '/signin',
  name: 'SignIn',
  component: SignIn,
  props: (route: { query: { myUrl: any } }) => ({myUrl: route.query.myUrl}),
  meta: {
    noHeader: true
  }
},
{
  path: '/signup',
  name: 'SignUp',
  component: () => import(/* webpackChunkName: "about" */ '../pages/SignUp.vue'),
  props: (route: { query: { myUrl: any } }) => ({myUrl: route.query.myUrl}),
  meta: {
    noHeader: true
  }

}
/*{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
},


  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },*/

  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
