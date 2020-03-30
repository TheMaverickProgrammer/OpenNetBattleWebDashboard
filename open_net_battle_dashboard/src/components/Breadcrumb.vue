<template>
    <b-breadcrumb>
        <b-breadcrumb-item v-for="(crumb, idx) in breadcrumb" :key="idx"
            @click="routeTo(idx)" :active="!crumb.link">
            {{ crumb.name }}
        </b-breadcrumb-item>
    </b-breadcrumb>
</template>

<script>
export default {
    data() { 
        return {
            breadcrumb: []
        }
    },
    methods: {
        routeTo(to) {
            if(this.breadcrumb[to].link)
                this.$router.push(this.breadcrumb[to].link)
        }
    },
    watch: {
        '$route' () {
            this.breadcrumb = this.$route.meta.breadcrumb
        }
    }
}
</script>

<style scoped>
</style>