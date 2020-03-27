<template>
<div>
    <div v-bind:key="folder.id" v-for="folder in folders">
        <FolderCard :title="folder.title" :count="folder.count"></FolderCard>
    </div>
</div>
</template>

<script>
import FolderCard from "./FolderCard";

export default {
    name: "FolderCardList",
    props: ["folders"],
    components: {
        FolderCard
    }
}
</script>

<style scoped>

</style>