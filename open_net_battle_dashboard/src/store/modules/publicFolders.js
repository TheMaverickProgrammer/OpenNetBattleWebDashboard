export const publicFolders = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {},
    mutations: {
        doAddFolder(state, folder) {
            folder.id = folder._id;
            delete folder._id;
            state.list = [folder, ...state.list];
        },
        doRemoveFolder(state, id) {
            let index = state.list.findIndex(folder => folder.id == id);

            if(index > -1) {
                state.list.splice(index, 1);
            }
        },
        doClearFolders(state) {
            state.list = []
        }
    },
    actions: {
        addFolder(context, folder) {
            context.commit('doAddFolder', folder);
        },
        removeFolder(context, id) {
            context.commit('doRemoveFolder', id);
        },
        clearFolders(context) {
            context.commit('doClearFolders');
        }
    }
}