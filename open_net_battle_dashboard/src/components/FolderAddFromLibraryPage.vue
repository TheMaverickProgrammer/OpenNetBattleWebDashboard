<template>
    <div>
        <CardTable 
        selectable 
        @submit-cards="handleAddCards"
        :cards="$store.state.cards.list"/>
    </div>
</template>

<script>
import CardTable from './CardTable'

export default {
    components: {
        CardTable
    },
    computed: {
    },
    methods: {
        handleAddCards(cards) {
            console.log("would add these cards: " + cards);
        }
    }
}
</script>