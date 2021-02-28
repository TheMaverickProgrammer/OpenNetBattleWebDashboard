<template>
    <div>
        <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 folder-card"
            :header="getProductName()"
            :header-class="getTypeClass"
            header-text-variant="white"
            align="center"
        >
                <template v-slot:header>
                <b-container style="text-align:left;">
                    <b-row>
                        <b-col cols="0" v-if="checkable">
                            <b-check :checked="getChecked" @change="onCheck"/>
                        </b-col>
                        <b-col>
                            <b-card-text>
                                {{ title }}
                            </b-card-text>
                        </b-col>
                    </b-row>
                </b-container>
            </template>
            <b-card-text>
                <div v-if="type=='Card'">
                    <CardInspectItem :card="getAsCard" v-if="getAsCard"/>
                    <b-spinner v-if="!getAsCard"/>
                </div>
                <div><b-icon-puzzle v-if="type=='KeyItem'"/></div>
                <b-badge variant="dark" pill><Monies :value="monies"/></b-badge>
                <b-badge variant="dark" pill><span class="product-id-label">Product ID</span> {{id}}</b-badge>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import Monies from "@/components/Monies";
import CardInspectItem from "@/components/CardInspectItem"

export default {
    name: "ProductItem",
    components: {
        Monies,
        CardInspectItem
    },
    computed: {
        getSelf() {
            return {title: this.title, monies: this.monies, itemId: this.itemId, type: this.type };
        },
        getTypeIcon() {
            if(this.type == "KeyItem") {
                return "controller";
            }

            if(this.type == "Card") {
                return "file-code";
            }

            return "question-diamond-fill";
        },
        getTypeClass() {
            if(this.type == "KeyItem" || this.type == "Card") {
                return this.type;
            }

            return "Unknown";
        },
        getAsCard() {
            return this.asCard;
        }
    },
    methods: {
        getProductName() {
            if(typeof this.title == 'undefined') {
                let self = this;
                this.$api.prefetchProductName(this.id, name=>{
                    if(name == null) {
                        name = "Item Not Found";
                    }

                    self.title = name;
                });
                return 'Loading...';
            }

            return this.title;
        },
        onCheck() {
            this.checked = !this.checked;
            this.$emit('check-folder', this.getSelf, this.checked);
        },
        getChecked() {
            return this.checked;
        }
    },
    mounted() {
        let self = this;

        if(this.itemId && this.type=='Card') {
            this.$api.prefetchCardById(this.itemId, card=>{
                self.asCard = card;
            });
        }
    },
    data() {
        return {
            asCard: null,
            title: undefined,
            checked: false
        }
    },
    props: {
        id: {
            type: String,
            default: ""
        },
        monies: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: ""
        },
        itemId: {
            type: String,
            default: ""
        },
        checkable: {
            default: false,
            type: Boolean
        },
    }
}
</script>

<style scoped>
.product-card {
    filter: drop-shadow(8px 8px 5px rgba(0,0,0,0.25));
}

.product-id-label {
    color: #aaa;
}

.KeyItem {
    background-color: purple;
}

.Card {
    background-color: blue;
}
</style>