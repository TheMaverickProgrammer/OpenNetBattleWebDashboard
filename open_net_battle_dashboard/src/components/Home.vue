<template>
    <div class="app-background">
        <p>Click on a link to get started</p>
        <div v-if="$store.state.user.isAdmin">
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
}
</script>

<style scoped>
p {
    padding: 2%;
}
</style>