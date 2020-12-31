<template>
    <div>
        <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 folder-card"
        >
            <template v-slot:header>
                <b-container style="text-align:left;">
                    <b-row>
                        <b-col cols="0" v-if="checkable">
                            <b-check :checked="getChecked" @change="onCheck"/>
                        </b-col>
                        <b-col cols="5">
                            <b-card-text>
                                {{ title }}
                            </b-card-text>
                        </b-col>
                        <b-col cols="5">
                            <b-card-text :class="{red: cards.length > maxCardSize}">
                                <b-icon-exclamation-triangle v-b-tooltip.hover.top="getValidResult.err" v-if="getValidResult.ok==false" class="red"/>
                                {{ cards.length }}/{{ maxCardSize }}
                            </b-card-text>
                        </b-col>
                        <b-col cols="0">
                            <b-icon-folder/>
                        </b-col>
                    </b-row>
                </b-container>
            </template>
            <b-container class="bv-example-row">
            <b-button-group>
                    <b-button href="#" variant="primary" @click="$emit('view-folder', getSelf)" :disabled="cards.length==0">View</b-button>
                    <b-button href="#" variant="info" @click="$emit('rename-folder', getSelf)">Rename</b-button>
                    <b-button href="#" variant="outline-info" @click="$emit('edit-folder', getSelf)">Edit</b-button>
            </b-button-group>
            </b-container>

            <template v-slot:footer>
                <em>{{dateLabel}} {{getDate}}</em>
            </template>

        </b-card>
    </div>
</template>

<script>
export default {
    name: "FolderItem",
    components: {

    },
    computed: {
        getSelf() {
            return {name: this.title, cards: this.cards, date: this.date, id: this.id };
        },
        getDate() {
            let dateObj = new Date(this.date);
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();

            return month + "/" + day + "/" + year;
        },
        getValidResult() {
            let result = this.$api.isFolderValid(this.cards);
            return result;
        }
    },
    methods: {
        onCheck() {
            this.checked = !this.checked;
            this.$emit('check-folder', this.getSelf, this.checked);
        },
        getChecked() {
            return this.checked;
        }
    },
    props: {
        id: String,
        title: String,
        cards: {
            default: new Array(),
            type: Array
        },
        maxCardSize: {
            default: 30,
            type: Number
        },
        date: String,
        dateLabel: {
            default: "Created",
            type: String
        },
        checked: {
            default: false,
            type: Boolean
        },
        checkable: {
            default: false,
            type: Boolean
        },
        editName: {
            default: false,
            type: Boolean
        }
    },
    mounted() {
        this.cards.forEach((id)=>{
            this.$api.prefetchCardById(id);
        });
    }
}
</script>

<style scoped>
.folder-card {
    filter: drop-shadow(8px 8px 5px rgba(0,0,0,0.25));
}

.black {
    color:black;
}

.red {
    color:red !important;
}
</style>