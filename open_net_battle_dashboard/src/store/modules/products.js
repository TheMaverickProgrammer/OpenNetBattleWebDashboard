import Vue from 'vue'

export const products = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getProductById: (state) => (id) => {
            // We leave product names undefined and let the store update itself
            // with name knowledge using prefetches.
            // This allows us to separate product listing information from the actual
            // product.
            return state.list.find( product => product.id == id) 
                || { itemId: "", type: "", monies: 0 };
        }
    },
    mutations: {
        doAddProduct(state, product) {
            if(typeof product.id === 'undefined' && product._id) {
                product.id = product._id;
                delete product._id;
            }

            state.list = [product, ...state.list];
        },
        doRemoveProduct(state, id) {
            let index = state.list.findIndex(product => product.id == id);

            if(index > -1) {
                state.list.splice(index, 1);
            }
        },
        doClearProducts(state) {
            state.list = []
        },
        doUpdateProduct(state, product) {
            if(typeof product.id === 'undefined' && product._id) {
                product.id = product._id;
                delete product._id;
            }

            let index = state.list.findIndex(productItem => productItem.id == product.id);

            if(index > -1) {
               Vue.set(state.list, index, product);
            }
        }
    },
    actions: {
        addProduct(context, product) {
            context.commit('doAddProduct', product);
        },
        removeProduct(context, id) {
            context.commit('doRemoveProduct', id);
        },
        clearProducts(context) {
            context.commit('doClearProducts');
        },
        updateProduct(context, product) {
            context.commit('doUpdateProduct', product);
        }
    }
}