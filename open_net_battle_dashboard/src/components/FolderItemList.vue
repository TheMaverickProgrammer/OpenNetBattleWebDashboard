<template>
    <div>
        <b-modal scrollable 
                ref="folder-view-modal" 
                :title="'\''+ preview.title + '\' Quick View'">
            <div class="d-block text-center">
                <b-list-group>
                    <b-list-group-item :key="id" v-for="id in preview.cards" class="d-flex justify-content-between align-items-center">
                        <img :src="getCardById(id).image"/> {{ getCardById(id).name }}
                        <CodeBadge :cardId="id"/>
                    </b-list-group-item>
                </b-list-group>
            </div>

            <template v-slot:modal-footer="{ ok }">
                <b-button-group>
                    <b-button variant="outline-warning" @click="promptToShare"><b-icon icon="folder-symlink"/>Share</b-button>
                    <b-button variant="outline-info" @click="handleEdit(getPreview)"><b-icon icon="gear"/>Edit</b-button>
                    <b-button @click="ok">Close</b-button>
                </b-button-group>
            </template>
        </b-modal>

        <div class="app-background">
            <b-container fluid class="action-panel">
                <b-row>
                    <b-col align-self="start" cols="2">
                        <b-button variant="outline-success" block><b-icon icon="folder-plus"/>New</b-button>
                    </b-col>
                    <b-col cols="2">
                        <b-button :disabled="checkedList.length == 0" variant="outline-danger" block @click="handleDelete"><b-icon icon="trash"/>Delete</b-button>
                    </b-col>
                </b-row>
            </b-container>

            <hr>

            <ul :style="gridStyle" class="folder-card-list">
                <li v-bind:key="folder.id" v-for="folder in $store.state.folders.list">
                    <FolderItem 
                    checkable
                    :id="folder.id"
                    :title="folder.name" 
                    :cards="folder.cards" 
                    :date="getRecentFolderDate(folder).time"
                    :dateLabel="getRecentFolderDate(folder).label"
                    @view-folder="showModal"
                    @check-folder="handleCheck"
                    @edit-folder="handleEdit"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import FolderItem from "./FolderItem"
import CodeBadge from './CodeBadge'
import axios from 'axios'
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
    name: "FolderItemList",
    data() {
        return {
            preview: { name: "", cards: [], timestamp: "" },
            numberOfColumns: 3,
            checkedList: []
        }
    },
    components: {
        FolderItem,
        CodeBadge
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
        },
        getPreview() {
            return this.preview;
        },
        ...mapGetters('cards', ['getCardById'])
    },
    methods: {
        getRecentFolderDate(folder) {
            if(folder.created < folder.updated) {
                return { time: folder.updated, label: "Updated" }
            } else {
                return { time: folder.created, label: "Created" }
            }
        },
        handleEdit(folder) {
            this.$router.push('/folders/'+folder.id+'/edit');
        },
        showModal(folder) {
            this.preview = folder;

            // Pre-fetch cards if store doesn't have it
            this.preview.cards.forEach(id => {
                let card = this.getCardById(id);

                if(card.id || null == null) {
                    // Try fetching from the api
                    api.get.card(id).then(payload =>{
                        this.$store.dispatch('cards/addCard', payload.data.data);
                    }).catch(err => {
                        let alert = {message: err, type: "danger", title: "error"};
                        this.$store.dispatch('alerts/addAlert', alert, {namespaced:true});
                    }).finally(()=>this.$refs['folder-view-modal'].show());
                }
            });
        },
        hideModal() {
            this.$refs['folder-view-modal'].hide();
        },
        promptToShare() {
            this.$bvModal.msgBoxConfirm(
                'Are you sure to want to share this folder? There is no undo after its made public.',
                {
                    title: 'Share this folder?',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }
            ).then(value => {
                // TODO: add via API
                if(value) {
                    this.$store.dispatch('publicFolders/addFolder', this.preview);
                }
            })
            .catch(err => {
                // An error occurred
                const alert = { message: err, type: 'danger'};
                this.$store.dispatch('alerts/addAlert', alert);
            })
        },
        handleCheck(folder, checked) {
            let id = folder.id;
            let index = this.checkedList.findIndex(folderId => folderId == id);

            if(index > -1 && !checked) {
                this.checkedList.splice(index, 1);
            } else if(index == -1 && checked) {
                this.checkedList = [...this.checkedList, id];
            }
        },
        handleDelete() {
            const size = this.checkedList.length;
            if(size > 0) {
            let msg = 'Are you sure to want to delete these ' + size + ' folders? There is no undo.';

            if(size == 1) msg = 'Are you sure you want to delete this folder? There is no undo.';

            this.$bvModal.msgBoxConfirm(
                msg,
                {
                    title: 'Are you sure?',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }
            ).then(value => {
                // TODO: delete via API

                if(value) {
                    this.checkedList.forEach((id) => {
                        console.log(id);
                        this.$store.dispatch('folders/removeFolder', id);
                    });
                    this.checkedList = [];
                }
            })
            .catch(err => {
                // An error occurred
                const alert = { message: err, type: 'danger'};
                this.$store.dispatch('alerts/addAlert', alert);
            })
            }
        }
    },
    mounted() {
        this.$store.dispatch('folders/clearFolders', { namespaced: true});

        // Simulate an async request
        axios.get('http://battlenetwork.io:3000/v1/folders', 
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true
            }, 
        )
        .then(response => {
            let payload = response.data;
            
            payload.data.forEach( element => {
                this.$store.dispatch('folders/addFolder', element, { namespaced: true});
            });
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        });
    }
}
</script>

<style scoped>
.folder-card-list {
  display: grid;
  grid-gap: 1em;
  padding-bottom: 20px;
}

.action-panel {
    padding: 1%;
}

ul {
  list-style-type: none;
}
</style>