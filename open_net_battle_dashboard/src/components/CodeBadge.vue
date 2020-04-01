<template>
    <b-badge variant="dark" v-b-tooltip.hover.left="'Code family: ' + getCardById(cardId).codeFamily.join(',')">{{ getCardById(cardId).code }}</b-badge>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        cardId: {
            type: String,
            default: ""
        }
    },
    computed: {
        ...mapGetters('cards', ['getCardById'])
    }
}
</script>

<style scoped>
.badge {
    width:28px;
    height:28px;
    font-size:18px;
    margin:1px;
    color:yellow;
}
</style>