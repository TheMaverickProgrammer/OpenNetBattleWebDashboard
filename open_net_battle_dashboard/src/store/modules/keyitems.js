export const keyitems = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getKeyItemById: (state) => {
            return (id) => {
                let keyitem = state.list.find( keyitem => keyitem.id == id) 
                let nokeyitem = { 
                    name: "-",
                    description: "N/A"
                };

                return keyitem || nokeyitem;
            }
        }
    },
    mutations: {
        doAddKeyItem(state, keyitem) {
            if(typeof keyitem.id === 'undefined' && keyitem._id) {
                keyitem.id = keyitem._id;
                delete keyitem._id;
            }

            // Don't track duplicates
            if(!state.list.find(item => item.id == keyitem.id)) {
                state.list = [keyitem, ...state.list];
            }
        },
        doRemoveKeyItem(state, index) {
            state.list.splice(index, 1);
        },
        doClearKeyItems(state) {
            state.list = []
        }
    },
    actions: {
        addKeyItem(context, keyitem) {
            context.commit('doAddKeyItem', keyitem);
        },
        removeKeyItem(context, index) {
            context.commit('doRemoveKeyItem', index);
        },
        clearKeyItems(context) {
            context.commit('doClearKeyItems');
        }
    }
}