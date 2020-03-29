import Vue from 'vue'
import Vuex from 'vuex'

import { folders } from './modules/folders'
import { cards } from './modules/cards'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: "",
            userId: "",
            email: "",
            twitter: "",
            isAdmin: false
        }
    },
    getters: {

    },
    mutations: {
        doSetUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        setUser(context, user) {
            context.commit('doSetUser', user);
        }
    },
    modules: {
        folders,
        cards
    }
});