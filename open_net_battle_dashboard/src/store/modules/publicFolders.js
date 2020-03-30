export const folders = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {},
    mutations: {
        doAddFolder(state, folder) {
            state.list = [folder, ...state.list];
        },
        doRemoveFolder(state, folderIndex) {
            state.list.splice(folderIndex, 1);
        },
        doClearFolders(state) {
            state.list = []
        }
    },
    actions: {
        addFolder(context, folder) {
            context.commit('doAddFolder', folder);
        },
        removeFolder(context, index) {
            context.commit('doRemoveFolder', index);
        },
        clearFolders(context) {
            context.commit('doClearFolders');
        }
    }
}