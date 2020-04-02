import api from '@/api'

export const cards = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getCardById: (state) => (id) => {
            let card = state.list.find( card => card.id == id) 
            let nocard = { 
                name: "-", image: "", code: "-", codeFamily: [],
                element: "-", secondaryElement: "-", damage: 0,
                description: "N/A", verboseDescription: "N/A" 
            };

            if(!card) {
                // Try fetching from the api
                api.get.card(id).then((card)=>{
                    this.$store.dispatch('addCard', card);
                }).catch((err) => {
                    let alert = {message: err, type: "danger", title: "error"};
                    this.$store.dispatch('alerts/addAlert', alert, {namespaced:true});
                });
            }

            return nocard;
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