<template>
    <div class="app-background">
        <b-card>
            <b-form-checkbox switch>Change password</b-form-checkbox>
            <UserForm 
            :user="getUserAccount"
            :password="changePassword"
            @on-submit="handleUserUpdate"
            />
        </b-card>
        <div v-if="$store.state.user.isAdmin">
            <b-button v-b-toggle.collapse-1 variant="info" class="command-panel"><b-icon-arrow90deg-down/>Command Panel</b-button>
            <b-collapse id="collapse-1" class="mt-2">
                <p class="card-text">Admin commands</p>
                <b-card-group>
                    <b-card>
                        <template v-slot:header>
                            <b-icon-card-text/>Card
                        </template>
                        <b-button-group vertical>
                            <b-button variant="success" @click="handleCreateCard">Create</b-button>
                            <b-button variant="warning">Edit</b-button>
                            <b-button variant="danger">Delete</b-button>
                        </b-button-group>
                    </b-card>
                    <b-card>
                        <template v-slot:header>
                            <b-icon-person/>User
                        </template>
                        <b-button-group vertical>
                            <b-button variant="warning">Edit</b-button>
                            <b-button variant="danger">Delete</b-button>
                        </b-button-group>
                    </b-card>
                    <b-card>
                        <template v-slot:header>
                            <b-icon-star/>Admin
                        </template>
                        <b-button-group vertical>
                            <!-- TODO: Current system cannot migrate users to admin users table... -->
                            <b-button variant="success" disabled>Promote</b-button>
                            <b-button variant="danger" disabled>Demote</b-button>
                        </b-button-group>
                    </b-card>
                </b-card-group>
                <!-- the dynamic form based on selection above -->
                <b-collapse id="collapse-2" class="mt-2" v-model="showProxy">
                    <component :is="formType"/>
                </b-collapse>
            </b-collapse>
        </div>
    </div>
</template>

<script>
import CardForm from '@/components/forms/CardForm'
import UserForm from '@/components/forms/UserForm'

export default {
    components: {
        CardForm,
        UserForm
    },
    computed: {
        getUserAccount() { return this.userInfo; }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        formType: {
            type: String,
            default: "CardForm"
        }
    },
    data() {
        return {
            showProxy: this.show,
            userInfo: {},
            changePassword: false
        }
    },
    methods: {
        handleCreateCard() {
            this.formType = "CardForm"; // using Vue component tag to render form types dynamically
            this.showProxy = true;
        },
        handleUserUpdate(user, confirmPassword) {
            console.log(JSON.stringify(user));

            if(confirmPassword) {
                if(user.password != confirmPassword) {
                    let alert = {message: "Passwords did not match", type: "danger"};
                    this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                    return;
                }
            }

            this.$api.update.user(user).then(response => {
                let newUser =  response.data.data;
                this.$store.dispatch('setUser', newUser);
                this.userInfo = newUser;

                let alert = {message: "Account updated", type: "info"};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            }).catch(err=>{
                let alert = {message: err.response.data.error, title: "Failed to update account", type: "danger"};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            })
        }
    },
    mounted() {
        this.$api.get.user(this.$store.state.user.userId).then(response => {
            this.userInfo = response.data.data;
            this.userInfo.id = this.userInfo.userId;
            delete this.userInfo.userId;
        }).catch(err => {
            let alert = {message: err.response.data.error, title: "Failed to fetch account", type: "danger"};
            this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
        });
    }
}
</script>

<style scoped>
.command-panel {
    margin: 10px;
}
</style>