<template>
    <div>
        <!-- app contents begin -->
        <div class="app-background">
            <b-table striped hover caption-top :items="getKeyItems" :fields="['name', 'description']">
                <template #table-caption>
                    <span class="hint">KeyItems can grant access to restricted areas and progress quests on participating servers</span>
                </template>
            </b-table>

            <b-card v-if="getKeyItems.length == 0">You have no key items</b-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "KeyItemsListPage",
    data() {
        return {
            keyitems: []
        }
    },
    components: {
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
        },
        getKeyItems() {
            return this.$store.state.keyitems.list;
        },
        ...mapGetters('keyitems', ['getKeyItemById'])
    },
    methods: {
    },
    mounted() {
        // Refresh key items list
        this.$api.get.keyItemsOwned()
        .then(response => {
            let payload = response.data;
            
            payload.data.forEach( element => {
                this.$store.dispatch('keyitems/addKeyItem', element, { namespaced: true});
            });
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        });
    }
}
</script>

<style scoped>
.keyitem-list {
  display: grid;
  grid-gap: 1em;
  padding-bottom: 20px;
  padding-top: 20px;
}

.hint {
    padding: 10px;
    display: block;
}

ul {
  list-style-type: none;
}
</style>