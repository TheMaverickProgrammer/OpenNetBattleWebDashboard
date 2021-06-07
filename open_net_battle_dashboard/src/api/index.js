import axios from 'axios'
import config from '@/config'

axios.defaults.withCredentials = true;

const protocol = config.secured ? "https://" : "http://";
const base_url = protocol + config.domain + ":" + config.port + "/" + config.version;

const resources = {
    LOGIN: base_url + "/login",
    LOGOUT: base_url + "/logout",
    CARDS: base_url + "/cards",
    ADMINS: base_url + "/admins",
    USERS: base_url + "/users",
    FOLDERS: base_url + "/folders",
    PRODUCTS: base_url + "/products",
    KEYITEMS: base_url + "/keyitems",
    PUBLIC_FOLDERS: base_url + '/public-folders',
    CARD_MODELS: base_url + '/card-properties',
    COMBOS: base_url + '/combos',
    TXS: base_url + '/tx'
}

const folderMaxLength = 30;

const api = {
    auth: {
        login(username, password, cancelToken) {
            return axios.get(resources.LOGIN,
                {
                    cancelToken: cancelToken || null,
                    auth: { username: username, password: password },
                    crossdomain: true,
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                })
        },
        logout() {
            return axios.get(resources.LOGOUT,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
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
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        cardModel(id) {
            return axios.get(resources.CARD_MODELS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        folder(id) {
            return axios.get(resources.FOLDERS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        user(id) {
            return axios.get(resources.USERS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        combo(id) {
            return axios.get(resources.COMBOS + "/" + id, 
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        keyItem(id) {
            return axios.get(resources.KEYITEMS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
        },
        productsList() {
            return axios.get(resources.PRODUCTS,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        keyItemsCreated() {
            return axios.get(resources.KEYITEMS, 
                {
                    headers: { 'Content-Type': 'application/json' }
                })
        },
        keyItemsOwned() {
            return axios.get(resources.KEYITEMS + "/owned",
                {
                    headers: { 'Content-Type': 'application/json' }
                })
        },
        /* 
        API uses time to fetch real-time updates
        Use `milli = 0` to fetch all resources of type
        */
        cardsAfterDate(milli, cancelToken) {
            return axios.get(resources.CARDS + "/since/" + Math.floor(milli/1000),
                {
                    cancelToken: cancelToken || null,
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        foldersAfterDate(milli, cancelToken) {
            return axios.get(resources.FOLDERS + "/since/" + Math.floor(milli/1000),
                {
                    cancelToken: cancelToken || null,
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        usersAfterDate(milli, cancelToken) {
            return axios.get(resources.USERS + "/since/" + Math.floor(milli/1000),
                {
                    cancelToken: cancelToken || null,
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        publicFoldersAfterDate(milli, cancelToken) {
            return axios.get(resources.PUBLIC_FOLDERS + "/since/" + Math.floor(milli/1000),
                {
                    cancelToken: cancelToken || null,
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        combosAfterDate(milli, cancelToken) {
            return axios.get(resources.COMBOS + "/since/" + Math.floor(milli/1000),
                {
                    cancelToken: cancelToken || null,
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        productsAfterDate(milli, cancelToken) {
            return axios.get(resources.PRODUCTS + "/since/" + Math.floor(milli/1000), 
                {
                    cancelToken: cancelToken || null,
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        txAfterDate(milli, cancelToken) {
            return axios.get(resources.TXS + "/since/" + Math.floor(milli/1000), 
                {
                    cancelToken: cancelToken || null,
                    headers: { 'Content-Type': 'application/json' },
                })
        }
    },
    add: {
        cardModel(cardModel) {
            return axios.post(resources.CARD_MODELS,
                cardModel,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        folder(folder) {
            return axios.post(resources.FOLDERS,
                folder,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        publicFolder(folder) {
            return axios.post(resources.PUBLIC_FOLDERS,
                folder,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        user(user) {
            return axios.post(resources.USERS,
                user,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        combo(combo) {
            return axios.post(resources.COMBOS,
                combo,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        product(product) {
            return axios.post(resources.PRODUCTS,
                product,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        keyItem(keyItem) {
            return axios.post(resources.KEYITEMS,
                keyItem, 
                {
                    headers: { 'Content-Type': 'application/json' }
                })
        } 
    },
    update: {
        cardModel(cardModel) {
            // For ease of use, dashboard discards the underscore id 
            // but the api expects the same format that it sent
            let id = cardModel.id;
            let copy = {...cardModel};
            delete copy.id;

            return axios.put(resources.CARD_MODELS + "/" + id,
                copy,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        user(user) {
            let id = user.id;
            let copy = {...user};
            delete copy.id;

            return axios.put(resources.USERS + "/" + id,
                copy,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        folder(folder) {
            let id = folder.id;
            let copy = {...folder};
            delete copy.id;

            return axios.put(resources.FOLDERS + "/" + id,
                copy,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        publicFolder(folder) {
            let id = folder.id;
            let copy = {...folder};
            delete copy.id;

            return axios.put(resources.PUBLIC_FOLDERS + "/" + id,
                copy,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        combo(combo) {
            let id = combo.id;
            let copy = {...combo};
            delete copy.id;

            return axios.put(resources.COMBOS + "/" + id,
                copy,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        product(product) {
            let id = product.id;
            let copy = {...product};
            delete copy.id;

            return axios.put(resources.PRODUCTS +"/" + id,
                copy,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        keyItem(keyItem) {
            let id = keyItem.id;
            let copy = {...keyItem};
            delete keyItem.id;

            return axios.put(resources.KEYITEMS + "/" + id,
            copy,
            {
                headers: { 'Content-Type': 'application/json'}
            })
        }
    },
    delete: {
        card(id) {
            return axios.delete(resources.CARDS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        cardModel(id) {
            return axios.delete(resources.CARD_MODELS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        user(id) {
            return axios.delete(resources.USERS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        folder(id) {
            return axios.delete(resources.FOLDERS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        publicFolder(id) {
            return axios.delete(resources.PUBLIC_FOLDERS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        combo(id) {
            return axios.delete(resources.COMBOS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' },
                })
        },
        product(id) {
            return axios.delete(resources.PRODUCTS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
        },
        keyItem(id) {
            return axios.delete(resources.KEYITEMS + "/" + id,
                {
                    headers: { 'Content-Type': 'application/json' }
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
        Vue.prototype.$api = {};
        Vue.prototype.$api = api;

        Vue.prototype.$api.login = function(credentials, cancelToken, silenceError, onData) {
            return api.auth.login(credentials.username, credentials.password, cancelToken)
            .then(onData)
            .catch(err=>{
                if(silenceError) return;
                let alert = { message: err.message, type: "danger", title: "Login Failed" };
                store.dispatch('alerts/addAlert', alert, { namespaced: true });
            });
        },

        Vue.prototype.$api.signup = function(account, onData) {
            return api.add.user(account)
            .then(onData)
            .catch(err=>{
                let message = "There was a problem trying to sign up";
                let payload = err.response;

                if (err.response) {
                    // Request made and server responded
                    //console.log(err.response.data);
                    //console.log(err.response.status);
                    //console.log(err.response.headers);
                    let status = err.response.status;

                    if(status == "401") {
                        message = "Tell the coder they forgot to give the dashboard permissions";
                    } else if(status == "500") {
                        message = "Tell the coder they broke the server";
                    } else if(status == "404") {
                        message = "Tell the coder the signup web endpoint doesn't exist";
                    }
                } else if (err.request) {
                    // The request was made but no response was received
                    //console.log(err.request);
                    message = err.request;
                } else {
                    //// Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                    message = err.message;
                }

                // mongo error
                if(payload && typeof payload.errmsg !== 'undefined') {
                    if(String(payload.code) === "11000") {
                        if(payload.errmsg.indexOf("email") > -1) {
                            message = "Email in use by another user!"
                        } else if(payload.errmsg.indexOf("username") > -1) {
                            message = "Username already exists!"
                        }
                    }
                }

                let alert = {message: message, type: "warning", title: "Signup Failed" };
                store.dispatch('alerts/addAlert', alert, { namespaced: true });
            });
        },

        Vue.prototype.$api.prefetchCardById = function (id, onComplete) {
            if(!id) {
                let alert = { message: "Attempting to prefetch a card with no ID provided", type: "danger", title: "error" };
                store.dispatch('alerts/addAlert', alert, { namespaced: true });
                return;
            }

            onComplete = onComplete || function () { };

            let getCardById = store.getters['cards/getCardById'];
            let card = getCardById(id);

            if ((card.id || null) == null) {
                // Try fetching from the api
                api.get.card(id).then(payload => {
                    store.dispatch('cards/addCard', payload.data.data);
                    card = getCardById(id);
                }).catch(err => {
                    let alert = { message: err.response.data.error, type: "danger", title: "error" };
                    store.dispatch('alerts/addAlert', alert, { namespaced: true });
                }).finally(() => { onComplete(card) });
            } else {
                // we have it
                onComplete(card)
            }

            //return card; // make synchronous?
        },

        Vue.prototype.$api.prefetchFolderById = function (id, onComplete) {
            onComplete = onComplete || function () { };

            let getFolderById = store.getters['folders/getFolderById'];
            let folder = getFolderById(id);

            if (typeof folder.id === 'undefined') {
                // Try fetching from the api
                api.get.folder(id).then(payload => {
                    store.dispatch('folders/addFolder', payload.data.data);
                    folder = getFolderById(id);
                }).catch(err => {
                    let alert = { message:  err.response.data.error, type: "danger", title: "error" };
                    store.dispatch('alerts/addAlert', alert, { namespaced: true });
                }).finally(() => { onComplete(folder) });
            } else {
                // we have it
                onComplete(folder);
            }

            //return folder; // make synchronous?
        },

        Vue.prototype.$api.prefetchProductName = function(id, onComplete) {
            onComplete = onComplete || function () { };

            let getProductById = store.getters['products/getProductById'];
            let product = getProductById(id);

            if(!product.itemId) {
                let alert = { message:  "No product with an item associated", type: "danger", title: "error" };
                store.dispatch('alerts/addAlert', alert, { namespaced: true });
                onComplete(null);
                return;
            }

            let DoKeyItemLookup = function() {
                if (typeof product.name == 'undefined') {
                    // Try fetching from the api
                    api.get.keyItem(product.itemId).then(payload => {
                        product.name = payload.data.data.name;
                        store.dispatch('products/updateProduct', product);
                    }).catch(err => {
                        let alert = { message:  err.response.data.error, type: "danger", title: "error" };
                        store.dispatch('alerts/addAlert', alert, { namespaced: true });
                    }).finally(() => { onComplete(product.name) });
                }
            };

            let DoCardItemLookup = function() {
                if (typeof product.name == 'undefined') {
                    // Try fetching from the api
                    api.get.card(product.itemId).then(payload => {
                        product.name = payload.data.data.detail.name + " " + payload.data.data.code;
                        store.dispatch('products/updateProduct', product);
                    }).catch(err => {
                        let alert = { message:  err.response.data.error, type: "danger", title: "error" };
                        store.dispatch('alerts/addAlert', alert, { namespaced: true });
                    }).finally(() => { onComplete(product.name) });
                }
            };

            if(typeof product.name != 'undefined') {
                // we have it
                onComplete(product.name);
                return;
            }

            if(product.type == "KeyItem") {
                DoKeyItemLookup();
            } else if(product.type == "Card") {
                DoCardItemLookup();
            } else {
                let alert = { message:  "Type missing from product listing", type: "danger", title: "error" };
                store.dispatch('alerts/addAlert', alert, { namespaced: true });
                onComplete(null);
            }
        },

        Vue.prototype.$api.isFolderValid = function (cardList) {
            /*
            Returns an object with the format {ok:boolean, <err:String>}
            `err` is only valid if `ok` is false
    
            algorithm:
            1. Check for max card limit
            2. For every card, make an entry for that card's property model
            3. Check for duplicates
            4. For each duplicate, check the card limit
            5. If the limit conditions are not exceeded, the folder is OK
            */
            let getCardById = store.getters['cards/getCardById'];
            let models = [];
            let messages = [];

            if(cardList.length > folderMaxLength) {
                messages.push("Folder exceeds max size of " + folderMaxLength);
            }

            cardList.forEach((id)=>{
                let card = getCardById(id);

                if(!((card.modelId || null) == null)) {
                    models[card.id] = card.modelId;
                }
            });

            cardList.forEach((id)=> {
                const count = cardList.filter((v) => (models[v] == models[id] && typeof models[v] !== 'undefined')).length;

                let card = getCardById(id);

                if ((card.id || null) == null) {
                    // We are waiting for data...
                    return {ok: false, err: "Syncing..."};
                }

                if(count > card.limit) {
                    messages.push(card.name +" exceeds limit of " + card.limit);
                }
            });
            
            let message_str = "";
            
            messages.unique().forEach((msg) => {
                message_str += msg + "\n";
            });

            return {ok: messages.length == 0, err: message_str};
        }
    }
}

export default plugin;