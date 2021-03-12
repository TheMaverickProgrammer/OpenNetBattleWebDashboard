import Vue from 'vue'
import Vuex from 'vuex'

import { folders } from './modules/folders'
import { publicFolders } from './modules/publicFolders'
import { cards } from './modules/cards'
import { alerts } from './modules/alerts'
import { combos } from './modules/combos'
import { products } from './modules/products'
import { keyitems } from './modules/keyitems'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: "",
            userId: "",
            email: "",
            twitter: "",
            pool: [],
            monies: 0,
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
                pool: [],
                monies: 0,
                isAdmin: false
            };

            context.commit('doSetUser', user);
            localStorage.removeItem('obnSessionActive');

            this.dispatch('folders/clearFolders', { namespaced: true});
            this.dispatch('publicFolders/clearFolders', { namespace: true});
            this.dispatch('cards/clearCards', { namespaced: true});
            this.dispatch('combos/clearCombos', { namespaced: true });
            this.dispatch('products/clearProducts', { namespaced: true });
            this.dispatch('keyitems/clearKeyItems', { namespaced: true });
        }
    },
    modules: {
        folders,
        publicFolders,
        cards,
        alerts,
        combos,
        products,
        keyitems
    }
});