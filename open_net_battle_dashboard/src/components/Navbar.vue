<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#"><router-link to="/" class="no-link">Home</router-link></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#"><router-link to="/folders" class="no-link">Folders</router-link></b-nav-item>
                <b-nav-item href="#"><router-link to="/cards" class="no-link">All Cards</router-link></b-nav-item>
                <b-nav-item href="#"><router-link to="/public-folders" class="no-link">Public Folders</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>Welcome, {{user}}</em>
                    </template>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <Breadcrumb/>
    </div>
</template>

<script>
import Breadcrumb from './Breadcrumb'

export default {
    name: "Navbar",
    components: {
        Breadcrumb
    },
    props: ["user"]
}
</script>

<style scoped>
.no-link {
    text-decoration: none;
    color: inherit;
    font: inherit;
}
</style>