<template>
    <div>
        <!-- modals -->
        <b-modal ref="folder-create-modal"
            title="Create New Folder"
            :busy="busy">
            <b-form @submit.stop.prevent="handleFolderCreate">
                <b-form-input placeholder="Name" required v-model="newFolderName"/>
                <b-button-group>
                    <b-button variant="outline-success" type="submit"><b-icon-folder-check/>Create</b-button>
                    <b-button>Cancel</b-button>
                </b-button-group>
            </b-form>
        </b-modal>

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

            <template v-slot:modal-footer>
                <b-button-group>
                    <b-button variant="outline-warning" @click="promptToShare"><b-icon icon="folder-symlink"/>Share</b-button>
                    <b-button variant="outline-info" @click="handleEdit(getPreview)"><b-icon icon="gear"/>Edit</b-button>
                </b-button-group>
            </template>
        </b-modal>

        <!-- app contents begin -->
        <div class="app-background">
            <b-container fluid class="action-panel">
                <b-row>
                    <b-col align-self="start" cols="2">
                        <b-button variant="outline-success" block @click="showCreateFolderModal"><b-icon icon="folder-plus"/>New</b-button>
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
                    @view-folder="showQuickViewModal"
                    @check-folder="handleCheck"
                    @edit-folder="handleEdit"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import FolderItem from "@/components/FolderItem"
import CodeBadge from '@/components/CodeBadge'
import { mapGetters } from 'vuex'

export default {
    name: "FolderListPage",
    data() {
        return {
            preview: { name: "", cards: [], timestamp: "" },
            newFolderName: "",
            numberOfColumns: 3,
            checkedList: [],
            busy: false,
            lastUpdated: 0
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
            if((new Date(folder.created)).getTime()+1000 < (new Date(folder.updated)).getTime()) {
                return { time: folder.updated, label: "Updated" }
            } else {
                return { time: folder.created, label: "Created" }
            }
        },
        handleEdit(folder) {
            this.$router.push('/folders/'+folder.id+'/edit');
        },
        showQuickViewModal(folder) {
            this.preview = folder;

            // Pre-fetch cards if store doesn't have it
            this.preview.cards.forEach(id => {
                this.$api.prefetchCardById(id);
            });

            this.$refs['folder-view-modal'].show()
        },
        hideQuickViewModal() {
            this.$refs['folder-view-modal'].hide();
        },
        showCreateFolderModal() {
            this.$refs['folder-create-modal'].show()
        },
        hideCreateFolderModal() {
            this.$refs['folder-create-modal'].hide();
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
                    if(value) {
                        this.checkedList.forEach((id) => {
                            this.$api.delete.folder(id).then(payload=>{
                                this.$store.dispatch('folders/removeFolder', id);
                                const alert = { message: payload.data.data.message, type: 'info'};
                                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                            }).catch(err=>{
                                // An error occurred
                                // We want to catch individual errors here so the loop is uninterrupted
                                const alert = { message: err.response.data.error, type: 'danger', title: 'Error Deleting'};
                                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                            }).finally(()=>{
                                this.checkedList = [];
                            });
                        });
                    }
                })
                .catch(err => {
                    // An error occurred
                    const alert = { message: err, type: 'danger', title: 'Internal Error'};
                    this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                })
            }
        },
        handleFolderCreate() {
            this.busy = true;

            this.$api.add.folder({name: this.newFolderName}).then(payload=>{
                this.$store.dispatch('folders/addFolder', payload.data.data, {namespaced: true})
                this.hideCreateFolderModal();
                const alert = { message: "New Folder '" + payload.data.data.name + "' added!", type: 'success'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            }).catch(err=>{
                // An error occurred
                const alert = { message: err.response.data.error, type: 'danger', title:'Could Not Create'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            }).finally(()=>{ this.busy = false; });
        }
    },
    activated() {
        // Refresh folders
        this.$api.get.foldersAfterDate(this.lastUpdated)
        .then(response => {
            let payload = response.data;
            
            payload.data.forEach( element => {
                this.$store.dispatch('folders/addFolder', element, { namespaced: true});
            });
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        }).finally(()=>{
            this.lastUpdated = Date.now();
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