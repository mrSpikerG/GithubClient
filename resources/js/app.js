//
//  Imports
//
import router from './router/index';
import VueRouter from 'vue-router';
import Vuesax from 'vuesax';
import Vuex from 'vuex';
import { store } from './store/store';
import 'vuesax/dist/vuesax.css' //Vuesax styles

require('./bootstrap');

window.Vue = require('vue').default;


//
//  Configurate
//
Vue.use(VueRouter)
// Vue.use(Vuex);
Vue.use(Vuesax, {
  
})


//
//  Components
//
Vue.component('side-bar-component', require('./components/SideBar.vue').default);
Vue.component('repos-list-component', require('./components/RepositoryList.vue').default);


//
//  Init
//
const app = new Vue({
    el: '#app',
    router,
    store,
});

