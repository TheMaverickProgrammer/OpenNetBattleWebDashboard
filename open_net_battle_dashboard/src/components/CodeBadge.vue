<template>
    <b-badge variant="dark" v-b-tooltip.hover.left="'Code family: ' + getCodeFamily">{{ getCode }}</b-badge>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        cardId: {
            type: String,
            default: ""
        },
        codeFamily: {
            type: Array,
            default: () => []
        },
        code: {
            type: String,
            default: ""
        }
    },
    computed: {
        ...mapGetters('cards', ['getCardById']),
        getCodeFamily() {
            if(this.cardId.length > 0) 
                return this.getCardById(this.cardId).codeFamily.join(',');
            else 
                return this.codeFamily;
        },
        getCode() {
            if(this.cardId.length > 0)
                return this.getCardById(this.cardId).code;
            else
                return this.code.length>0?this.code[0]:'-';
        }
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
    vertical-align: text-top;
}
</style>