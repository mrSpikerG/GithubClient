import Vue from 'vue'
import Vuex from 'vuex'

// modules
import core from './modules/core';


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        main: core,
    }
});
