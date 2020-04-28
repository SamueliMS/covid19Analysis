import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
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
        redirect: '/helloword',
    },
    {
        path: '/helloword',
        name: 'helloword',
        component: HelloWorld,
        props: { firebase }
    },    
  ]
})
