<template>
    <div class="login-reg-panel">
        <!-- password reset form -->
        <b-form @submit.prevent="handleSubmit">
            <h2>Reset Your Password</h2>
            <b-form-group>
                <b-input-group>
                    <b-input-group-prepend is-text>
                    <b-icon icon="lock-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input placeholder="New Password" id="form-password" type="password" :disabled="isBusy" v-model="password"></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group>
                <b-input-group >
                    <b-input-group-prepend is-text>
                    <b-icon icon="lock-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input placeholder="Re-enter password" id="form-confirm-password" type="password" :disabled="isBusy" v-model="confirmPassword"></b-form-input>
                </b-input-group>
            </b-form-group>
            <div class="d-flex justify-content-center">
                <b-button class="submit" ref="submit" type="submit" :disabled="isBusy">Submit</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: String
        },
        token: {
            type: String
        }
    },
    data() {
        return {
            password: "",
            confirmPassword: "",
            isBusy: false
        }
    },
    methods: {
        busy(state) {
            if(state) {
                this.isBusy = state;
            } else {
                this.isBusy = true;
            }
        },
        handleSubmit() {    
            let copy = { userId: this.userId, password: this.password };
            this.$emit('on-submit', copy, this.password? this.confirmPassword : null);
        }
    }
}
</script>

<style scoped>
.login-reg-panel{
    display: inline-block;
    top: 25%;
    text-align: center;
    margin: auto;
    background-color: rgba(255,255, 255, 1);
    height: -moz-fit-content;
    transition: .3s ease-in-out;
    z-index: 0;
    --box-shadow: 0 0 15px 9px #00000013;
    box-shadow: 0 0 15px 9px #00000013;
    right: auto;
    position: relative;
    padding: 1%;
}

.submit:hover {
  color: white;
}

.submit {
  color : black;
  background-color: white;
}
</style>