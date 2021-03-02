import Vue from 'vue'
import Vuelidate from 'vuelidate/src'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

// Initialize Firebase
firebase.initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: 'vue-crm-c36aa.firebaseapp.com',
    projectId: 'vue-crm-c36aa',
    storageBucket: 'vue-crm-c36aa.appspot.com',
    messagingSenderId: '410793507803',
    appId: process.env.VUE_APP_FIREBASE_API_KEY,
    measurementId: 'G-ZGXLG9TKH0'
})

let app = null

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})
