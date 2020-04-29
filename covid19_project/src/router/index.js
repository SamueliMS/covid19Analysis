import Vue from 'vue'
import Router from 'vue-router'
import Principal from '@/components/Principal.vue';
import Testing from '@/components/Testing.vue';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from '@/config/config'

firebase.initializeApp(firebaseConfig);

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '*',
        redirect: '/principal',
    },
    {
        path: '/principal',
        name: 'principal',
        component: Principal,
        props: { firebase }
    },
    {
      path: '/testing',
      name: 'testing',
      component: Testing,
      props: { firebase }
  },     
  ]
})
