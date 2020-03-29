export const cards = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getCardById(state, id) {
            state.list.filter(card => {
                return card._id == id
            });
        }
    },
    mutations: {
        doAddCard(state, card) {
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