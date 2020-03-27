<template>
    <div>
        <div v-if="show=='none'">
            <b-button @click="handleLogin">Login</b-button>
            <b-button @click="handleSignup">Signup</b-button>
        </div>
        <div v-else-if="show=='signup'">
            <SignupForm @signup-complete="handleSignupCompleted"></SignupForm>
        </div>
        <div v-else-if="show=='login'">
            <LoginForm/>
        </div>
    </div>
</template>

<script>
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

export default {
    data() {
        return {
            show: "none"
        }
    },
    methods: {
        handleLogin() {
            this.show = "login";
        },
        handleSignup() {
            this.show = "signup";
        },
        handleSignupCompleted() {
            this.show = "none";
        }
    },
    components: { 
        SignupForm,
        LoginForm
    }
}
</script>

<style scoped>

</style>