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
                    description: "N/A", verboseDescription: "N/A",
                    class: 1, limit: 0, action: "", timeFreeze: false,
                    canBoost: false
                };

                return card || nocard;
            }
        },
        getCardsByModelId: (state) => {
            return (id) => {
                let cards = state.list.filter( card => card.modelId == id) 
                let nocard = { 
                    id:null,
                    name: "-", image: "", code: "-", codeFamily: [],
                    element: "-", secondaryElement: "-", damage: 0,
                    description: "N/A", verboseDescription: "N/A",
                    class: 1, limit: 0, action: "", timeFreeze: false,
                    canBoost: false
                };

                return cards.length>0? cards : [nocard];
            }
        }
    },
    mutations: {
        doAddCard(state, card) {
            if(typeof card.id === 'undefined' && card._id) {
                card.id = card._id;
                delete card._id;
            }

            // Don't track duplicates
            if(!state.list.find( cardItem => cardItem.id == card.id)) {
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
                card.class = card.detail.class;
                card.limit = card.detail.limit;
                card.action = card.detail.action;
                card.timeFreeze = card.detail.timeFreeze;
                card.canBoost = card.detail.canBoost;
                delete card.detail;
                state.list = [card, ...state.list];
            }
        },
        doUpdateCardsByModel(state, model) {
            // Don't track duplicates
            let cards = state.list.filter( cardItem => cardItem.modelId == model.id);

            for(let i = 0; i < cards.length; i++) {
                let card = cards[i];
                card.name = model.name;
                card.codeFamily = model.codes;
                card.image = model.image;
                card.icon = model.icon;
                card.element = model.element;
                card.secondaryElement = model.secondaryElement;
                card.damage = model.damage;
                card.description = model.description;
                card.verboseDescription = model.verboseDescription;
                card.class = model.class;
                card.limit = model.limit;
                card.action = model.action;
                card.timeFreeze = model.timeFreeze;
                card.canBoost = model.canBoost;
            }
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
        updateCardsByModel(context, model) {
            context.commit('doUpdateCardsByModel', model);
        },
        removeCard(context, index) {
            context.commit('doRemoveCard', index);
        },
        clearCards(context) {
            context.commit('doClearCards');
        }
    }
}