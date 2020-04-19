<template>
    <div class="app-background">
        <div>
            <b-tabs nav-item-class="theme-color">
                <b-tab title="News" active>
                    <b-card style='text-align:left' scrollable>
                        <h2>4/18/2020 New content and bugfixes</h2>
                        <p> 
                            You don't need to toggle <code>Change Password</code> anymore to update your user settings<br/>
                            Added Roll v1-v3 chips. They work in game! 
                        </p>
                        <h2>4/10/2020 Dashboard Launch! 🥳</h2>
                        <p>
                            I'm really stoked to have this dashboard functional.<br/>
                            Soon you will be able to directly upload new card scripts from<br/>
                            this <a href="#">Home</a> page. <b><b-icon-star/>Admin accounts</b> have this already.
                        </p>
                        <p>
                            Having a central source of game data is going to help mobile users stream only<br/>
                            what their device needs since both GPU and CPU memory space is small.<br/>
                        </p>
                        <p>
                            It will also help with game-balancing as anyone can spin up their own<br/>
                            server and mange which cards are deemed fair for tournaments. Unfair and malicious cards<br/> 
                            can easily be removed from the game. In PVP this will be crucial.<br/>
                        </p>
                        <p>
                            Eventually the client executable will reach a point of stability where most updates<br/>
                            will come directly from the data from this web backend so new content and updates<br/>
                            will be downloaded automatically.<br/>
                        </p>
                        <p>
                            See you on discord!<br/>
                            - James King
                        </p>
                    </b-card>
                </b-tab>
                <b-tab title="My Account">
                    <b-card v-if="!$store.state.user.isAdmin">
                        <b-form-checkbox switch v-model="changePassword">Change password</b-form-checkbox>
                        <UserForm 
                        :user="getUserAccount"
                        :password="changePassword"
                        @on-submit="handleUserUpdate"
                        />
                    </b-card>
                    <b-card v-else> 
                        Temporarily disabled for admins
                    </b-card>
                </b-tab>
                <b-tab title="Admin Commands" v-if="$store.state.user.isAdmin" class="card-text">
                    <b-card-group v-if="$store.state.user.isAdmin">
                        <b-card>
                            <template v-slot:header>
                                <b-icon-card-text/>Card
                            </template>
                            <b-button-group vertical>
                                <b-button variant="success" @click="handleCreateCard">Create</b-button>
                                <b-button variant="warning">Edit</b-button>
                                <b-button variant="danger" @click="handleDeleteCard">Delete</b-button>
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
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import CardForm from '@/components/forms/CardForm'
import UserForm from '@/components/forms/UserForm'
import DeleteCardForm from '@/components/forms/DeleteCardForm'

export default {
    components: {
        CardForm,
        UserForm,
        DeleteCardForm
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
        handleDeleteCard() {
            this.formType = "DeleteCardForm"; // using Vue component tag to render form types dynamically
            this.showProxy = true;
        },
        handleUserUpdate(user, confirmPassword) {
            if(this.changePassword) {
                if(confirmPassword.length == 0 || user.password.length == 0)  {
                    let alert = {message: "Enter both password fields", type: "danger", title: "Choose a password"};
                    this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                    return;
                } else if(user.password != confirmPassword) {
                    let alert = {message: "Passwords did not match", type: "danger", title: "WRITE IT DOWN SOMEWHERE"};
                    this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                    return;
                }
            } else {
                delete user.password; // do not send this over
            }

            user.id = this.$store.state.user.userId;

            this.$api.update.user(user).then(response => {
                let newUser =  response.data.data;
                this.$store.dispatch('setUser', newUser);
                
                this.userInfo = Object.assign({}, newUser);

                let alert = {message: "Account updated", type: "info"};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            }).catch(err=>{
                let message = err.response.data.error;

                // mongo error
                if(typeof message.errmsg !== 'undefined') {
                    if(String(message.code) === "11000") {
                        // The only possible duplicate is username
                        message = "Username already exists!"
                    }
                }

                let alert = {message: message, title: "Failed to update account", type: "danger"};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            })
        }
    },
    mounted() {
        if(!this.$store.state.user.isAdmin) {
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
}
</script>

<style scoped>
.command-panel {
    margin: 10px;
}

.custom-control-label {
    display: inline-block;
}

a, .theme-color{
  color: #17a2b8 !important;
}
</style>