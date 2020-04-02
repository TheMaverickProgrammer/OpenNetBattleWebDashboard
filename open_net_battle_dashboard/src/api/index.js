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

export default {
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
        /* 
        API uses time to fetch real-time updates
        Use `milli = 0` to fetch all resources of type
        */
        cardsAfterDate(milli, cancelToken) {
            return axios.get(resources.CARDS + "/since/" + milli, 
            {
                cancelToken: cancelToken,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        foldersAfterDate(milli, cancelToken) {
            return axios.get(resources.FOLDERS + "/since/" + milli, 
            {
                cancelToken: cancelToken,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        usersAfterDate(milli, cancelToken) {
            return axios.get(resources.USERS + "/since/" + milli, 
            {
                cancelToken: cancelToken,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        publicFoldersAfterDate(milli, cancelToken) {
            return axios.get(resources.PUBLIC_FOLDERS + "/since/" + milli, 
            {
                cancelToken: cancelToken,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        }
    },
    add: {
        cardModel(cardModel) {
            return axios.post(resources.CARD_MODELS, 
            {
                data: cardModel,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        folder(folder) {
            return axios.post(resources.FOLDERS, 
            {
                data: folder,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        publicFolder(folder) {
            return axios.post(resources.PUBLIC_FOLDERS, 
            {
                data: folder,
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
        
            return axios.post(resources.CARD_MODELS + "/" + id, 
            {
                data: cardModel,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        user(user) {
            let id = user.id;
            delete user.id; 
        
            return axios.post(resources.USERS + "/" + id, 
            {
                data: user,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        folder(folder) {
            let id = folder.id;
            delete folder.id; 
        
            return axios.post(resources.FOLDERS + "/" + id, 
            {
                data: folder,
                withCredentials: true, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        },
        publicFolder(folder) {
            let id = folder.id;
            delete folder.id; 
        
            return axios.post(resources.PUBLIC_FOLDERS +"/" + id, 
            {
                data: folder,
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