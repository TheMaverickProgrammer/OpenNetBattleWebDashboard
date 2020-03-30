<template>
    <div class="landing">
        <center>
            <h1 class="title">Open Net Battle Dashboard</h1>
        </center>
        <LoginSignupForm/>
    </div>
</template>

<script>
import LoginSignupForm from './LoginSignupForm'

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
        },
        handleReset() {
            this.show = "none";
        }
    },
    components: { 
        LoginSignupForm
    }
}
</script>

<style scoped>
.landing {
	height:100vh;
	min-height:550px;
	background-image: url(../assets/ow.gif);
	background-repeat: no-repeat;
	background-size:cover;
	background-position:center;
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