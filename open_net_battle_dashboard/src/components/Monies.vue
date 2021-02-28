<template>
    <span>
        &#9826; <slot v-if="typeof value=='undefined'">/</slot><span v-if="typeof value!=='undefined'">{{getFormattedMonies}}</span>
    </span>
</template>

<script>
export default {
    name: "Monies",
    computed: {
        getFormattedMonies() {
            return (new Intl.NumberFormat('en-US')).format(this.value);
        }
    },
    props: {
        value: {
            type: Number,
            default: undefined
        }
    }
}
</script>