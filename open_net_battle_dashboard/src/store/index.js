import Vue from 'vue'
import Vuex from 'vuex'

import { folders } from './modules/folders'
import { cards } from './modules/cards'
import { alerts } from './modules/alerts'

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
        loginUser(context, user) {
            context.commit('doSetUser', user);
        },
        logoutUser(context) {
            let user = {
                username: "",
                userId: "",
                email: "",
                twitter: "",
                isAdmin: false
            };

            context.commit('doSetUser', user);

            this.dispatch('folders/clearFolders', { namespaced: true});
            this.dispatch('cards/clearCards', { namespaced: true});
        }
    },
    modules: {
        folders,
        cards,
        alerts
    }
});