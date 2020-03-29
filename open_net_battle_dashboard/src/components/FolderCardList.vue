<template>
<div>
    <b-modal ref="folder-view-modal" hide-footer :title="preview.name">
      <div class="d-block text-center">
        <h3>Cards:</h3>
        <ul>
            <li v-bind:key="id" v-for="id in preview.cards">
                <img :src="$store.getters.getCardById(id).image"/> {{ $store.getters.getCardById(id).name }} {{ $store.getters.getCardById(id).code }}
            </li>
        </ul>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Share</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Edit</b-button>
    </b-modal>

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
    },
    methods: {
      showModal(folder) {
        this.preview = folder;
        this.$refs['folder-view-modal'].show();
      },
      hideModal() {
        this.$refs['folder-view-modal'].hide();
      }
    },
    mounted() {
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

ul {
  list-style-type: none;
}
</style>