export const alerts = {
    namespaced: true,
    state: {
        message: "",
        type: "",
        title: ""
    },
    getters: {},
    mutations: {
        doAddAlert(state, alert) {
            state.message = alert.message;
            state.type = alert.type;
            state.title = alert.title;
        }
    },
    actions: {
        addAlert(context, alert) {
            if(typeof alert.title === 'undefined' || alert.title.length == 0)
                alert.title = alert.type;

            context.commit('doAddAlert', alert);
        },
    }
}