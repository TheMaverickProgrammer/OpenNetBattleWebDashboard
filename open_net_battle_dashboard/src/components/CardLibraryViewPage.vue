<template>
    <CardTable :cards="$store.state.cards.list" />
</template>

<script>
import CardTable from './CardTable'
import axios from 'axios'

export default {
    components: {
        CardTable
    },
    created() {
        this.$store.dispatch('cards/clearCards', {namespaced: true});

        this.isBusy = true;

        let numOfCards = 0;
        let cardIndex = 0;

        let self = this;

        // Simulate an async request
        axios.get('http://battlenetwork.io:3000/v1/cards', 
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true
            }, 
        )
        .then(response => {
            let payload = response.data;

            numOfCards = payload.data.length;

            payload.data.forEach( async element => {
                let code = element.code;
                let cardId = element._id;
                let modelId = element.modelId;

                await axios.get('http://battlenetwork.io:3000/v1/card-models/'+modelId, 
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                        withCredentials: true
                    },
                ).then(response => {
                    let payload = response.data;
                    let model = payload.data;

                    let cardEntry = model; // explicit card detail is provided in a property
                    cardEntry.code = code; // Map this card's code back
                    cardEntry._id = cardId; // Make sure to use change the ID back to the card ID
                    cardEntry.codeFamily = cardEntry.codes; // Rename plural `codes` to something safer
                    delete cardEntry.codes; // plural `codes` array is only used by the model 
                    this.$store.dispatch('cards/addCard', cardEntry, { namespaced: true});
                }).catch(err => {
                    let alert = { 
                      message: "Problem loading card with id " + cardId + ".\n" + err, 
                      type: "danger",
                      title: "Fetch failed" 
                    };
                    this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                }).finally( () => {
                    cardIndex = cardIndex + 1;

                    if(cardIndex == numOfCards) {
                        self.isBusy = false; // Done
                    }

                    self.rows = cardIndex;
                });
            });
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        });
    }
}
</script>