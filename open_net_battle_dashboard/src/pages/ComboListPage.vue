<template>
    <div>
        <!-- popup modal -->
        <b-modal scrollable 
            ref="combo-view-modal" 
            :title="'\''+ preview.name + '\' Quick View'">
            <div class="d-block text-center">
                <b-list-group>
                    <b-list-group-item :key="id" v-for="id in preview.cards" class="d-flex justify-content-between align-items-center">
                        <img :src="getCardById(id).image"/> {{ getCardById(id).name }}
                        <CodeBadge :cardId="id"/>
                    </b-list-group-item>
                </b-list-group>
            </div>

            <template v-slot:modal-footer>
                <b-button-group>
                    <b-button variant="outline-primary" @click="hideQuickViewModal">Close</b-button>
                </b-button-group>
            </template>
        </b-modal>

        <!-- app contents begin -->
        <div class="app-background">
            <ul :style="gridStyle" class="combo-list" v-if="getCombos.length>0">
                <li v-bind:key="combo.id" v-for="combo in getCombos">
                    <a href="#" @click="showQuickViewModal(combo)">{{ combo.name }}</a>
                </li>
            </ul>

            <b-card v-if="getCombos.length == 0">This place is empty</b-card>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CodeBadge from '@/components/CodeBadge'

export default {
    name: "ComboListPage",
    data() {
        return {
            preview: { 
                name: "", 
                cards: [], 
                timestamp: "", 
                damage: 0,
                element: "None",
                secondaryElement: "None",
                timeFreeze: false,
                action: "Idle",
                canBoost: false,
                metaClasses: []
            },
            lastUpdated: 0
        }
    },
    components: {
        CodeBadge
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
        },
        getCombos() {
            return this.$store.state.combos.list;
        },
        ...mapGetters('cards', ['getCardById'])
    },
    methods: {
        showQuickViewModal(combo) {
            this.preview = combo;

            // Pre-fetch cards if store doesn't have it
            this.preview.cards.forEach(id => {
                this.$api.prefetchCardById(id);
            });

            this.$refs['combo-view-modal'].show()
        },
        hideQuickViewModal() {
            this.$refs['combo-view-modal'].hide();
        }
    },
    activated() {
        // Refresh combos list
        this.$api.get.combosAfterDate(this.lastUpdated)
        .then(response => {
            let payload = response.data;
            
            payload.data.forEach( element => {
                this.$store.dispatch('combos/addCombo', element, { namespaced: true});
            });
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        }).finally(()=>{
            this.lastUpdated = Date.now();
        });
    }
}
</script>

<style scoped>
.combo-list {
  display: grid;
  grid-gap: 1em;
  padding-bottom: 20px;
  padding-top: 20px;
}

ul {
  list-style-type: none;
}
</style>