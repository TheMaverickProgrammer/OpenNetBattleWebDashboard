export const alerts = {
    namespaced: true,
    state: {
        message: "",
        type: ""
    },
    getters: {},
    mutations: {
        doAddAlert(state, alert) {
            state.message = alert.message;
            state.type = alert.type;
        }
    },
    actions: {
        addAlert(context, alert) {
            context.commit('doAddAlert', alert);
        },
    }
}