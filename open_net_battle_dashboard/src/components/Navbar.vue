<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand :to="{path: '/'}" class="no-link"><b-icon-house-fill/></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{ path: '/folders' }" class="no-link">Folders</b-nav-item>
                <b-nav-item :to="{ path: '/cards' }" class="no-link">All Cards</b-nav-item>
                <b-nav-item :to="{ path: '/public-folders'}" class="no-link">Public Folders</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <b-icon icon="person-fill"/>{{user}}
                    </template>
                    <b-dropdown-item href="#" @click="handleLogout"><b-icon icon="power"/>Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <Breadcrumb/>
    </div>
</template>

<script>
import Breadcrumb from './Breadcrumb'
import axios from 'axios';

export default {
    name: "Navbar",
    components: {
        Breadcrumb
    },
    props: ["user"],
    methods: {
        handleLogout() {
            // Simulate an async request
            axios.get('http://battlenetwork.io:3000/v1/logout', 
                {
                    withCredentials: true, 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }, 
            )
            .then(() => {
                this.$store.dispatch('logoutUser');
            }).catch(err => {
                let alert = { message: err, type: "danger" };
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            });
        }
    }
}
</script>

<style scoped>
.no-link {
    text-decoration: none;
    font: inherit;
    color:inherit;
}
</style>