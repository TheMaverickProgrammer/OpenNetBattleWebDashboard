<template>
    <div class="landing">
        <center>
            <h1 class="title">Open Net Battle Dashboard</h1>
        </center>
        <LoginSignupForm ref="form"/>
    </div>
</template>

<script>
import LoginSignupForm from '@/components/forms/LoginSignupForm'

export default {
    data() {
        return {};
    },
    methods: {
        autoLogin() {
            this.$refs.form.autoLogin();
        }
    },
    components: { 
        LoginSignupForm
    },
    mounted() {
        // try auto-logging in
        this.autoLogin();
    }
}
</script>

<style scoped>
.landing {
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