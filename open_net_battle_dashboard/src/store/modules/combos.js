export const combos = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getComboById: (state) => {
            return (id) => {
                let combo = state.list.find( combo => combo.id == id) 
                let nocombo = { 
                    name: "-",
                    element: "-", secondaryElement: "-", damage: 0,
                    verboseDescription: "N/A", canBoost: false,
                    class: 1, limit: 0, action: "", timeFreeze: false
                };

                return combo || nocombo;
            }
        }
    },
    mutations: {
        doAddCombo(state, combo) {
            if(typeof combo.id === 'undefined' && combo._id) {
                combo.id = combo._id;
                delete combo._id;
            }

            // Don't track duplicates
            if(!state.list.find(comboItem => comboItem.id == combo.id)) {
                state.list = [combo, ...state.list];
            }
        },
        doRemoveCombo(state, index) {
            state.list.splice(index, 1);
        },
        doClearCombos(state) {
            state.list = []
        }
    },
    actions: {
        addCombo(context, combo) {
            context.commit('doAddCombo', combo);
        },
        removeCombo(context, index) {
            context.commit('doRemoveCombo', index);
        },
        clearCombos(context) {
            context.commit('doClearCombos');
        }
    }
}