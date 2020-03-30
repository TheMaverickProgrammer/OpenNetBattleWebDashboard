<template>
    <div class="landing">
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
	background-image: url(http://www.planwallpaper.com/static/images/Free-Wallpaper-Nature-Scenes.jpg);
	background-repeat: no-repeat;
	background-size:cover;
	background-position:center;
	position:relative;
    overflow-y: hidden;
}
</style>