<template>
    <CardTable :cards="$store.state.cards.list" :busy="busy"/>
</template>

<script>
import CardTable from './CardTable'
import api from '@/api'

export default {
    components: {
        CardTable
    },
    data() {
        return {
            busy: false, updated: 0
        }
    },
    created() {
        this.isBusy = true;

        // First time loading table
        let self = this;

        api.get.cardsAfterDate(this.updated).then(response => {
            let payload = response.data;

            payload.data.forEach( element => {
                self.$store.getCardById(element);
            });

            self.updated = Date().now;
            console.log("updating table at " + self.updated);
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            self.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        }).finally(()=> {
            self.busy = false; // Done
        });
    }
}
</script>