<template>
    <div>
        <CardTable :cards="userPool" :busy="busy"/>
        <b-card>
            <b-button v-b-tooltip.hover.bottom="'Useful for shakey network connections'" @click="handleRefetch">Refetch</b-button>
        </b-card>
    </div>
</template>

<script>
import CardTable from '@/components/CardTable'
import { mapGetters } from 'vuex'

export default {
    name: "CardLibraryViewPage",
    components: {
        CardTable
    },
    data() {
        return {
            busy: false, lastUpdated: 0, userPoolList: []
        }
    },
    created() {
        this.fetch();
    },
    activated() {
        this.fetch()
    },
    computed: {
      ...mapGetters('cards', ['getCardById'])  ,
      userPool() {
          return this.userPoolList
      }
    },
    methods: {
        fetch() {
            this.busy = true;
            this.userPoolList = [];

            // First time loading table get everything, then `updated` will be set to Date.now()
            this.$api.get.cardsAfterDate(this.lastUpdated).then(response => {
                let payload = response.data;

                payload.data.forEach(card => {
                    this.$api.prefetchCardById(card._id)
                });

                console.log("updated table at " + this.lastUpdated);
            }).catch(err => {
                let alert = { message: err, type: "danger", title: "Internal Error" };
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            }).finally(()=> {
                this.userPoolList = [];
                
                for(let id of this.$store.state.user.pool) {
                    this.$api.prefetchCardById(id, card=>{
                        card.id = id;
                        this.userPoolList = [...this.userPoolList, card];
                    });
                }

                this.busy = false; // Done
                this.lastUpdated = Date.now();
            });
        },
        handleRefetch() {
            this.lastUpdated = 0;
            this.userPoolList = [];
            this.$store.dispatch('cards/clearCards');
            this.fetch();
        }
    }
}
</script>