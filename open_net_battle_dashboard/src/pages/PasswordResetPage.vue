<template>
    <div class="content">
        <center>
            <h1 class="title">Open Net Battle Dashboard</h1>
        </center>
        <PasswordResetForm :userId="userId" :token="token" @on-submit="handleSubmit"/>
    </div>
</template>

<script>
import PasswordResetForm from '@/components/forms/PasswordResetForm'

export default {
    name: "PasswordResetPage",
    components: { 
        PasswordResetForm
    },
    data() {
        let token = this.$route.query.token;
        let id = this.$route.query.id;

        console.log(id);

        return { token: token, userId: id };
    },
    methods: {
        handleSubmit(user, confirmPassword) {
            if(!confirmPassword || confirmPassword.length == 0 || user.password.length == 0)  {
                let alert = {message: "Enter both password fields", type: "danger", title: "Choose a password"};
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                return;
            } else if(user.password != confirmPassword) {
                let alert = {message: "Passwords did not match", type: "danger", title: "Whoops"};
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                return;
            }

            // update password in api
            let alert = { message: "Making password change request", type: "info"};
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});

            this.$api.auth.verifyResetPassword(this.userId, this.token, confirmPassword).then(() =>{
                let alert = { message: "Password changed!", type: "Success"};
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                this.$router.push({path:'/login'});
            }).catch(err=>{
                console.log("Problem when changing password: " + err);

                let alert = { message: "Something went wrong", title: "Whoops", type: "danger"};
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            });
        }
    }
}
</script>

<style scoped>
.content {
  height:100vh;
  min-height:550px;
  position:relative;
  overflow-y:hidden;
}

.title {
    color:white;
    margin-top: 10%;
    margin-bottom: -10%;
    background-color: #00000096;
    margin-left: 25%;
    margin-right: 25%;
}
</style>