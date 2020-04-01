<template>
    <span :class="classString" v-b-tooltip.hover.right="type">
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: "Element",
    props: {
        type: String,
    },
    computed: {
        classString() {
            let str = this.type.toLowerCase();

            // TODO: fix all entries in API with this element type...
            if(str == 'normal') str = 'none';

            return "element_icons " + str
        }
    }
}
</script>

<style scoped>
.element_icons {
    margin-top:8px;
}
</style>