<template>
    <div>
        <!-- popup modal -->
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
                    <b-button variant="outline-danger" @click="promptToImport"><b-icon-file-arrow-down/>Import</b-button>
                    <b-button variant="outline-primary" @click="hideQuickViewModal">Close</b-button>
                </b-button-group>
            </template>
        </b-modal>

        <!-- app contents begin -->
        <div class="app-background">
            <ul :style="gridStyle" class="folder-card-list" v-if="getFolders.length>0">
                <li v-bind:key="folder.id" v-for="folder in getFolders">
                    <PublicFolderItem 
                    :id="folder.id"
                    :title="folder.name" 
                    :cards="folder.cards" 
                    :author="folder.author"
                    @import-folder="handleImport"
                    @view-folder="showQuickViewModal"/>
                </li>
            </ul>

            <b-card v-if="getFolders.length == 0">This place is empty</b-card>
        </div>
    </div>
</template>

<script>
import PublicFolderItem from "@/components/PublicFolderItem";
import { mapGetters } from 'vuex'

export default {
    name: "PublicFolderListPage",
    data() {
        return {
            preview: { name: "", cards: [], timestamp: "" },
            numberOfColumns: 3,
            lastUpdated: 0
        }
    },
    components: {
        PublicFolderItem
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
        },
        getFolders() {
            return this.$store.state.publicFolders.list;
        },
        ...mapGetters('cards', ['getCardById']),
        ...mapGetters('publicFolders', ['doesFolderExistById'])
    },
    methods: {
        handleImport(folder) {
            this.preview=folder; 
            this.promptToImport();
        },
        getRecentFolderDate(folder) {
            if((new Date(folder.created)).getTime()+1000 < (new Date(folder.updated)).getTime()) {
                return { time: folder.updated, label: "Updated" }
            } else {
                return { time: folder.created, label: "Created" }
            }
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
        promptToImport() {
            this.$bvModal.msgBoxConfirm(
                'Are you sure to want to add `' + this.preview.title + '` to your account?',
                {
                    title: 'Import this folder?',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }
            ).then(value => {
                if(value) {
                    let newFolder = {...this.preview};
                    newFolder.name = newFolder.title;
                    delete newFolder.title; 
                    delete newFolder.id;

                    this.$api.add.folder(newFolder).then((response) => {
                        let payload = response.data;
                        let folder = payload.data;
                        this.$store.dispatch('folders/addFolder', folder);

                        let alert = { message: "Imported " + this.preview.title, type: "success"};
                        this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                    }).catch(err => {
                        // An error occurred
                        const alert = { message: err.response.data.error, type: 'danger', title: "Failed to add to account"};
                        this.$store.dispatch('alerts/addAlert', alert);
                    });
                }
            });
        }
    },
    activated() {
        // Refresh folders
        this.$api.get.publicFoldersAfterDate(this.lastUpdated)
        .then(response => {
            let payload = response.data;
            
            payload.data.forEach( element => {
                if(this.doesFolderExistById(element._id))
                    this.$store.dispatch('publicFolders/updateFolder', element, { namespaced: true});
                else
                    this.$store.dispatch('publicFolders/addFolder', element, { namespaced: true});
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
  padding-top: 20px;
}

ul {
  list-style-type: none;
}
</style>