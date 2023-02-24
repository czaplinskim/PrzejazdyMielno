import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pl'
import App from './App.vue'
import router from './router'
import store from './store'

import JsonCSV from 'vue-json-csv'

Vue.component('downloadCsv', JsonCSV)

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


import firebase from 'firebase'

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('admin');
  else if (!requiresAuth && currentUser && to.name == 'Admin') next('dashboard');
  else next();
});



Vue.use(ElementUI, { locale });
Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(user => {
  
  if(!app){
    let app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});
