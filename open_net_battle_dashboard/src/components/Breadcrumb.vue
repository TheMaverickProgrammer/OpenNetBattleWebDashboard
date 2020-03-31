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
            breadcrumb: this.$route.meta.breadcrumb
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
.breadcrumb {
    padding: 0.75rem 1rem;
    background-color: #00000066;
    border-radius: 0px;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

a {
  color: aquamarine;  
}

a:hover {
    color: aquamarine;
    text-decoration: white underline;
}

.breadcrumb-item + .breadcrumb-item::before {
    color: white;
}

.breadcrumb-item.active {
    color: white;
}
</style>