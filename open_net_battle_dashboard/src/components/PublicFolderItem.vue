<template>
    <div>
        <b-card
            :title="title"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 folder-card"
        >
            <b-card-text>
                {{this.cards.length}} / 30 cards
            </b-card-text>

            <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-button href="#" variant="primary" @click="$emit('view-folder', getSelf)">Quick View</b-button>
                </b-col>
                <b-col>
                    <b-button href="#" variant="danger" @click="$emit('import-folder', getSelf)">Import</b-button>
                </b-col>
            </b-row>
            </b-container>

            <template v-slot:footer>
                <em>Created by {{author}}</em>
            </template>

        </b-card>
    </div>
</template>

<script>
export default {
    name: "PublicFolderItem",
    components: {

    },
    computed: {
        getSelf() {
            return {title: this.title, cards: this.cards, date: this.date, author: this.author, id: this.id };
        }
    },
    props: {
        id: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "N/A"
        },
        cards: {
            type: Array,
            default: () => []
        },
        author: {
            type: String,
            default: "N/A"
        }
    }
}
</script>

<style scoped>
.folder-card {
    filter: drop-shadow(8px 8px 5px rgba(0,0,0,0.25));
}
</style>