import axios from 'axios'
import config from '@/config'

const protocol = config.secured? "https://" : "http://";
const base_url = protocol + config.domain + ":" + config.port + "/" + config.version;

const resources = {
    LOGIN:  base_url + "/login",
    LOGOUT: base_url + "/logout",
    CARDS: base_url + "/cards",
    ADMINS: base_url + "/admins",
    USERS: base_url + "/users",
    FOLDERS: base_url + "/folders",
    PUBLIC_FOLDERS: base_url + '/public-folders',
    CARD_MODELS: base_url + '/card-mdodels',
}

const api =  {
    login(username, password, cancelToken) {
        return axios.get(resources.LOGIN, 
        {
            cancelToken: cancelToken || null,
            withCredentials: true, 
            auth: { username: username, password: password },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
    },
    logout() {
        return axios.get(resources.LOGOUT, 
        {
            withCredentials: true, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
    },
    /* 
    demoteAdmin(userId) {

    },
    promoteAdmin(userId) {

    },*/
    get: {
        card(id) {
            return axios.get(resources.CARDS + "/" + id, 
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        cardModel(id) {
            return axios.get(resources.CARD_MODELS + "/" + id, 
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        folder(id) {
            return axios.get(resources.FOLDERS + "/" + id, 
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        /* 
        API uses time to fetch real-time updates
        Use `milli = 0` to fetch all resources of type
        */
        cardsAfterDate(milli, cancelToken) {
            return axios.get(resources.CARDS + "/since/" + milli, 
                {
                    cancelToken: cancelToken || null,
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        foldersAfterDate(milli, cancelToken) {
            return axios.get(resources.FOLDERS + "/since/" + milli, 
                {
                    cancelToken: cancelToken || null,
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        usersAfterDate(milli, cancelToken) {
            return axios.get(resources.USERS + "/since/" + milli, 
                {
                    cancelToken: cancelToken || null,
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        publicFoldersAfterDate(milli, cancelToken) {
            return axios.get(resources.PUBLIC_FOLDERS + "/since/" + milli, 
                {
                    cancelToken: cancelToken || null,
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        }
    },
    add: {
        cardModel(cardModel) {
            return axios.post(resources.CARD_MODELS, 
                cardModel,
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        folder(folder) {
            return axios.post(resources.FOLDERS, 
                folder,
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        publicFolder(folder) {
            return axios.post(resources.PUBLIC_FOLDERS, 
                folder,
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        }
    },
    update: {
        cardModel(cardModel) {
            // For ease of use, dashboard discards the underscore id 
            // but the api expects the same format that it sent
            let id = cardModel.id;
            delete cardModel.id; 
        
            return axios.put(resources.CARD_MODELS + "/" + id, 
                cardModel,
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        user(user) {
            let id = user.id;
            delete user.id; 
        
            return axios.put(resources.USERS + "/" + id, 
                user,
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        folder(folder) {
            let id = folder.id;
            delete folder.id; 
        
            return axios.put(resources.FOLDERS + "/" + id, 
                folder,
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        },
        publicFolder(folder) {
            let id = folder.id;
            delete folder.id; 
        
            return axios.put(resources.PUBLIC_FOLDERS +"/" + id, 
                folder,
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
        }
    },
    delete: {
        cardModel(id) {
            return axios.delete(resources.CARD_MODELS +"/" + id, 
            {
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        user(id) {
            return axios.delete(resources.USERS +"/" + id, 
            {
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        folder(id) {
            return axios.delete(resources.FOLDERS +"/" + id, 
            {
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        publicFolder(id) {
            return axios.delete(resources.PUBLIC_FOLDERS +"/" + id, 
            {
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        }
    }
}

const plugin = {
    install(Vue, options) {
        if (!options || !options.store) {
            throw new Error('Please initialise plugin with a Vuex store.');
        }

        let store = options.store;
        Vue.api = api;
        Vue.prototype.$api = api;

        Vue.prototype.$api.prefetchCardById = function(id, onComplete) {
            onComplete = onComplete || function(){};

            let getCardById = store.getters['cards/getCardById'];
            let card = getCardById(id);

            if((card.id || null) == null) {
                // Try fetching from the api
                api.get.card(id).then(payload =>{
                    store.dispatch('cards/addCard', payload.data.data);
                    card = getCardById(id);
                }).catch(err => {
                    let alert = {message: err, type: "danger", title: "error"};
                    store.dispatch('alerts/addAlert', alert, {namespaced:true});
                }).finally(()=>{onComplete(card)});
            } else {
                // we have it
                onComplete(card)
            }

            //return card; // make synchronous?
        },

        Vue.prototype.$api.prefetchFolderById = function(id, onComplete) {
            onComplete = onComplete || function(){};

            let getFolderById = store.getters['folders/getFolderById'];
            let folder = getFolderById(id);


            if(typeof folder.id  === 'undefined') {
                // Try fetching from the api
                api.get.folder(id).then(payload =>{
                    store.dispatch('folders/addFolder', payload.data.data);
                    folder = getFolderById(id);
                }).catch(err => {
                    let alert = {message: err, type: "danger", title: "error"};
                    store.dispatch('alerts/addAlert', alert, {namespaced:true});
                }).finally(()=>{console.log("finally"); onComplete(folder)});
            } else {
                // we have it
                onComplete(folder);
            }

            //return folder; // make synchronous?
        }
    }
}

export default plugin;