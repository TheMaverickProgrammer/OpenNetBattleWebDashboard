<template>
<div>
    <b-modal scrollable 
            ref="folder-view-modal" 
            :title="preview.title + ' Quick View'">
        <div class="d-block text-center">
            <b-list-group>
                <b-list-group-item :key="id" v-for="id in preview.cards" class="d-flex justify-content-between align-items-center">
                    <img :src="getCardById(id).image"/> {{ getCardById(id).name }}
                    <b-badge variant="dark" v-b-tooltip.hover.right="'Code family: ' + getCardById(id).codeFamily.join(',')">{{ getCardById(id).code }}</b-badge>
                </b-list-group-item>
            </b-list-group>
        </div>

        <template v-slot:modal-footer="{ ok }">
            <b-button-group>
                <b-button variant="outline-warning" @click="promptToShare">Share</b-button>
                <b-button variant="outline-info" @click="ok">Edit</b-button>
                <b-button @click="ok">Close</b-button>
            </b-button-group>
        </template>
    </b-modal>

    <b-container fluid>
        <b-row>
            <b-col align-self="start" sm="1">
                <b-button variant="outline-success" block>New Folder</b-button>
            </b-col>
        </b-row>
    </b-container>

    <br/><hr>

    <ul :style="gridStyle" class="folder-card-list">
        <li v-bind:key="folder.id" v-for="folder in $store.state.folders.list">
            <FolderCard :title="folder.name" :cards="folder.cards" :date="folder.timestamp" @view-folder="showModal"></FolderCard>
        </li>
    </ul>
</div>
</template>

<script>
import FolderCard from "./FolderCard";
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: "FolderCardList",
    data() {
        return {
            preview: { name: "", cards: [], timestamp: "" },
            numberOfColumns: 3
        }
    },
    components: {
        FolderCard
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
        },
        ...mapGetters('cards', ['getCardById'])
    },
    methods: {
      showModal(folder) {
        this.preview = folder;
        this.$refs['folder-view-modal'].show();
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
            value? '' : '';
            // TODO: add via API
            this.$store.dispatch('publicFolders/addFolder', this.preview);
        })
        .catch(err => {
            // An error occurred
            const alert = { message: err, type: 'danger'};
            this.$store.dispatch('alerts/addAlert', alert);
        })
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
            let alert = { message: err, type: "danger" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        }).finally(() => {
            //this.clearInterval();
            //this.busy = this.processing = false;
        });
    }
}
</script>

<style scoped>
.folder-card-list {
  display: grid;
  grid-gap: 1em;
}

.badge {
    width:20px;
}

ul {
  list-style-type: none;
}
</style>