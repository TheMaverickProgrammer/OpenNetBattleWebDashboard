import Vue from 'vue'
import Vuex from 'vuex'

import { folders } from './modules/folders'
import { publicFolders } from './modules/publicFolders'
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
            localStorage.setItem('obnSessionActive', true);

        },
        setUser(context, user) {
            if(typeof user.userId === 'undefined' && user._id) {
                user.userId = user._id;
                delete user._id;
            }
            
            context.commit('doSetUser', user);
            localStorage.setItem('obnSessionActive', true);
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
            localStorage.removeItem('obnSessionActive');

            this.dispatch('folders/clearFolders', { namespaced: true});
            this.dispatch('publicFolders/clearFolders', { namespace: true});
            this.dispatch('cards/clearCards', { namespaced: true});
        }
    },
    modules: {
        folders,
        publicFolders,
        cards,
        alerts
    }
});