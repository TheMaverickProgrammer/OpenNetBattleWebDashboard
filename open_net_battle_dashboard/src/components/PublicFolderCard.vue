<template>
    <div>
        <b-card
            :title="title"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 folder-card"
        >
            <b-card-text>
                {{this.count}} / 30 cards
            </b-card-text>

            <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-button href="#" variant="primary" @click="$emit('view-folder', {title: title})">Quick View</b-button>
                </b-col>
                <b-col>
                    <b-button href="#" variant="danger">Import</b-button>
                </b-col>
            </b-row>
            </b-container>

            <template v-slot:footer>
                <em>Created by AUTHOR</em>
            </template>

        </b-card>
    </div>
</template>

<script>
export default {
    name: "PublicFolderCard",
    components: {

    },
    props: ["id", "title", "count", "date"]
}
</script>

<style scoped>
.folder-card {
    filter: drop-shadow(8px 8px 5px rgba(0,0,0,0.25));
}
</style>