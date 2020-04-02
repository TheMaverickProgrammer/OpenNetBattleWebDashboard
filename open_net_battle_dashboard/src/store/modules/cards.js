export const cards = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getCardById: (state) => {
            return (id) => {
                let card = state.list.find( card => card.id == id) 
                let nocard = { 
                    name: "-", image: "", code: "-", codeFamily: [],
                    element: "-", secondaryElement: "-", damage: 0,
                    description: "N/A", verboseDescription: "N/A"
                };

                return card || nocard;
            }
        }
    },
    mutations: {
        doAddCard(state, card) {
            card.id = card._id;
            card.name = card.detail.name;
            card.codeFamily = card.detail.codes;
            card.image = card.detail.image;
            card.icon = card.detail.icon;
            card.element = card.detail.element;
            card.secondaryElement = card.detail.secondaryElement;
            card.damage = card.detail.damage;
            card.modelId = card.detail._id;
            card.description = card.detail.description;
            card.verboseDescription = card.detail.verboseDescription;
            delete card._id;
            delete card.detail;
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