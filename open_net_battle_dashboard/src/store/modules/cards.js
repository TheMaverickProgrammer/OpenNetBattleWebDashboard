export const cards = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {},
    mutations: {
        doAddCard(state, card) {
            state.list = [card, ...state.list];
        },
        doRemoveCard(state, cardIndex) {
            state.list.splice(cardIndex, 1);
        }
    },
    actions: {
        addCard(context, card) {
            context.commit('doAddCard', card);
        },
        removeCard(context, index) {
            context.commit('doRemoveCard', index);
        }
    }
}