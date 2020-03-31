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
                <b-button variant="outline-danger" @click="ok">Import</b-button>
                <b-button @click="ok">Close</b-button>
            </b-button-group>
        </template>
    </b-modal>

    <ul :style="gridStyle" class="folder-card-list">
        <li v-bind:key="folder.id" v-for="folder in $store.state.publicFolders.list">
            <FolderItem :title="folder.name" :cards="folder.cards" :date="folder.timestamp" @view-folder="showModal"></FolderItem>
        </li>
    </ul>
</div>
</template>

<script>
import FolderItem from "./FolderItem";
// import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: "PublicFolderItemList",
    data() {
        return {
            preview: { name: "", cards: [], timestamp: "" },
            numberOfColumns: 3
        }
    },
    components: {
        FolderItem
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
      promptToImport() {
          this.$bvModal.msgBoxConfirm(
              'Import this folder to your account?',
              {
                title: 'Import',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
              }
          ).then(value => {
              // TODO: add via API
              value? '' : '';
              this.$store.dispatch('folders/addFolder', this.preview);
          })
          .catch(err => {
              // An error occurred
              const alert = { message: err, type: 'danger', title: "Internal Error"};
              this.$store.dispatch('alerts/addAlert', alert);
          })
      }
    },
    mounted() {
        // TODO
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