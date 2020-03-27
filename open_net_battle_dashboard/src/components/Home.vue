<template>
    <div>
        <p>Click on a link to get started</p>
        <div v-if="isAdmin">
            <hr/>
            <h1>Admin commands</h1>
            <ul>
                <li><a href="#">Create a card</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ["isAdmin"],
}
</script>

<style scoped>

</style>