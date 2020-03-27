<template>
<div>
    <b-modal ref="folder-view-modal" hide-footer :title="preview.title">
      <div class="d-block text-center">
        <h3>Hello From Folder View Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Share</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Edit</b-button>
    </b-modal>

    <ul :style="gridStyle" class="folder-card-list">
        <li v-bind:key="folder.id" v-for="folder in folders">
            <PublicFolderCard :title="folder.title" :count="folder.count" :date="folder.date" @view-folder="showModal"></PublicFolderCard>
        </li>
    </ul>
</div>
</template>

<script>
import PublicFolderCard from "./PublicFolderCard";

export default {
    name: "PublicFolderCardList",
    data() {
        return {
            preview: { title: "" },
            numberOfColumns: 3,
            folders: [
                { 
                id: 1,
                title: "TestFolder",
                count: 10,
                date: Date.now()
                },
                { 
                id: 2,
                title: "NoobFolder",
                count: 21,
                date: Date.now()

                },
                { 
                id: 3,
                title: "LanFlder",
                count: 15,
                date: Date.now()
                },
                { 
                id: 4,
                title: "LanFlder",
                count: 15,
                date: Date.now()
                }
            ]
        }
    },
    components: {
        PublicFolderCard
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