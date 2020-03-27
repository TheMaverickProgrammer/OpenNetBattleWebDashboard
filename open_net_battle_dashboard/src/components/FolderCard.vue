<template>
    <div>
        <b-card
            :title="title"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
                {{this.count}} / 30 cards
            </b-card-text>

        <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <b-button href="#" variant="primary">Quick View</b-button>
            </b-col>
            <b-col>
                <b-button href="#" variant="secondary">Edit</b-button>
            </b-col>
        </b-row>
        </b-container>

        </b-card>
    </div>
</template>

<script>
export default {
    name: "FolderCard",
    components: {

    },
    props: ["title", "count"]
}
</script>