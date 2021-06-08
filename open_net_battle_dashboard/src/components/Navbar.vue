<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand :to="{path: '/'}" class="no-link"><b-icon-house-fill/></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{ path: '/folders' }" class="no-link">My Folders</b-nav-item>
                <b-nav-item :to="{ path: '/keyitems' }" class="no-link">My KeyItems</b-nav-item>
                <b-nav-item :to="{ path: '/cards' }" class="no-link">My Chip Pool</b-nav-item>
                <b-nav-item :to="{ path: '/public-folders'}" class="no-link">Public Folders</b-nav-item>
                <b-nav-item :to="{ path: '/combos' }" class="no-link">Combos</b-nav-item>
                <b-nav-item v-if="$store.state.user.isAdmin" :to="{ path: '/economy'}" class="no-link">Economy</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-text><Monies class="monies" :value="monies" /></b-nav-text>
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
import Monies from './Monies'

export default {
    name: "Navbar",
    components: {
        Breadcrumb,
        Monies
    },
    props: ["user", "monies"],
    methods: {
        handleLogout() {
            // Simulate an async request
            this.$api.auth.logout()
            .then(() => {
                this.$store.dispatch('logoutUser');
                this.$router.push({path:'/login'});
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
    font-weight: bold;
}

.no-link:hover {
    text-decoration: underline;
    text-decoration-color: white;
    text-underline-offset: 0.5em;
}

.monies {
    font-weight: bold;
    color: gold;
}
</style>