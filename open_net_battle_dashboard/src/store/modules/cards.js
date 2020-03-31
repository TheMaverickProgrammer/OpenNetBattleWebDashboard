export const cards = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getCardById: (state) => (id) => {
            return state.list.find( card => card.id == id) 
                || { 
                    name: "-", image: "", code: "-", codeFamily: [],
                    element: "-", secondaryElement: "-", damage: 0,
                    description: "N/A", verboseDescription: "N/A" 
                };
        }
    },
    mutations: {
        doAddCard(state, card) {
            card.id = card._id;
            delete card._id;
            state.list = [card, ...state.list];
        },
        doRemoveCard(state, cardIndex) {
            state.list.splice(cardIndex, 1);
        },
        doClearCards(state) {
            state.list = []
        }
    },
    actions: {
        addCard(context, card) {
            context.commit('doAddCard', card);
        },
        removeCard(context, index) {
            context.commit('doRemoveCard', index);
        },
        clearCards(context) {
            context.commit('doClearCards');
        }
    }
}