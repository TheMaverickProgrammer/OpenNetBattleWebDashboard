<template>
    <div>
        <div v-if="show=='none'">
            <b-button>Login</b-button>
            <b-button @click="handleSignup">Signup</b-button>
        </div>
        <div v-else-if="show=='signup'">
            <SignupForm @signup-complete="handleSignupCompleted"></SignupForm>
        </div>
    </div>
</template>

<script>
import SignupForm from './SignupForm'

export default {
    data() {
        return {
            show: "none"
        }
    },
    methods: {
        handleSignup() {
            this.show = "signup"
        },
        handleSignupCompleted() {
            this.show = "none";
        }
    },
    components: { 
        SignupForm
    }
}
</script>

<style scoped>

</style>