export const folders = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getFolderById: (state) => (id) => {
            return state.list.find( folder => folder.id == id) 
                || { name: "", cards: [], date: 0 };
        }
    },
    mutations: {
        doAddFolder(state, folder) {
            if(typeof folder.id === 'undefined' && folder._id) {
                folder.id = folder._id;
                delete folder._id;
            }

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
        },
        doUpdateFolder(state, folder) {
            if(typeof folder.id === 'undefined' && folder._id) {
                folder.id = folder._id;
                delete folder._id;
            }

            let index = state.list.findIndex(folderItem => folderItem.id == folder.id);

            if(index > -1) {
               state.list[index] = folder;
            }
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
        },
        updateFolder(context, folder) {
            context.commit('doUpdateFolder', folder);
        }
    }
}